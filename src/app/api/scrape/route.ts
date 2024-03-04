import { logger } from "@/lib/logger";

import type { UrlItem } from "./scraper";
import { scrape } from "./scraper";

export async function POST(req: Request) {
  const { urls } = await req.json();
  logger.info(`URLs to scrape: ${urls.map((url: UrlItem) => url.url)}`);
  try {
    const documents = await scrape(urls);
    logger.info(`Result from scrape: ${documents}`);
    return Response.json({ success: true, documents });
  } catch (error) {
    return Response.json({ success: false, error: "Failed scraping" });
  }
}
