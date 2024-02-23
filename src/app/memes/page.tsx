import AccessDenied from "@/components/access-denied";
import AddMemeries from "@/components/add-memeries";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import prisma from "@/prisma/index";

import { columns } from "./columns";
import { DataTable } from "./data-table";

function timeAgo(input: string | Date | number) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = [
    ["years", 3600 * 24 * 365],
    ["months", 3600 * 24 * 30],
    ["weeks", 3600 * 24 * 7],
    ["days", 3600 * 24],
    ["hours", 3600],
    ["minutes", 60],
    ["seconds", 1],
  ] as const;
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;

  for (const [rangeType, rangeVal] of ranges) {
    if (rangeVal < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / rangeVal;
      return formatter.format(Math.round(delta), rangeType);
    }
  }

  return "just now";
}

export default async function Memes() {
  const user = await auth();
  if (!user) {
    return <AccessDenied />;
  }

  let memeries = await prisma.meme.findMany({
    where: { userId: user.user.id },
    take: 10,
  });

  memeries = memeries.map((meme) => {
    return {
      ...meme,
      createdAtRelative: timeAgo(meme.createdAt),
    };
  });

  return (
    <div className="flex size-full flex-col items-center justify-start">
      <DataTable columns={columns} data={memeries} />
      <Separator className="my-4" />
      Add new memery here:
      <AddMemeries />
    </div>
  );
}
