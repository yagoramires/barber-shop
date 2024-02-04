"use client";
import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import ServiceDetails from "./ServiceDetails";
import { Button } from "./ui/button";
import { cancelBooking } from "../_actions/cancelBooking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingCard({ booking }: BookingItemProps) {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const status = isPast(booking.date);

  const hour = format(booking.date, "hh:mm");

  const handleCancelBooking = async () => {
    setIsDeleteLoading(true);
    try {
      await cancelBooking(booking.id);

      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[90%]">
          <CardContent className="flex p-0 ">
            <div className="flex flex-[3] flex-col gap-[10px] p-5">
              <Badge
                className="w-fit text-primary"
                variant={status ? "secondary" : "default"}
              >
                {status ? "Finalizado" : "Confirmado"}
              </Badge>

              <h2 className="font-bold">{booking.service.name}</h2>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                  <AvatarFallback>YR</AvatarFallback>
                </Avatar>

                <h3 className="text-sm">{booking.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-secondary px-2 py-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-sm">
                {format(booking.date, "hh:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6">
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 h-[180px] w-full">
          <Image
            src={"/map.svg"}
            fill
            className="contain"
            alt={booking.barbershop.name}
          />
          <div className="absolute bottom-4 left-0 w-full px-5">
            <Card className="mx-5">
              <CardContent className="flex gap-2 p-3">
                <Avatar>
                  <AvatarImage src={booking.barbershop.imageUrl} />
                </Avatar>

                <div>
                  <h2 className="font-bold">{booking.barbershop.name}</h2>
                  <h3 className="overflow-hidden text-ellipsis text-nowrap text-xs">
                    {booking.barbershop.address}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-3 mt-6 px-5">
          <Badge
            className="w-fit text-primary"
            variant={status ? "secondary" : "default"}
          >
            {status ? "Finalizado" : "Confirmado"}
          </Badge>
        </div>

        <div className="px-5">
          <ServiceDetails
            barbershop={booking.barbershop}
            service={booking.service}
            date={booking.date}
            hour={hour}
          />
        </div>

        <SheetFooter className="mt-6 flex-row gap-3 px-5">
          <SheetClose asChild>
            <Button className="w-full" variant="secondary">
              Voltar
            </Button>
          </SheetClose>
          {!status && (
            <Button
              className="w-full"
              variant="destructive"
              onClick={handleCancelBooking}
              disabled={isDeleteLoading}
            >
              {isDeleteLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Cancelar Reserva
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
