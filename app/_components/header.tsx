import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheet from "./sidebar-sheet";

export default function Header() {
  return (
    <Card className="rounded-none py-3">
      <CardContent className="flex flex-row items-center justify-between">
        <Image src={logo} alt="Logo" width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
              </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>

      </CardContent>
    </Card>
  );
}