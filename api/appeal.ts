interface ApiRequest {
  method?: string;
  body?: any;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
}
import { GoogleGenAI, Type } from "@google/genai";
import { generateMockAppeal } from "../src/lib/mockDataCore";

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
  const originalCase = req.body?.originalCase;
  const imagePayload = req.body?.image;
  const hasImage = Boolean(imagePayload && imagePayload.data);

  if ((!incident && !hasImage) || !originalCase) {
    res.status(400).json({ error: "Incident or originalCase missing." });
    return;
  }

  const ai = getGeminiClient();
  if (!ai) {
    res.status(200).json(generateMockAppeal(incident, originalCase));
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
    data.caseId = originalCase.caseId;
    data.incident = incident || originalCase.incident;
    data.isAppeal = true;
    data.originalVerdict = originalCase.verdict;
    data.timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    res.status(200).json(data);
  } catch (err) {
    res.status(200).json(generateMockAppeal(incident, originalCase));
  }
}
