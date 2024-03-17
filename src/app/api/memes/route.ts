import {
  errorResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/api";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import prisma from "@/prisma/index";

export const GET = auth(async (req) => {
  try {
    const user = req.auth;
    if (!user) {
      return unauthorizedResponse();
    }

    const memeries = await prisma.meme.findMany({
      where: { userId: user.user.id },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    return successResponse("Memes fetched", memeries);
  } catch (error) {
    logger.error(error);
    return errorResponse("Failed to fetch memes");
  }
});
