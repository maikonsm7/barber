import Header from "@/app/_components/header";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import banner1 from "@/public/banner-01.png";
import BarbershopItem from "@/app/_components/barbershop-item";
import prismaClient from "@/lib/prisma";
import BookingItem from "@/app/_components/booking-item";
import { quickSearchOptions } from "./_constants/search";
import SearchBar from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  const data = await getServerSession(authOptions)

  // Define o início do dia de hoje (00:00:00)
  const startOfDay = new Date(); // nesse caso pega a data e hora de agora
  // startOfDay.setHours(0, 0, 0, 0);

  // Define o fim do dia de hoje (23:59:59)
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = data?.user ? await prisma.booking.findMany({
      where: {
        userId: (data?.user as any).id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      include: {
        service: {
          include: {
            barberShop: true
          }
        },
      }
    }) : []

  const barbershops = await prismaClient.barberShop.findMany({})
  return (
    <>
      <Header />
      <div className="p-5 max-w-150 w-full mx-auto">
        <h2 className="text-xl font-bold">Olá, {data?.user?.name?.split(" ")[0] || ""}</h2>
        <p className="text-muted">{format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}</p>

        <div className="mt-2">
        <SearchBar />
        </div>

        <div className="flex justify-between mt-5 overflow-auto pb-4 gap-2">
          {quickSearchOptions.map((option, i) => (
            <Button key={i} variant="outline" className="p-4" asChild>
              <Link href={`/barbershops?search=${option.title}`}>
                <Image src={option.imageUrl} alt={option.title} width={20} height={20} /> {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative w-full h-37 mt-5 rounded-2xl overflow-hidden">
          <Image src={banner1} loading="eager" alt="Banner 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>

        {bookings && bookings.length > 0 && (<>
          <h2 className="mt-5 uppercase text-gray-500">Agendamentos</h2>
          {bookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </>)}

        <h2 className="mt-5 uppercase text-gray-500">Recomendados</h2>

        <div className="mt-3 flex gap-4 overflow-auto pb-4">
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
    </>
  );
}
