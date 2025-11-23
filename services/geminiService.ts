import { GoogleGenAI, Type } from "@google/genai";
import { Address } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const parseAddressWithGemini = async (input: string): Promise<Address> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Parse the following unstructured address text into a structured JSON object. 
      Extract the name, street address, city, state, country, and phone number.
      Do NOT extract a zip code or postal code.
      If there is an apartment, suite, unit, or sector, include it in the street address (street1).
      
      Input text: "${input}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Full name of the person or business" },
            street1: { type: Type.STRING, description: "Street address line 1 (including apt/suite/sector)" },
            city: { type: Type.STRING },
            state: { type: Type.STRING },
            country: { type: Type.STRING, description: "Full country name, default to Pakistan if unclear" },
            phoneNumber: { type: Type.STRING, description: "Contact phone number formatted nicely" },
          },
          required: ["name", "street1", "city", "state", "country", "phoneNumber"],
        },
      },
    });

    if (response.text) {
      const parsed = JSON.parse(response.text);
      return {
        name: parsed.name || "",
        street1: parsed.street1 || "",
        city: parsed.city || "",
        state: parsed.state || "",
        country: parsed.country || "Pakistan",
        phoneNumber: parsed.phoneNumber || "",
      };
    }
    
    throw new Error("No response text from Gemini");
  } catch (error) {
    console.error("Gemini parsing error:", error);
    throw error;
  }
};