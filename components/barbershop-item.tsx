import { BarberShop } from "@/app/generated/prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
  barbershop: BarberShop
}

export default function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <Card className="rounded-xl min-w-44 p-0">
      <CardContent className="p-2">
        <div className="relative h-39 w-full rounded-xl overflow-hidden">
          <Image alt={barbershop.name} src={barbershop.imageUrl} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
          <Badge className="absolute top-2 left-2 bg-accent-foreground text-secondary"><StarIcon className="fill-primary text-primary" /> 5,0</Badge>
        </div>
        <div className="py-3">
          <h3 className="font-semibold truncate">{barbershop.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{barbershop.address}</p>
          <Button className="w-full mt-3" variant="outline" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Agendar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}