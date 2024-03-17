"use client";

import { useState } from "react";

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
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    isPending,
    scrapedContent,
    handleSubmit,
    saveMutate,
    setScrapedContent,
  } = useScrapedContent();

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-blue-400 hover:bg-blue-600">
            +
          </Button>
        </DialogTrigger>
        <DialogContent className="h-fit max-h-full">
          <DialogHeader>
            <DialogTitle>Add Memeries</DialogTitle>
          </DialogHeader>
          {isPending ? (
            <Loader />
          ) : scrapedContent && Object.keys(scrapedContent).length > 0 ? (
            <ScrapedContent
              scrapedContent={scrapedContent}
              onSaveContent={async () => {
                saveMutate(scrapedContent, {
                  onSuccess: () => {
                    setIsDialogOpen(false);
                  },
                  onError: (error) => {
                    logger.error(`error in save content: ${error}`);
                  },
                });
              }}
              onContentChange={setScrapedContent}
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
