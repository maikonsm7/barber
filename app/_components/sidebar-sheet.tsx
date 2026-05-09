"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react"

import {
  Dialog,
  DialogTrigger,
} from "@/app/_components/ui/dialog"
import SignInDialog from "./sign-in-dialog";

export default function SidebarSheet() {
  const { data } = useSession()
  const handleLogin = () => signIn("google")
  const handleLogout = () => signOut()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>

      {data?.user ? (
        <div className="flex items-center gap-3 px-5">
          <Avatar className="w-12 h-12">
            <AvatarImage src={data.user.image || ""} />
          </Avatar>
          <div>
            <h3 className="font-bold">{data.user.name}</h3>
            <p className="text-xs text-muted">{data.user.email}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-5">
          <h2 className="font-bold text-lg">Olá! Faça seu login!</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <SignInDialog />
          </Dialog>
        </div>
      )}

      <div className="flex flex-col p-5 gap-4 border-b">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Inicio
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>

      <div className="flex flex-col p-5 gap-4">
        {quickSearchOptions.map((option, i) => (
          <SheetClose key={i} asChild>
            <Button className="justify-start gap-4" variant="ghost" asChild>
              <Link href={`/barbershops?search=${option.title}`} className="flex gap-4">
                <Image src={option.imageUrl} alt={option.title} width={20} height={20} />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
        {data?.user && (
          <Button className="justify-start gap-4" variant="ghost" onClick={handleLogout}>
            <LogOutIcon />
            Sair
          </Button>
        )}
      </div>
    </SheetContent>
  )
}