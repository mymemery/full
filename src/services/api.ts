import { z } from "zod";

import { logger } from "@/lib/logger";

const BASE_URL = "/api";

export const AddLinkFormSchema = z.object({
  urls: z.array(z.object({ url: z.string().url() })),
});

export const crawlWebpages = async (
  values: z.infer<typeof AddLinkFormSchema>,
) => {
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
