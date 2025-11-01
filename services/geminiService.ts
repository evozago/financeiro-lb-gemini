
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";

// Helper to instantiate the Gemini AI client on-demand, preventing load-time errors.
const getAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // Throw a clear error if the API key is missing.
      throw new Error("API_KEY is not configured. Please set it in your environment.");
    }
    return new GoogleGenAI({ apiKey });
};


export const analyzeFinancialDataWithThinking = async (dataSummary: string): Promise<string> => {
  try {
    const ai = getAI();
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `Analyze this financial dashboard data summary and provide a detailed report with actionable insights. Identify key trends, potential risks, and opportunities for cost savings. Format the response as Markdown. Data: ${dataSummary}`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing financial data:", error);
    return "An error occurred while analyzing the data. Please try again.";
  }
};

export const analyzeReceiptImage = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const ai = getAI();
        const imagePart = {
            inlineData: {
                data: base64Image,
                mimeType: mimeType,
            },
        };
        const textPart = {
            text: "Extract the vendor name, total amount, and date from this receipt image. Return the result as a JSON object with keys: 'vendor', 'total', and 'date'."
        };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        return response.text;
    } catch (error) {
        console.error("Error analyzing receipt image:", error);
        return "Failed to analyze image.";
    }
};


export const createChat = (): Chat => {
    const ai = getAI();
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are FinBot, a helpful financial assistant for the FinControl app. Be friendly and concise.',
        },
    });
};
