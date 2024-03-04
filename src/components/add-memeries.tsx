"use client";

import AddLinks from "@/components/add-links";
import ScrapedContent from "@/components/scraped-content";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";
import useScrapedContent from "@/hooks/use-scraped-content";
import { logger } from "@/lib/logger";

const AddMemeries = () => {
  const { isPending, scrapedContent, handleSubmit, handleCleanUpText } =
    useScrapedContent();

  const handleSaveContent = async (content: { [url: string]: string }) => {
    try {
      await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });
      logger.info("Content saved successfully");
      // Handle success
    } catch (error) {
      // Handle error
      logger.error(`Failed saving content: ${error}`);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-blue-400 hover:bg-blue-600">
            +
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Memeries</DialogTitle>
          </DialogHeader>
          {isPending ? (
            <Loader />
          ) : scrapedContent ? (
            <ScrapedContent
              initialContent={scrapedContent}
              onCleanUpText={handleCleanUpText}
              onSaveContent={handleSaveContent}
            />
          ) : (
            <AddLinks onSubmit={handleSubmit} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddMemeries;
