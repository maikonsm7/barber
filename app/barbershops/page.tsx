import BarbershopItem from "@/app/_components/barbershop-item"
import PrismaClient from "@/lib/prisma"
import SearchBar from "../_components/search"
import Header from "../_components/header"

export default async function BarberShopsPage({
    searchParams
}: {
    searchParams: Promise<{ search: string }>
}) {
    const { search } = await searchParams
    const barberShops = await PrismaClient.barberShop.findMany({
        where: {
            name: {
                contains: search,
                mode: "insensitive",
            }
        }
    })
    return (
        <>

        <Header />
        <div className="p-3">
        <SearchBar />
        </div>
            {barberShops &&
                (<>
                    <h2 className="uppercase text-gray-500 p-3">
                        Resultado para '{search}''
                    </h2>
                    <div className="grid grid-cols-2 gap-4 p-3">
                        {barberShops.map(barbershop => (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        ))
                        }
                    </div>
                </>)
            }
        </>
    )
}