interface ApiRequest {
  method?: string;
  body?: any;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
}
import { GoogleGenAI, Type } from "@google/genai";
import { generateMockInvestigation } from "../src/lib/mockDataCore";

let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });
  }
  return geminiClient;
}

const reportResponseSchema = {
  type: Type.OBJECT,
  properties: {
    caseId: { type: Type.STRING },
    department: { type: Type.STRING },
    incident: { type: Type.STRING },
    severity: {
      type: Type.OBJECT,
      properties: {
        socialThreatLevel: { type: Type.NUMBER },
        overthinkingIndex: { type: Type.NUMBER },
        emotionalDamage: { type: Type.NUMBER },
      },
      required: ["socialThreatLevel", "overthinkingIndex", "emotionalDamage"]
    },
    explanations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          probability: { type: Type.NUMBER },
        },
        required: ["label", "probability"]
      }
    },
    evidence: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    verdict: { type: Type.STRING },
    confidence: { type: Type.NUMBER },
    recommendedAction: { type: Type.STRING },
    isAppeal: { type: Type.BOOLEAN }
  },
  required: [
    "caseId", "department", "incident", "severity",
    "explanations", "evidence", "verdict", "confidence",
    "recommendedAction", "isAppeal"
  ]
};

function cleanBase64(str: string): string {
  if (!str) return "";
  const commaIdx = str.indexOf(",");
  return commaIdx !== -1 ? str.slice(commaIdx + 1) : str;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const incident = typeof req.body?.incident === "string" ? req.body.incident.trim() : "";
  const imagePayload = req.body?.image;
  const hasImage = Boolean(imagePayload && imagePayload.data);

  if (!incident && !hasImage) {
    res.status(400).json({ error: "Please provide either a grievance description or upload a chat screenshot." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.status(200).json(generateMockInvestigation(incident, hasImage));
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

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: hasImage ? { parts: contentParts } : promptText,
      config: {
        systemInstruction,
        temperature: 1.25,
        responseMimeType: "application/json",
        responseSchema: reportResponseSchema,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response");

    const data = JSON.parse(text);
    if (!data.caseId) data.caseId = caseId;
    if (!data.incident) data.incident = incident || "Screenshot evidence under review";
    data.isAppeal = false;
    data.timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    res.status(200).json(data);
  } catch (err) {
    res.status(200).json(generateMockInvestigation(incident, hasImage));
  }
}
