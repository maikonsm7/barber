import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/logo.png";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
export default function Header() {
  return (
    <Card className="rounded-none py-3">
      <CardContent className="flex flex-row items-center justify-between">
        <Image src={logo} alt="Logo" width={120} />
        <Button variant="outline" size="icon"><Menu /></Button>
      </CardContent>
    </Card>
  );
}