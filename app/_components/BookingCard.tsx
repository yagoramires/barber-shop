import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingCard({ booking }: BookingItemProps) {
  const status = isPast(booking.date);

  return (
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
  );
}
