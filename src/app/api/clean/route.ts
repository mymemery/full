import {
  experimental_StreamData,
  OpenAIStream,
  StreamingTextResponse,
} from "ai";
// async function cleanText(text: string): Promise<string> {
//   logger.info(`Cleaning text: ${text.slice(0, 100)}`);
//   // Your text cleaning logic goes here
//   // For example, you can remove HTML tags, strip unwanted characters, etc.
//   const cleanedText = text.replace(/<[^>]*>?/g, ""); // Remove HTML tags
//   logger.info(`Cleaned text: ${cleanedText.slice(0, 100)}`);
//   return cleanedText;
// }
// export async function POST(req: Request) {
//   const { text } = await req.json();
//   logger.info(`Cleaning text: ${text.slice(0, 100)}`);
//   try {
//     const cleanedText = await cleanText(text);
//     return Response.json({ success: true, cleanedText });
//   } catch (error) {
//     logger.error(`Error cleaning text: ${error}`);
//     return Response.json({ success: false, error: "Failed cleaning text" });
//   }
// }
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
  logger.info(`Request body: ${req.body}`);
  const { text } = await req.json();

  const prompt = `Remove unnecessary words from this text that has been web crawled. Such words could be related to menus, navigation bars, footers, headers, and other information that is not part of the main text or article of the page itself. When removing such words, make sure to leave the original text untouched. The scraped text is: ${text}`;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 2000,
    stream: true,
    prompt,
  });

  // optional: use stream data
  const data = new experimental_StreamData();

  data.append({ test: "value" });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal(_completion) {
      data.close();
    },
    experimental_streamData: true,
  });

  // Respond with the stream
  return new StreamingTextResponse(stream, {}, data);
}
