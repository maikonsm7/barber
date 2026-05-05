import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
export default function Header() {
  return (
    <Card className="rounded-none py-3">
      <CardContent className="flex flex-row items-center justify-between">
        <Image src={logo} alt="Logo" width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon"><Menu /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>This action cannot be undone.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

      </CardContent>
    </Card>
  );
}