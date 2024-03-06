import { useUIState } from "ai/rsc";
import type { Dispatch, SetStateAction } from "react";
import React from "react";

import type { AI } from "@/app/actions";
import { CleanUpForm } from "@/components/clean-up-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";

interface ScrapedContentProps {
  scrapedContent: { [url: string]: string };
  onSaveContent: (content: { [url: string]: string }) => Promise<void>;
  onContentChange: Dispatch<
    SetStateAction<{
      [url: string]: string;
    }>
  >;
}

const ScrapedContent: React.FC<ScrapedContentProps> = ({
  scrapedContent,
  onSaveContent,
  onContentChange,
}) => {
  const [messages] = useUIState<typeof AI>();
  const { toast } = useToast();

  const handleContentChange = (url: string, newContent: string) => {
    onContentChange((prevContent) => ({
      ...prevContent,
      [url]: newContent,
    }));
  };

  const handleSaveContent = async () => {
    await onSaveContent(scrapedContent);
    toast({
      description: `${Object.keys(scrapedContent).length} links saved successfully`,
    });
  };

  if (!scrapedContent) {
    return <Loader />;
  }

  return (
    <div className="h-full overflow-auto">
      {messages.map((message) => (
        <div key={message.id}>{message.display}</div>
      ))}
      {scrapedContent &&
        Object.entries(scrapedContent).map(([url, contentString]) => (
          <Card key={url} className="mb-4">
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
