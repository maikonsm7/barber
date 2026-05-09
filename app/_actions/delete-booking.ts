"use server"

import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const deleteBooking = async (bookinId: string) => {
    const data = await getServerSession(authOptions)
    if(!data){
        throw new Error("usuário não autenticado!")
    }
    
    await prisma.booking.delete({
        where: {
            id: bookinId,
        }
    })
    revalidatePath("/bookings")
}