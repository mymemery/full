"use client";

import { useCompletion } from "ai/react";
import { Wand } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CleanUpFormProps = {
  id: string;
  text: string;
  onContentChange: (url: string, newContent: string) => void;
};

export function CleanUpForm({ id, text, onContentChange }: CleanUpFormProps) {
  const {
    completion,
    handleInputChange,
    handleSubmit,
    input,
    setInput,
    stop,
    isLoading,
  } = useCompletion({
    api: "/api/clean",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(id, e.target.value);
    handleInputChange(e);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  useEffect(() => {
    setInput(text);
  });

  useEffect(() => {
    if (completion) {
      setInput(completion);
      onContentChange(id, completion);
    }
  }, [completion]);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-col space-y-2">
          <Textarea
            value={input}
            placeholder="Enter your scraped text..."
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <Button type="button" onClick={stop} variant="link">
              Stop
            </Button>
            <Button disabled={isLoading} type="submit" variant="outline">
              <Wand className="mr-2 size-4" />
              Clean Up Text
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
