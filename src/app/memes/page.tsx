import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import AccessDenied from "@/components/access-denied";
import { auth } from "@/lib/auth";
import { fetchMemeries } from "@/services/db";

import Memes from "./memes";

export default async function MemesPage() {
  const user = await auth();

  if (!user) {
    return <AccessDenied />;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["memes", user.user.id],
    queryFn: () => fetchMemeries(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionProvider session={user}>
        <Memes />
      </SessionProvider>
    </HydrationBoundary>
  );
}
