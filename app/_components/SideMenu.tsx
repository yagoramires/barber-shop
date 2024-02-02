"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";

import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

export default function SideMenu() {
  const { data } = useSession();

  const handleLoginClick = () => signIn("google");
  const handleLogoutClick = () => signOut();

  return (
    <SheetContent className="p-0">
      <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
              <AvatarFallback>{data.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <h2>{data.user.name}</h2>
          </div>
          <Button
            onClick={handleLogoutClick}
            variant={"secondary"}
            size={"icon"}
          >
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 px-5 py-6">
          <div className="flex items-center gap-2">
            <UserIcon size={18} />
            <h2 className="font-bold">Olá, faça seu login</h2>
          </div>

          <Button
            onClick={handleLoginClick}
            variant={"secondary"}
            className="flex w-full items-center justify-center gap-2"
          >
            <LogInIcon size={18} />
            Fazer Login
          </Button>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5">
        <Button asChild variant={"outline"} className="justify-start">
          <Link href="/">
            <HomeIcon size={18} className="mr-2" />
            Início
          </Link>
        </Button>

        {data?.user && (
          <Button asChild variant={"outline"} className="justify-start">
            <Link href="/bookings">
              <CalendarIcon size={18} className="mr-2" />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </SheetContent>
  );
}
