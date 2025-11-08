import { GoogleGenAI, Type } from "@google/genai";
import type { SensitivitySettings, UserInput } from '../types';

export async function getSensitivitySettings(userInput: UserInput): Promise<SensitivitySettings> {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const { phoneModel, ram, screenSize, gyroscope } = userInput;

    const prompt = `
    You are a world-class expert Free Fire Pro player and coach, specializing in optimizing sensitivity settings for all types of mobile devices. Your goal is to provide the absolute best sensitivity configuration for achieving headshots and fast reflexes.

    Based on the following device specifications:
    - Phone Model: ${phoneModel}
    - RAM: ${ram} GB
    - Screen Size: ${screenSize} inches
    - Gyroscope: ${gyroscope}

    Generate the optimal sensitivity settings and a recommended DPI. The sensitivity values must be between 0 and 100. The DPI should be a reasonable value for mobile gaming. Provide a brief justification for your recommendations, explaining how these settings are tailored to the given device specs, considering how RAM affects performance and how screen size affects swipe distance and accuracy.
    `;

    const schema = {
        type: Type.OBJECT,
        properties: {
            general: { type: Type.INTEGER, description: 'General sensitivity (0-100)' },
            redDot: { type: Type.INTEGER, description: 'Red Dot sight sensitivity (0-100)' },
            twoXScope: { type: Type.INTEGER, description: '2X Scope sensitivity (0-100)' },
            fourXScope: { type: Type.INTEGER, description: '4X Scope sensitivity (0-100)' },
            sniperScope: { type: Type.INTEGER, description: 'Sniper Scope sensitivity (0-100)' },
            freeLook: { type: Type.INTEGER, description: 'Free Look sensitivity (0-100)' },
            dpi: { type: Type.INTEGER, description: 'Recommended Dots Per Inch (DPI)' },
            reasoning: { type: Type.STRING, description: 'A brief explanation for the recommended settings.' }
        },
        required: ['general', 'redDot', 'twoXScope', 'fourXScope', 'sniperScope', 'freeLook', 'dpi', 'reasoning']
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.7,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResponse = JSON.parse(jsonText);
        
        return parsedResponse as SensitivitySettings;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate settings from AI. The model may be unable to provide settings for the given device. Please try different inputs.");
    }
}