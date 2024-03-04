import { z } from "zod";

import { logger } from "@/lib/logger";

const BASE_URL = "/api";

export const FormSchema = z.object({
  urls: z.array(z.object({ url: z.string().url() })),
});

export const crawlWebpages = async (values: z.infer<typeof FormSchema>) => {
  try {
    logger.info("Adding memery: ", values);
    const response = await fetch(`${BASE_URL}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`Failed to scrape memery link: ${response.statusText}`);
    }
    const scrapedDocuments = await response.json();
    logger.info(`Scraped documents: ${scrapedDocuments}`);
    return scrapedDocuments;
  } catch (error) {
    logger.error(`Failed to add memery: ${error}`);
    throw error;
  }
};

export const cleanUpText = async (text: string) => {
  try {
    logger.info(`Cleaning text: ${text.slice(0, 100)}`);
    const response = await fetch(`${BASE_URL}/clean`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error(`Failed to clean text: ${response.statusText}`);
    }
    const { cleanedText } = await response.json();
    logger.info(`Cleaned text: ${cleanedText.slice(0, 100)}`);
    return cleanedText;
  } catch (error) {
    logger.error(`Failed to clean text: ${error}`);
    throw error;
  }
};
