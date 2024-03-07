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

const AddMemeries = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {
    isPending,
    isSaveSuccess,
    scrapedContent,
    handleSubmit,
    handleSaveContent,
    setScrapedContent,
  } = useScrapedContent();

  const handleSaveSuccess = () => {
    setIsDialogOpen(false);
    setScrapedContent(null);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
          ) : scrapedContent && Object.keys(scrapedContent).length > 0 ? (
            <ScrapedContent
              scrapedContent={scrapedContent}
              onSaveContent={async () => {
                await handleSaveContent();
                if (isSaveSuccess) {
                  handleSaveSuccess();
                }
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
