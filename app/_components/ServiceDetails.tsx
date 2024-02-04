import React from "react";
import { Card, CardContent } from "./ui/card";
import formatPrice from "../barbershops/[barbershopID]/_helpers/format-price";

import { Barbershop, Service } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ServiceDetailsProps {
  barbershop: Barbershop;
  service: Service;
  date: Date | undefined;
  hour: string | undefined;
}

export default function ServiceDetails({
  barbershop,
  service,
  date,
  hour,
}: ServiceDetailsProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <h3 className="text-sm font-bold">{formatPrice(service.price)}</h3>
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
  );
}
