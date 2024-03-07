import { StreamingTextResponse } from "ai";

import { logger } from "@/lib/logger";
import { cleanTextStream } from "@/services/llm";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  logger.info(`Text to clean received: ${prompt}`);

  const stream = await cleanTextStream(prompt);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
