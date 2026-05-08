"use server"

import prisma from "@/lib/prisma"
import { endOfDay, startOfDay } from "date-fns"

interface GetBookingsProps{
    serviceId: string
    date: Date
}

export const getBookings = async ({serviceId, date}: GetBookingsProps) => {
    // retorno implicito nao precisa colocar o async await, pois a funcao vai ser chamada com async await
    const bookings = await prisma.booking.findMany({
        where: {
            date: {
                lte: endOfDay(date), // menor ou igual a data
                gte: startOfDay(date) // maior ou igual a data
            }
        }
    })
    return bookings
}