"use client";
import { useMemo, useState } from "react";
import { signIn } from "next-auth/react";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import generateDayByTimeList from "../_helpers/hours";
import formatPrice from "../_helpers/format-price";
import { format } from "date-fns";

interface ServiceCardProps {
  service: Service;
  isAuthenticated: boolean;
  barbershop: Barbershop;
}

export default function ServiceCard({
  service,
  isAuthenticated,
  barbershop,
}: ServiceCardProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>(undefined);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const timeList = useMemo(() => {
    return date ? generateDayByTimeList(date) : [];
  }, [date]);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex w-full items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex w-full flex-col">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="mt-[10px] flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {formatPrice(service.price)}
              </p>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateClick}
                      locale={ptBR}
                      fromDate={new Date()}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="flex items-center gap-4 overflow-x-auto border-t border-solid border-secondary px-5 py-6 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className={`rounded-full  ${hour === time && "border-primary"}`}
                          onClick={() => {
                            handleHourClick(time);
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-solid border-secondary px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="text-sm font-bold">
                            {formatPrice(service.price)}
                          </h3>
                        </div>

                        {date && (
                          <div className="flex items-center justify-between">
                            <h4 className="text-gray-400">Data</h4>
                            <h5 className="text-sm ">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </h5>
                          </div>
                        )}

                        {hour && (
                          <div className="flex items-center justify-between">
                            <h4 className="text-gray-400">Horário</h4>
                            <h5 className="text-sm ">{hour}</h5>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <h4 className="text-gray-400">Barberia</h4>
                          <h5 className="text-sm ">{barbershop.name}</h5>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <SheetFooter className="px-5">
                    <Button disabled={!hour || !date}>Confirmar Reserva</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
