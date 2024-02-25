"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logger } from "@/lib/logger";

const FormSchema = z.object({
  // urls: z.string().url().array(),
  urls: z.array(z.object({ url: z.string().url() })),
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
          <AddMemeriesForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function AddMemeriesForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      urls: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    logger.info("Adding memery: ", values);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"h-80 space-y-2 overflow-auto"}
        >
          {fields.map((field, index) => {
            return (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}`}
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>Link {index + 1}</FormLabel>
                      <div className="relative">
                        <Input
                          placeholder="https://mymemery.co.uk"
                          {...form.register(`urls.${index}.url`)}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                            variant="ghost"
                          >
                            <XCircle className="" />
                          </Button>
                        )}
                      </div>
                      <FormControl />

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            );
          })}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                append({ url: "" });
              }}
            >
              +
            </Button>
            <Button type="submit">
              Scrape {fields.length} link{fields.length > 1 ? "s" : ""}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
