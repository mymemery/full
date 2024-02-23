"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { logger } from "@/lib/logger";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const formSchema = z.object({
  url: z.string().url(),
});

export default function AddMemeries() {
  return (
    <div className="mt-4">
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
          {/* <AddMemeriesForm /> */}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AddMemeriesForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    logger.info("Adding memery: ", values);
  };
  return (
    <>
      <Form {...form}>
        <form id="addMemeries" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full max-w-sm items-center space-x-2">
            {/* <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="https://your-blog.com/123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            hi
          </div>
        </form>
      </Form>
      <Button form="addMemeries" variant="outline">
        +
      </Button>
    </>
  );
}
