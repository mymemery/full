import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import type { z } from "zod";

import type { ScrapedUrlContent } from "@/components/scraped-content";
import { useToast } from "@/components/ui/use-toast";
import type { AddLinkFormSchema } from "@/services/api";
import { crawlWebpages, saveContent } from "@/services/api";

interface UseScrapedContent {
  isPending: boolean;
  isSaveSuccess: boolean;
  scrapedContent: ScrapedUrlContent;
  saveMutate: ReturnType<typeof useMutation>["mutate"];
  handleSubmit: (values: z.infer<typeof AddLinkFormSchema>) => void;
  setScrapedContent: React.Dispatch<React.SetStateAction<ScrapedUrlContent>>;
}

const useScrapedContent = (): UseScrapedContent => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = useSession();

  const [scrapedContent, setScrapedContent] = useState<ScrapedUrlContent>();

  const { mutate: crawlMutate, isPending: isCrawlPending } = useMutation({
    mutationFn: crawlWebpages,
    onSuccess: (data) => {
      setScrapedContent(data.documents);
    },
  });

  const {
    mutate: saveMutate,
    isPending: isSavePending,
    isSuccess: isSaveSuccess,
  } = useMutation({
    mutationFn: saveContent,
    onSuccess: () => {
      const { length } = Object.keys(scrapedContent);
      toast({
        description: `${length} link${length > 1 ? "s" : ""} saved successfully`,
      });
      setScrapedContent({});
      queryClient.invalidateQueries({ queryKey: ["memes", user.data.user.id] });
    },
    onError: (error) => {
      toast({
        description: `Error occurred while saving content: ${error.message}`,
      });
    },
  });

  const handleSubmit = (values: z.infer<typeof AddLinkFormSchema>) => {
    crawlMutate(values);
  };

  return {
    isPending: isCrawlPending || isSavePending,
    isSaveSuccess,
    scrapedContent,
    saveMutate,
    handleSubmit,
    setScrapedContent,
  };
};

export default useScrapedContent;
