"use client";

import React from "react";
import {
  CalendarIcon,
  DownloadCloud,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  PlusIcon,
  StarIcon,
  UserIcon,
} from "lucide-react";

import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";

interface SideMenuProps {
  setSheetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideMenu = ({ setSheetIsOpen }: SideMenuProps) => {
  const { data } = useSession();

  const handleLogin = async () => {
    await signIn("google");
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <SheetContent className="p-0">
        <SheetHeader className="text-left border-b border-solid border-secondary p-5">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        {data && data.user ? (
          <div className="flex justify-between px-5 py-6 items-center">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={data.user.image ?? ""} />
              </Avatar>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>

            <Button onClick={handleLogout} variant={"secondary"} size={"icon"}>
              <LogOutIcon />
            </Button>
          </div>
        ) : (
          <div className="px-5 py-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <UserIcon size={31} />
              <h2 className="font-bold">Olá, faça seu login</h2>
            </div>

            <Button
              onClick={handleLogin}
              variant={"secondary"}
              className="w-full justify-start"
            >
              <LogInIcon className="mr-3" size={18} />
              Fazer login
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3 px-5">
          <Button
            onClick={() => setSheetIsOpen(false)}
            asChild
            variant={"outline"}
            className="justify-start"
          >
            <Link href="/">
              <HomeIcon size={18} className="mr-2" />
              Início
            </Link>
          </Button>

          {data && data.user && (
            <Button
              onClick={() => setSheetIsOpen(false)}
              asChild
              variant={"outline"}
              className="justify-start"
            >
              <Link href={`/user/${(data.user as any).id}`}>
                <UserIcon size={18} className="mr-2" />
                Meu perfil
              </Link>
            </Button>
          )}

          {data && data.user && (
            <Button
              onClick={() => setSheetIsOpen(false)}
              asChild
              variant={"outline"}
              className="justify-start"
            >
              <Link href="/new-song">
                <PlusIcon size={18} className="mr-2" />
                Nova Música
              </Link>
            </Button>
          )}

          {/* {data && data.user && (
            <Button
              onClick={() => setSheetIsOpen(false)}
              asChild
              variant={"outline"}
              className="justify-start"
            >
              <Link href="/import-song">
                <DownloadCloud size={18} className="mr-2" />
                Importar Musica
              </Link>
            </Button>
          )} */}
        </div>
      </SheetContent>
    </>
  );
};

export default SideMenu;
