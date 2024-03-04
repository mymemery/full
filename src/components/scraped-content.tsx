import { Wand } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface ScrapedContentProps {
  initialContent: { [url: string]: string };
  onCleanUpText: (content: string) => Promise<string>;
  onSaveContent: (content: { [url: string]: string }) => Promise<void>;
}

const ScrapedContent: React.FC<ScrapedContentProps> = ({
  initialContent,
  onCleanUpText,
  onSaveContent,
}) => {
  const [content, setContent] = useState<{ [url: string]: string }>(
    initialContent,
  );
  const { toast } = useToast();

  const handleCleanUpText = async (url: string, currentContent: string) => {
    const cleanedText = await onCleanUpText(currentContent);
    setContent((prevContent) => ({
      ...prevContent,
      [url]: cleanedText,
    }));
  };

  const handleContentChange = (url: string, newContent: string) => {
    setContent((prevContent) => ({
      ...prevContent,
      [url]: newContent,
    }));
  };

  const handleSaveContent = async () => {
    await onSaveContent(content);
    toast({
      description: `${Object.keys(content).length} links saved successfully`,
    });
  };

  return (
    <div className="h-full overflow-auto">
      {Object.entries(content).map(([url, contentString]) => (
        <Card key={url} className="mb-4">
          <CardHeader>
            <CardTitle className="truncate text-lg">{url}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={contentString}
              onChange={(e) => handleContentChange(url, e.target.value)}
              className="mb-2"
            />
            <Button
              onClick={() => handleCleanUpText(url, contentString)}
              variant="outline"
              className="flex items-center"
            >
              <Wand className="mr-2 size-4" />
              Clean Up Text
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={handleSaveContent}>Save Content to Memery</Button>
    </div>
  );
};

export default ScrapedContent;
