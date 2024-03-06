import { createAI, getMutableAIState, render } from "ai/rsc";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

async function cleanUpTextAi(userInput: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update([...aiState.get(), { role: "user", content: userInput }]);

  const prompt = `Remove unnecessary words from this text that has been web crawled. Such words could be related to menus, navigation bars, footers, headers, cookie consent, and other information that is not part of the main text or article of the page itself. When removing such words, make sure to leave the original text untouched.`;
  const ui = render({
    model: "gpt-3.5-turbo",
    provider: openai,
    messages: [
      { role: "system", content: prompt },
      { role: "user", content: userInput },
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }
      return <>{content}</>;
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    cleanUpTextAi,
  },
  // Each state can be any shape of object, but for chat applications
  // it makes sense to have an array of messages. Or you may prefer something like { id: number, messages: Message[] }
  initialUIState,
  initialAIState,
});
