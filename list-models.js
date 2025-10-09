import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

async function listModels() {
  try {
    const ai = new GoogleGenAI({});

    console.log("📋 Listing available models...\n");

    const models = await ai.models.list();
    console.log("Available models:", JSON.stringify(models, null, 2));
  } catch (error) {
    console.error("❌ ERROR listing models:", error.message);
  }
}

listModels();
