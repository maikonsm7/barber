import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import banner1 from "@/public/banner-01.png";
import BarbershopItem from "@/components/barbershop-item";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/footer";
import BookingItem from "@/components/booking-item";
import { quickSearchOptions } from "./_constants/search";

export default async function Home() {
  const barbershops = await prisma.barberShop.findMany({})
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

        <div className="flex justify-between mt-5 overflow-auto pb-4">
          {quickSearchOptions.map((option, i) => (
            <Button key={i} variant="outline" className="p-4"> <Image src={option.imageUrl} alt={option.title} width={20} height={20} /> {option.title}</Button>
          ))}
          </div>

        <div className="relative w-full h-37 mt-5 rounded-2xl overflow-hidden">
          <Image src={banner1} loading="eager" alt="Banner 1" fill className="object-cover"/>
        </div>

        <h2 className="mt-5 uppercase text-gray-500">Agendamentos</h2>

        <BookingItem />

        <h2 className="mt-5 uppercase text-gray-500">Recomendados</h2>
        
        <div className="mt-3 flex gap-4 overflow-auto pb-4">
        {barbershops.map(barbershop => (
          <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        ))}
        </div>

      </div>
      <Footer />
    </>
  );
}
