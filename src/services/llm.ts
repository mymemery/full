import { OpenAIStream } from "ai";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function getEmbeddings(
  input: string,
  chunkSize: number = 1000,
  chunkOverlap: number = 200,
): Promise<{ id: string; content: string; values: number[] }[]> {
  try {
    // Create a new instance of RecursiveCharacterTextSplitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });

    // Split the input text into chunks using the splitter
    const docs = await splitter.splitDocuments([
      new Document({ pageContent: input }),
    ]);

    // Generate embeddings for each chunk
    const embeddings = await Promise.all(
      docs.map(async (doc) => {
        const content = doc.pageContent.replace(/\n/g, " ");
        const response = await openai.embeddings.create({
          model: "text-embedding-3-small",
          input: content,
        });

        return {
          id: doc.metadata.hash || crypto.randomUUID(),
          content,
          values: response.data[0].embedding,
        };
      }),
    );

    return embeddings;
  } catch (e) {
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}

export async function cleanTextStream(
  input: string,
): Promise<ReadableStream<string>> {
  const prompt = `Remove unnecessary words from this text that has been web crawled. Such words could be related to menus, navigation bars, footers, headers, cookie consent messages, privacy, advertisements, and other information that is not part of the main text or article of the page itself. When removing such words, make sure to leave the original text untouched. Don't add any additional description, ONLY RESPOND WITH the cleaned text. Do not make words up! The scraped text is: ${input}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 2000,
      stream: true,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return OpenAIStream(response);
  } catch (e) {
    throw new Error(`Error calling OpenAI completion API: ${e}`);
  }
}
