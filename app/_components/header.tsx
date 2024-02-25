"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import useCurrentSoundUrl from "../_hooks/useCurrentSoundUrl";

const Header = () => {
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  return (
    <header>
      <Card className="rounded-bl-none rounded-br-none">
        <CardContent className="flex items-center py-3 justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Musfy" height={65} width={65} />
          </Link>
         
          <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"outline"} size={"icon"} className="h-9 w-9">
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <SideMenu setSheetIsOpen={setSheetIsOpen} />
          </Sheet>
        </CardContent>
      </Card>
    </header>
  );
};

export default Header;
