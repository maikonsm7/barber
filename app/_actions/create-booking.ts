"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

interface CreateBookingParams{
    serviceId: string,
    date: Date,
}

export const createBooking = async (params: CreateBookingParams) => {
    const data = await getServerSession(authOptions)
    if(!data){
        throw new Error("usuário não autenticado!")
    }
    
    await prisma.booking.create({
        data: {...params, userId: (data.user as any).id}
    })
}