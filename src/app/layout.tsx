import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import MainMenu from "@/components/main-menu";
import { cn } from "@/lib/utils";

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
        <div className="flex h-screen flex-col">
          <div className="flex items-center justify-between p-4">
            <MainMenu />
          </div>
          <div className="grow p-4">{children}</div>
        </div>
      </body>
    </html>
  );
}
