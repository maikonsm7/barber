"use client"

import { Card, CardContent } from "@/app/_components/ui/card";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Prisma } from "../generated/prisma/client";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button"
import Image from "next/image";
import map from "@/public/map.png"
import { Trash2Icon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";

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
}

export default function BookingItem({ booking }: BookinItemProps) {
    const today = new Date()
    const handleCancelBooking = async () => {
        try {
            await deleteBooking(booking.id)
            toast.success("Reserva cancelada com sucesso!")
        } catch (error) {
            toast.error("Erro ao cancelar reserva!")
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="mt-3 rounded-xl p-0">
                    <CardContent className="flex justify-between p-0">
                        <div className="flex flex-col gap-2 p-5">
                            <Badge className={booking.date >= today ? "" : "bg-gray-500"}>{booking.date >= today ? "Confirmado" : "Finalizado"}</Badge>
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
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Informações da reserva</SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="p-3">
                    <div className="relative mt-2 flex h-45 w-full items-end">
                        <Image
                            alt={`Mapa da barbearia ${booking.service.barberShop.name}`}
                            src={map}
                            fill
                            className="rounded-xl object-cover"
                        />

                        <Card className="z-50 ml-3 mb-3 rounded-xl p-0">
                            <CardContent className="flex items-center gap-3 p-3">
                                <Avatar>
                                    <AvatarImage src={booking.service.barberShop.imageUrl} />
                                </Avatar>
                                <div>
                                    <h3 className="font-bold">{booking.service.barberShop.name}</h3>
                                    <p className="text-xs">{booking.service.barberShop.address}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-4">
                        <Badge className={booking.date >= today ? "" : "bg-gray-500"}>{booking.date >= today ? "Confirmado" : "Finalizado"}</Badge>
                    </div>

                    <Card className="p-4 mt-4">
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between font-bold">
                                    <p>{booking.service.name}</p>
                                    <p>{booking.service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-muted">Data</p>
                                    <p>{booking.date?.toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-muted">Horário</p>
                                    <p>{booking.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="mt-4 space-y-3">
                        <h2 className="uppercase text-gray-500">Contatos</h2>
                        {booking.service.barberShop.phones.length > 0 && booking.service.barberShop.phones.map((phone, i) => (
                            <PhoneItem key={i} phone={phone} />
                        ))}
                    </div>
                </div>

                <SheetFooter>
                    {booking.date >= today && (
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit" variant="destructive">Cancelar Reserva</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                                    <Trash2Icon />
                                </AlertDialogMedia>
                                <AlertDialogTitle>Cancelar reserva?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deseja realmente cancelar sua reserva?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant="outline">Cancelar</AlertDialogCancel>
                                <AlertDialogAction variant="destructive" onClick={handleCancelBooking} >Deletar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    )}

                    <SheetClose asChild>
                        <Button variant="outline">Voltar</Button>
                    </SheetClose>
                </SheetFooter>

            </SheetContent>

        </Sheet>
    );
}