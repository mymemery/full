import { zodResolver } from "@hookform/resolvers/zod";
import { XCircle } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddLinkFormSchema } from "@/services/api";

interface AddLinksProps {
  onSubmit: (values: z.infer<typeof AddLinkFormSchema>) => void;
}

const AddLinks: React.FC<AddLinksProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof AddLinkFormSchema>>({
    resolver: zodResolver(AddLinkFormSchema),
    defaultValues: {
      urls: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "urls",
  });

  const handleSubmit = (values: z.infer<typeof AddLinkFormSchema>) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="h-80 space-y-2 overflow-auto"
      >
        {fields.map((field, index) => (
          <FormField
            control={form.control}
            key={field.id}
            name={`urls.${index}`}
            render={() => (
              <FormItem>
                <FormLabel>Link {index + 1}</FormLabel>
                <div className="relative">
                  <Input
                    placeholder="https://mymemery.co.uk"
                    className="pr-12"
                    {...form.register(`urls.${index}.url`)}
                  />
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute right-0 top-1/2 grow -translate-y-1/2 text-slate-400"
                      variant="ghost"
                    >
                      <XCircle className="size-4" />
                    </Button>
                  )}
                </div>
                <FormControl />
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ url: "" })}
          >
            +
          </Button>
          <Button type="submit">
            Scrape {fields.length} link{fields.length > 1 ? "s" : ""}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddLinks;
