"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import SideMenu from "@/app/_components/SideMenu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";

interface BarbershopDataProps {
  barbershop: Barbershop;
}

export default function BarbershopData({ barbershop }: BarbershopDataProps) {
  const router = useRouter();

  const handleClickBackButton = () => {
    router.back();
  };

  return (
    <div>
      <div className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-4 z-50"
          onClick={handleClickBackButton}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className=" absolute right-4 top-4 z-50"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SideMenu />
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          className="object-cover opacity-75"
          alt={barbershop.name}
        />
      </div>
      <div className="border-b border-secondary  px-5 pb-6 pt-3">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <p className="mb-2 flex items-center gap-2 text-sm">
          <MapPinIcon className="text-primary" size={18} />
          {barbershop.address}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <StarIcon className="fill-primary text-primary" size={18} />
          5.0 (900 avaliações)
        </p>
      </div>
    </div>
  );
}
