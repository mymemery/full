import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { z } from "zod";

import type { AddLinkFormSchema } from "@/services/api";
import { crawlWebpages } from "@/services/api";

interface UseScrapedContent {
  isPending: boolean;
  scrapedContent: { [url: string]: string } | null;
  handleSubmit: (values: z.infer<typeof AddLinkFormSchema>) => void;
  setScrapedContent: React.Dispatch<
    React.SetStateAction<{ [url: string]: string } | null>
  >;
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

  const handleSubmit = (values: z.infer<typeof AddLinkFormSchema>) => {
    mutate(values);
  };

  return { isPending, scrapedContent, handleSubmit, setScrapedContent };
};

export default useScrapedContent;
