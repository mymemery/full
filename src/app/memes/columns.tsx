"use client";

import type { Meme } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Meme>[] = [
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAtRelative",
    header: "Created",
  },
];
