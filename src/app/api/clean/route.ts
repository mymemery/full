import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

import { logger } from "@/lib/logger";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  logger.info(`Text to clean received: ${prompt}`);

  const newPrompt = `Remove unnecessary words from this text that has been web crawled. Such words could be related to menus, navigation bars, footers, headers, cookie consent messages, privacy, advertisements, and other information that is not part of the main text or article of the page itself. When removing such words, make sure to leave the original text untouched. Don't add any additional description, ONLY RESPOND WITH the cleaned text. Do not make words up! The scraped text is: ${prompt}`;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 2000,
    stream: true,
    messages: [
      {
        role: "user",
        content: newPrompt,
      },
    ],
  });

  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
