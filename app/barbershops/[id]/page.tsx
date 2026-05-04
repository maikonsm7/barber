import Link from "next/link"
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default async function BarberShopPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const barbershop = await prisma.barberShop.findUnique({
        where: {
            id
        }
    })
    if (!barbershop) {
        return notFound()
    }

    return (
        <>
            <div className="relative h-60 w-full rounded-xl">
                <Image src={barbershop?.imageUrl || ""} alt={barbershop?.name || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />

                <Link href="/" className="absolute top-2 left-2">
                    <Button className="rounded-xl w-15 h-14 bg-black" asChild>
                        <ChevronLeftIcon />
                    </Button>
                </Link>

                <Link href="/" className="absolute top-2 right-2">
                    <Button className="rounded-xl w-15 h-14 bg-black" asChild>
                        <MenuIcon />
                    </Button>
                </Link>
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

            <div className="p-5 border-b text-justify space-y-2">
                <h2 className="uppercase text-gray-500">Serviços</h2>
                
            </div>
        </>
    )
}