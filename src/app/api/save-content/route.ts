import type { ScrapedUrlContent } from "@/components/scraped-content";
import {
  errorResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/api";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import prisma from "@/prisma/index";
import { getEmbeddings } from "@/services/llm";

export const POST = auth(async (req) => {
  try {
    const user = req.auth;

    if (!user) {
      return unauthorizedResponse();
    }

    const content = (await req.json()) as ScrapedUrlContent;

    await Promise.all(
      Object.entries(content).map(async ([url, text]) => {
        const existingMeme = await prisma.meme.findFirst({
          where: { url, userId: user.user.id },
          include: { contentChunks: true },
        });

        if (existingMeme) {
          if (existingMeme.text !== text) {
            // Text has been updated, create new embeddings and update the existing meme
            const embeddings = await getEmbeddings(text);

            // Delete existing text chunks
            await prisma.contentChunk.deleteMany({
              where: { memeId: existingMeme.id },
            });

            // Create new text chunks with embeddings
            await Promise.all(
              embeddings.map((embedding) =>
                prisma.contentChunk.create({
                  data: {
                    memeId: existingMeme.id,
                    content: embedding.content,
                    embedding: embedding.values,
                  },
                }),
              ),
            );

            // Update the meme text
            await prisma.meme.update({
              where: { id: existingMeme.id },
              data: { text },
            });
          }
        } else {
          // New URL or user, create a new meme with text chunks and embeddings
          const embeddings = await getEmbeddings(text);

          await prisma.meme.create({
            data: {
              url,
              text,
              userId: user.user.id,
              contentChunks: {
                create: embeddings.map((embedding) => ({
                  content: embedding.content,
                  embedding: embedding.values,
                })),
              },
            },
          });
        }
      }),
    );

    return successResponse("Content saved successfully");
  } catch (error) {
    logger.error(`Error saving content: ${error}`);
    return errorResponse("Failed to save content");
  }
});
