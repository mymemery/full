import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import { CleanUpForm } from "@/components/clean-up-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";

export type ScrapedUrlContent = { [url: string]: string | null };

interface ScrapedContentProps {
  scrapedContent: ScrapedUrlContent;
  onSaveContent: () => Promise<void>;
  onContentChange: Dispatch<SetStateAction<ScrapedUrlContent>>;
}

const ScrapedContent: React.FC<ScrapedContentProps> = ({
  scrapedContent,
  onSaveContent,
  onContentChange,
}) => {
  const handleContentChange = (url: string, newContent: string) => {
    onContentChange((prevContent) => ({
      ...prevContent,
      [url]: newContent,
    }));
  };

  const handleSaveContent = async () => {
    await onSaveContent();
  };

  const handleDeleteContent = (url: string) => {
    onContentChange((prevContent) => {
      const newContent = { ...prevContent };
      delete newContent[url];
      return newContent;
    });
  };

  if (!scrapedContent) {
    return <Loader />;
  }

  return (
    <div className="h-full overflow-auto">
      {scrapedContent &&
        Object.keys(scrapedContent).length > 0 &&
        Object.entries(scrapedContent).map(([url, contentString]) => (
          <Card key={url} className="relative mb-4">
            <button
              className="absolute right-2 top-2 text-red-500 hover:text-red-700 focus:outline-none"
              type="button"
              onClick={() => handleDeleteContent(url)}
            >
              <X className="size-4" />
            </button>
            <CardHeader>
              <CardTitle className="truncate text-lg">{url}</CardTitle>
            </CardHeader>
            <CardContent>
              <CleanUpForm
                id={url}
                text={contentString}
                onContentChange={handleContentChange}
              />
            </CardContent>
          </Card>
        ))}
      <Button onClick={handleSaveContent}>Save Content to Memery</Button>
    </div>
  );
};

export default ScrapedContent;
