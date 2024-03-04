import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { z } from "zod";

import type { FormSchema } from "@/services/api";
import { crawlWebpages } from "@/services/api";

interface UseScrapedContent {
  isPending: boolean;
  scrapedContent: { [url: string]: string } | null;
  handleSubmit: (values: z.infer<typeof FormSchema>) => void;
  handleCleanUpText: (content: string) => Promise<string>;
}

const useScrapedContent = (): UseScrapedContent => {
  const [scrapedContent, setScrapedContent] = useState<{
    [url: string]: string;
  } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: crawlWebpages,
    onSuccess: (data) => {
      setScrapedContent(data.documents);
    },
  });

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    mutate(values);
  };

  const handleCleanUpText = async (content: string): Promise<string> => {
    // Implement your AI summarization logic here
    // For now, let's just return the first 100 characters
    return `${content.slice(0, 100)}...`;
  };

  return { isPending, scrapedContent, handleSubmit, handleCleanUpText };
};

export default useScrapedContent;
