import Header from "../_components/header";
import BookingItem from "../_components/booking-item";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Bookings() {
    const data = await getServerSession(authOptions)
    if (!data?.user) {
        throw new Error("Usuário não autenticado!")
    }
    const today = new Date()
    const bookings = await prisma.booking.findMany({
        where: {
            userId: (data?.user as any).id
        },
        include: {
            service: {
                include: {
                    barberShop: true
                }
            },
        }
    })

    const confirmeds = bookings.filter(booking => booking.date >= today)
    const completeds = bookings.filter(booking => booking.date < today)

    return (
        <>
            <Header />
            <div className="p-4">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                <h2 className="mt-5 uppercase text-gray-500">Confirmados</h2>
                {confirmeds.map(booking => (
                    <BookingItem key={booking.id} booking={booking} status="Confirmado" />
                ))}
                <h2 className="mt-5 uppercase text-gray-500">Finalizados</h2>
                {completeds.map(booking => (
                    <BookingItem key={booking.id} booking={booking} status="Finalizado" />
                ))}
            </div>
        </>
    )
}