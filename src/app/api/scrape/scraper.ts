import puppeteer from "puppeteer";

import { logger } from "@/lib/logger";

export type UrlItem = {
  url: string;
};

export async function scrape(urls: UrlItem[]): Promise<Record<string, string>> {
  logger.info(`Scraping URLs: ${urls}`);
  const result = {};
  const customUA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36";
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "shell",
  });

  logger.info("Browser launched");
  const documents = await Promise.all(
    urls.map(async (urlItem) => {
      try {
        const { url } = urlItem;
        const page = await browser.newPage();
        await page.setUserAgent(customUA);
        await page.goto(url, { waitUntil: "networkidle2" });
        let data = await page.evaluate(() => {
          return document.body.innerText;
        });

        data = cleanText(data);
        logger.info(`Scraped data: ${data}`);
        await page.close();
        return { [url]: data };
      } catch (error) {
        logger.error(`Error scraping ${urlItem.url}: ${error}`);
        return { [urlItem.url]: null };
      }
    }),
  );

  logger.info(`Scraped documents: ${documents}`);
  await browser.close();

  documents.forEach((doc) => {
    const key = Object.keys(doc)[0];
    result[key] = doc[key];
  });
  return result;
}

function cleanText(input: string): string {
  // Split the input into lines, trim each line, and filter out empty lines or lines that become empty after trimming
  const cleanedLines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== "·");

  return cleanedLines.join("\n");
}
