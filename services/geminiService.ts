import { GoogleGenAI, Type } from "@google/genai";
import { RoomConditions, SuggestedPlant, Plant } from '../types';

const getGeminiService = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getPlantSuggestions = async (conditions: RoomConditions, allPlants: Plant[]): Promise<SuggestedPlant[]> => {
    const ai = getGeminiService();

    const plantList = allPlants.map(p => `- ${p.name}: Sunlight=${p.sunlight}, Water=${p.water}, Soil=${p.soil}, Benefits=${p.benefits}`).join('\n');

    const prompt = `You are a helpful botanist assistant for a busy hostel student. Based on the following room conditions and the list of available plants, suggest the 3 best-matching low-maintenance plants. 
    
    List of available plants to choose from:
    ${plantList}

    Please choose your 3 suggestions ONLY from the list above. Ensure they are the best possible match for the user's conditions.

    User's Conditions:
    - Available Sunlight: ${conditions.sunlight}
    - Type of Soil Available: ${conditions.soil}
    - Fertilizer Available: ${conditions.fertilizer}
    - Important Requirement from user: ${conditions.importantReq}
    - Maximum days between watering: ${conditions.wateringFreq} days
    - Available Space: ${conditions.space}

    For each of the 3 plants, provide:
    1. Its common name (must be from the provided list).
    2. A brief, encouraging description.
    3. Simple care instructions for watering, sunlight, and fertilizer.
    4. A short, one-sentence reasoning for why it's a good fit for these specific conditions.

    Return the response as a valid JSON array of 3 plant objects.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            plantName: {
                                type: Type.STRING,
                                description: "The common name of the suggested plant."
                            },
                            description: {
                                type: Type.STRING,
                                description: "A brief, encouraging description of the plant."
                            },
                            careInstructions: {
                                type: Type.OBJECT,
                                properties: {
                                    watering: { type: Type.STRING },
                                    sunlight: { type: Type.STRING },
                                    fertilizer: { type: Type.STRING }
                                },
                                required: ["watering", "sunlight", "fertilizer"]
                            },
                            reasoning: {
                                type: Type.STRING,
                                description: "A short reason why this plant is a good fit."
                            }
                        },
                        required: ["plantName", "description", "careInstructions", "reasoning"]
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const suggestions: SuggestedPlant[] = JSON.parse(jsonText);
        return suggestions;

    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get suggestions from Gemini API.");
    }
};