import Link from "next/link"
import PrismaClient from "@/lib/prisma";
import Image from "next/image";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { notFound } from "next/navigation";
import ServiceItem from "@/app/_components/service-item";
import PhoneItem from "@/app/_components/phone-item";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import SidebarSheet from "@/app/_components/sidebar-sheet";

export default async function BarberShopPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const barbershop = await PrismaClient.barberShop.findUnique({
        where: {
            id
        },
        include: {
            services: true
        }
    })
    if (!barbershop) {
        return notFound()
    }

    const serializedServices = barbershop.services.map(service => ({
        ...service,
        price: Number(service.price)
    }))

    return (
        <>
            <div className="relative h-60 w-full rounded-xl">
                <Image src={barbershop?.imageUrl || ""} loading="eager" alt={barbershop?.name || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                <Button variant="secondary" size="icon" className="absolute top-2 left-2" asChild>
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="secondary" size="icon" className="absolute top-2 right-2 p-2" asChild>
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>

            </div>

            <div className="flex flex-col gap-3 p-5 border-b">
                <h1 className="text-2xl font-bold">{barbershop?.name}</h1>

                <div className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" />
                    <p className="text-sm text-muted-foreground">{barbershop?.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="text-primary fill-primary" />
                    <p className="text-sm text-muted-foreground">5,0 (376 avaliações)</p>
                </div>
            </div>

            <div className="p-5 border-b text-justify space-y-2">
                <h2 className="uppercase text-gray-500">Descriçáo</h2>
                <p className="text-sm text-muted-foreground">{barbershop?.description}</p>
            </div>

            <div className="p-5 space-y-3 border-b">
                <h2 className="uppercase text-gray-500">Serviços</h2>
                {serializedServices.length > 0 && serializedServices.map(service => (
                    <ServiceItem key={service.id} service={service} barbershopName={barbershop.name} />
                ))}
            </div>

            <div className="p-5 space-y-3">
                <h2 className="uppercase text-gray-500">Contatos</h2>
                {barbershop.phones.length > 0 && barbershop.phones.map((phone, i) => (
                    <PhoneItem key={i} phone={phone} />
                ))}
            </div>
        </>
    )
}