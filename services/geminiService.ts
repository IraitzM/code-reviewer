
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getReviewPrompt = (code: string, language: string): string => `
You are an expert code reviewer with years of experience reviewing production code for a major tech company. Your standards are high, but your feedback is always constructive, clear, and helpful.

Please provide a comprehensive review of the following ${language} code. Analyze it for potential bugs, performance bottlenecks, security vulnerabilities, and adherence to best practices and conventions for the language.

Structure your feedback in Markdown format.
- Use headings for different sections (e.g., ## Potential Bugs, ## Performance, ## Readability).
- Use bullet points for specific comments.
- Provide corrected code snippets using Markdown code blocks (e.g., \`\`\`${language.toLowerCase()}) where applicable to illustrate your points.
- Be concise but thorough. Explain *why* a change is recommended.

Here is the code to review:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`
`;

export const reviewCode = async (code: string, language: string): Promise<string> => {
  if (!code.trim()) {
    throw new Error("Code string is empty.");
  }

  try {
    const prompt = getReviewPrompt(code, language);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `Error reviewing code: ${error.message}`;
    }
    return "An unexpected error occurred while reviewing the code.";
  }
};
