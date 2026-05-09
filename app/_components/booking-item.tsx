import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Prisma } from "../generated/prisma/client";

interface BookinItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: {
                include: {
                    barberShop: true
                }
            }
        }
    }>
    status: string
}

export default function BookingItem({ booking, status }: BookinItemProps) {
    const today = new Date()
    return (
        <Card className="mt-3 rounded-xl p-0">
            <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 p-5">
                    <Badge>{status}</Badge>
                    <h3>{booking.service.name}</h3>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={booking.service.barberShop.imageUrl} />
                        </Avatar>
                        <p>{booking.service.barberShop.name}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center border-l px-5">
                    <p className="text-sm">{booking.date.toLocaleString('pt-BR', { month: 'long' })}</p>
                    <p className="text-2xl">{booking.date.toLocaleString('pt-BR', { day: '2-digit' })}</p>
                    <p className="text-sm">{booking.date.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </CardContent>
        </Card>
    );
}