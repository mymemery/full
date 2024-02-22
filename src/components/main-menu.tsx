"use client";

import { MenuIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Separator } from "./ui/separator";

export default function MainMenu() {
  // const isDesktop = useMediaQuery("(min-width: 2400px)"); // Leaving this in here for future reference
  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto my-4 text-xl">Memery</div>
          <Separator className="my-4" />
          <div className="ml-10">Chats</div>
          <Separator className="my-2" />
          <div className="ml-10">Links</div>
        </DrawerContent>
      </Drawer>
      <Button
        variant="ghost"
        className="text-lg text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100"
      >
        Memery
      </Button>
      <Avatar>
        <AvatarImage src="" alt="user" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </>
  );
}
