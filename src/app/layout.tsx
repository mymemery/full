import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AI } from "@/app/actions";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memery",
  description: "Digital memory aid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", inter.className)}
      >
        <Providers>
          <AI>
            <div className="flex h-screen flex-col">
              <Header />
              <div className="grow p-4">{children}</div>
            </div>
            <Toaster />
          </AI>
        </Providers>
      </body>
    </html>
  );
}
