"use client"

import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { set } from "date-fns";

interface BarberShopServiceProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: Number;
    imageUrl: string;
    barberShopId: string;
    createdAt: Date;
    updatedAt: Date;
  },
  barbershopName: string
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

export default function ServiceItem({ service, barbershopName }: BarberShopServiceProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const {data} = useSession()
  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDay(date)
  }
  const handleTimeSelected = (time: string) => {
    setSelectedTime(time)
  }
  const handleCreateBooking = async () => {
    if(!selectedDay || !selectedTime) return

    const hours = selectedTime.split(":")[0]
    const minute = selectedTime.split(":")[1]
    const newDate = set(selectedDay, {
      minutes: Number(minute),
      hours: Number(hours),
    })
    // await createBooking({
    //   userId: data?.user,
    //   serviceId: service.id,
    //   date: newDate
    // })
  }

  return (
    <Card className="rounded-xl min-w-44 p-1">
      <CardContent className="flex p-1 gap-4">
        <div className="relative h-30 w-60 rounded-xl overflow-hidden">
          <Image alt={service.name} loading="eager" src={service.imageUrl} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
        </div>
        <div>
          <h3 className="font-semibold truncate">{service.name}</h3>
          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="flex items-center justify-between mt-3">
            <p className="text-sm font-bold text-primary">R$ {service.price.toFixed(2)}</p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="">Agendar</Button>
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Fazer reserva</SheetTitle>
                  <SheetDescription></SheetDescription>
                </SheetHeader>

                <div className="py-5 flex justify-center border-b">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    className="rounded-lg border"
                    selected={selectedDay}
                    onSelect={handleDateSelected}
                  />
                </div>

                {selectedDay && (
                  <div className="flex py-5 px-3 gap-3 overflow-auto border-b">
                    {TIME_LIST.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => handleTimeSelected(time)}>{time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && (<>
                  <Card className="p-4 m-4">
                    <CardContent className="p-0">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between font-bold">
                          <p>{service.name}</p>
                          <p>R$ {service.price.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted">Data</p>
                          <p>{selectedDay?.toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted">Horário</p>
                          <p>{selectedTime}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-muted">Barbearia</p>
                          <p>{barbershopName}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Button className="mx-4 mt-4">Confirmar</Button>
                </>
                )}

              </SheetContent>

            </Sheet>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}