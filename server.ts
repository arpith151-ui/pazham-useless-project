import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { generateMockInvestigation, generateMockAppeal } from "./src/lib/mockDataCore";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

const reportResponseSchema = {
  type: Type.OBJECT,
  properties: {
    caseId: { type: Type.STRING, description: "Case tracking code e.g. PZ-48291" },
    department: { type: Type.STRING, description: "Brainrot Gen Z department name with emojis e.g. 'Department of Terminal Brainrot & Cringe 💀🔥'" },
    incident: { type: Type.STRING, description: "Short summary of the tragedy roasted in Gen Z slang" },
    severity: {
      type: Type.OBJECT,
      properties: {
        socialThreatLevel: { type: Type.NUMBER, description: "Value from 0 to 100" },
        overthinkingIndex: { type: Type.NUMBER, description: "Value from 0 to 100" },
        emotionalDamage: { type: Type.NUMBER, description: "Value from 0 to 100" },
      },
      required: ["socialThreatLevel", "overthinkingIndex", "emotionalDamage"]
    },
    explanations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "Viral tweet-style brainrot roast explanation with slang" },
          probability: { type: Type.NUMBER, description: "Percentage value" },
        },
        required: ["label", "probability"]
      }
    },
    evidence: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "3-4 exhibits formatted like 'EXHIBIT A: [unhinged group chat tweet roasting the user]'"
    },
    verdict: { type: Type.STRING, description: "Big bold meme verdict in ALL CAPS with emojis e.g. CERTIFIED GYATT-TIER COOKED FR FR 💀🔥" },
    confidence: { type: Type.NUMBER, description: "Confidence percentage e.g. 98.4" },
    recommendedAction: { type: Type.STRING, description: "Unhinged funny life advice from a chronically online friend" },
    isAppeal: { type: Type.BOOLEAN }
  },
  required: [
    "caseId",
    "department",
    "incident",
    "severity",
    "explanations",
    "evidence",
    "verdict",
    "confidence",
    "recommendedAction",
    "isAppeal"
  ]
};

function cleanBase64(str: string): string {
  if (!str) return "";
  const commaIdx = str.indexOf(",");
  return commaIdx !== -1 ? str.slice(commaIdx + 1) : str;
}

function withTimeout<T>(promise: Promise<T>, ms = 20000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
    )
  ]);
}

// POST /api/investigate
app.post("/api/investigate", async (req: Request, res: Response) => {
  const incident = typeof req.body?.incident === "string" ? req.body.incident.trim() : "";
  const imagePayload = req.body?.image;
  const hasImage = Boolean(imagePayload && imagePayload.data);

  if (!incident && !hasImage) {
    res.status(400).json({ error: "Please provide either a grievance description or upload a chat screenshot." });
    return;
  }

  const ai = getGeminiClient();

  if (!ai) {
    console.log("[PAZHAM] GEMINI_API_KEY not configured. Using deterministic brainrot mock generator.");
    const mock = generateMockInvestigation(incident, hasImage);
    res.json(mock);
    return;
  }

  try {
    const caseId = `PZ-${Math.floor(10000 + Math.random() * 90000)}`;

    const systemInstruction = `You are a chronically online, meme-poisoned, unhinged friend running PAZHAM — Department of Unnecessary Intelligence.
TONE MANDATE: Write in GENUINE BRAINROT & GEN Z SLANG. Use vocabulary heavily and naturally: "ate", "no cap", "delulu", "the audacity", "ick", "core", "rizz", "gyatt-tier", "cooked", "down bad", "it's giving", "final boss", "ratio'd", "sus", "L take", "W take", "not me overthinking", "bestie", "fr fr", "on god", "screaming crying throwing up", "caught in 4K".
Make every explanation and exhibit read like unhinged group-chat commentary roasting the user, NOT like formal police findings. Each explanation/exhibit should feel like a viral tweet.
VARIETY MANDATE: Never reuse the same explanations, evidence, or phrasing pattern twice — invent fresh, specific, absurd reasons every time tied to the exact details of this specific case.
${hasImage ? "SCREENSHOT FORENSICS: Inspect the attached chat screenshot. Roast the exact bubble sizes, timestamps, typing bubbles, dry texting, emojis, battery % in the screenshot." : ""}
Return strictly JSON matching the response schema.
Make verdict ALL CAPS with emojis.
Set caseId: "${caseId}".
Set isAppeal: false.`;

    const promptText = hasImage
      ? `ROAST THIS ATTACHED SCREENSHOT RECEIPT:\n${incident ? `User note: "${incident}"` : "Examine what happened in this screenshot and roast both of them to ashes."}\nGenerate the official brainrot case file now.`
      : `CITIZEN GRIEVANCE:\n"${incident}"\nRoast this incident in pure unhinged brainrot group chat style now.`;

    const contentParts: any[] = [];
    if (hasImage) {
      contentParts.push({
        inlineData: {
          mimeType: imagePayload.mimeType || "image/jpeg",
          data: cleanBase64(imagePayload.data)
        }
      });
    }
    contentParts.push({ text: promptText });

    const callPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: hasImage ? { parts: contentParts } : promptText,
      config: {
        systemInstruction,
        temperature: 1.25,
        responseMimeType: "application/json",
        responseSchema: reportResponseSchema,
      }
    });

    const response = await withTimeout(callPromise, 20000);
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(text);
    if (!data.caseId) data.caseId = caseId;
    if (!data.incident) data.incident = incident || "Screenshot evidence under review";
    data.isAppeal = false;
    data.timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    res.json(data);
  } catch (err) {
    console.warn("[PAZHAM] Investigation Gemini call failed or timed out. Failing over to deterministic fallback:", err);
    const mock = generateMockInvestigation(incident, hasImage);
    res.json(mock);
  }
});

