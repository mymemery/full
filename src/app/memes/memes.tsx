"use client";

import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import AddMemeries from "@/components/add-memeries";
import { Loader } from "@/components/ui/loader";
import { fetchMemeries } from "@/services/db";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Memes() {
  const { data: user } = useSession();
  const {
    data: memeries,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["memes", user.user.id],
    queryFn: fetchMemeries,
  });

  if (isError) {
    return <div>Error loading memes...</div>;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="flex size-full flex-col items-center justify-start">
      <DataTable columns={columns} data={memeries} />
      <Separator className="my-4" />
      Add new memery here:
      <AddMemeries />
    </div>
  );
}
