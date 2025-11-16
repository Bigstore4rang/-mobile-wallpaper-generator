
import { GoogleGenAI } from "@google/genai";

export async function generateWallpapers(prompt: string, ai: GoogleGenAI): Promise<string[]> {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A beautiful 9:16 phone wallpaper of: ${prompt}. Cinematic, high detail, professional photography.`,
            config: {
                numberOfImages: 4,
                aspectRatio: '9:16',
                outputMimeType: 'image/png',
            },
        });
        
        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("No images were generated.");
        }

        return response.generatedImages.map(img => `data:image/png;base64,${img.image.imageBytes}`);
    } catch (error) {
        console.error("Error generating wallpapers with Gemini:", error);
        throw error;
    }
}
