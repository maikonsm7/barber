import { BarberShopService } from "@/app/generated/prisma/client";
import { Card, CardContent } from "@/app/_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface BarberShopServiceProps {
  barbershopService: BarberShopService
}

export default function ServiceItem({ barbershopService }: BarberShopServiceProps) {
  return (
    <Card className="rounded-xl min-w-44 p-1">
      <CardContent className="flex p-1 gap-4">
        <div className="relative h-30 w-60 rounded-xl overflow-hidden">
          <Image alt={barbershopService.name} loading="eager" src={barbershopService.imageUrl} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
        </div>
        <div>
          <h3 className="font-semibold truncate">{barbershopService.name}</h3>
          <p className="text-sm text-muted-foreground">{barbershopService.description}</p>
          
          <div className="flex items-center justify-between mt-3">
          <p className="text-sm font-bold text-primary">R$ {barbershopService.price.toFixed(2)}</p>
          <Button variant="outline" className="">Agendar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}