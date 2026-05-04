import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import banner1 from "@/public/banner-01.png";

export default function Home() {
  return (
    <>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Maikon!</h2>
        <p>Segunda-feira, 4 de Maio.</p>

        <div className="flex mt-5 items-center gap-1">
        <Input placeholder="Buscar..." />
        <Button className="ml-2"><Search /></Button>
        </div>

        <div className="relative w-full h-37 mt-5 rounded-2xl overflow-hidden">
          <Image src={banner1} alt="Banner 1" fill className="object-cover"/>
        </div>

      </div>
    </>
  );
}