// POST /api/appeal
app.post("/api/appeal", async (req: Request, res: Response) => {
  const incident = typeof req.body?.incident === "string" ? req.body.incident.trim() : "";
  const originalCase = req.body?.originalCase;
  const imagePayload = req.body?.image;
  const hasImage = Boolean(imagePayload && imagePayload.data);

  if ((!incident && !hasImage) || !originalCase) {
    res.status(400).json({ error: "Incident or originalCase missing for appeal." });
    return;
  }

  const ai = getGeminiClient();

  if (!ai) {
    const mock = generateMockAppeal(incident, originalCase);
    res.json(mock);
    return;
  }

  try {
    const systemInstruction = `You are a rival chronically online bestie from the Supreme Council of Pure Delusion & Copium 💅✨.
The previous ruling said:
Verdict: "${originalCase.verdict}"
Department: "${originalCase.department}"

You believe the previous officer was an absolute hater giving L takes!
Argue the COMPLETE OPPOSITE with unhinged brainrot copium:
If they said the user is cooked, tell them they actually ate, they have unmatched aura, the other person was simply overwhelmed by their rizz and intimidated!
Use slang heavily: "ate", "no cap", "delulu", "the audacity", "ick", "core", "rizz", "gyatt-tier", "cooked", "down bad", "it's giving", "final boss", "ratio'd", "sus", "L take", "W take", "bestie", "fr fr", "on god", "slay", "iconic".
Write exhibits like: "EXHIBIT A: [unhinged tweet gaslighting the user into thinking they won]".
VARIETY MANDATE: Never reuse explanations or phrasing patterns.
Return strictly JSON adhering to schema with isAppeal: true.`;

    const promptText = `ORIGINAL CASE:\n"${incident || originalCase.incident}"\nORIGINAL VERDICT:\n"${originalCase.verdict}"\nOverrule this verdict with maximum brainrot copium now.`;

    const contentParts: any[] = [];
    if (hasImage) {
      contentParts.push({
        inlineData: {
          mimeType: imagePayload.mimeType || "image/jpeg",
          data: cleanBase64(imagePayload.data)
        }
      });
    }
    contentParts.push({ text: promptText });

    const callPromise = ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: hasImage ? { parts: contentParts } : promptText,
      config: {
        systemInstruction,
        temperature: 1.25,
        responseMimeType: "application/json",
        responseSchema: reportResponseSchema,
      }
    });

    const response = await withTimeout(callPromise, 20000);
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(text);
    data.caseId = originalCase.caseId;
    data.incident = incident || originalCase.incident;
    data.isAppeal = true;
    data.originalVerdict = originalCase.verdict;
    data.timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    res.json(data);
  } catch (err) {
    const mock = generateMockAppeal(incident, originalCase);
    res.json(mock);
  }
});

async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PAZHAM Server active on http://0.0.0.0:${PORT}`);
  });
}

start();
