import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface BarberShopCardProps {
  barbershop: Barbershop;
}

export default function BarberShopCard({ barbershop }: BarberShopCardProps) {
  return (
    <Card className="min-w-[167px] max-w-[167px] rounded-2xl">
      <CardContent className="p-0">
        <div className="relative p-1 pb-2">
          <div className="absolute left-3 top-3 z-10">
            <Badge
              variant={"secondary"}
              className="flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs"> 5.0 </span>
            </Badge>
          </div>
          <Image
            src={barbershop.imageUrl}
            height={0}
            width={0}
            sizes="100vw"
            className="h-[159px] w-full rounded-2xl object-cover"
            alt={barbershop.name}
          />
        </div>
        <div className="px-3 pb-3">
          <h2 className="overflow-hidden text-ellipsis text-nowrap font-bold">
            {barbershop.name}
          </h2>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button className="w-full" variant={"outline"}>
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
