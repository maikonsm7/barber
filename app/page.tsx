import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import banner1 from "@/public/banner-01.png";
import cabelo from "@/public/cabelo.svg";
import barba from "@/public/barba.svg";
import acabamento from "@/public/acabamento.svg";
import BarbershopItem from "@/components/barbershop-item";
import { prisma } from "@/lib/prisma";
import Footer from "@/components/footer";
import BookingItem from "@/components/booking-item";

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

        <div className="flex justify-between mt-5">
          <Button variant="outline" className="p-4"> <Image src={cabelo} alt="Cabelo" width={20} height={20} /> Cabelo</Button>
          <Button variant="outline" className="p-4"> <Image src={barba} alt="Barba" width={20} height={20} /> Barba</Button>
          <Button variant="outline" className="p-4"> <Image src={acabamento} alt="Acabamento" width={20} height={20} /> Acabamento</Button>
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
