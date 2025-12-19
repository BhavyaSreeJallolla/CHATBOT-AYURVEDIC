
import { GoogleGenAI } from "@google/genai";
import { AYURVEDA_SYSTEM_PROMPT } from "./constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAyurvedicResponse = async (userMessage: string, history: { role: string; content: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'assistant' ? 'model' : 'user', parts: [{ text: h.content }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: AYURVEDA_SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Unable to connect to the wellness wisdom. Please try again later.");
  }
};
