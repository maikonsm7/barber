import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export default function SidebarSheet(){
    return (
        <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription></SheetDescription>

              <div className="flex items-center gap-3 mt-5">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhcS1x_oRjzyj-FlAxy1W6f_3d1r7Bzcu1I7wR6I16BQ&s&ec=121657058" />
                </Avatar>
                <div>
                  <h3 className="font-bold">Maikon</h3>
                  <p className="text-xs text-muted">maikon@gmail.com</p>
                </div>
              </div>

            </SheetHeader>

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
                <Button key={i} className="justify-start gap-4" variant="ghost" asChild>
                  <Link href="/">
                    <Image src={option.imageUrl} alt={option.title} width={20} height={20} />
                    {option.title}
                  </Link>
                </Button>
              ))}
              <Button className="justify-start gap-4" variant="ghost">
                <LogOutIcon />
                Sair
              </Button>
            </div>
          </SheetContent>
    )
}