import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { Barbershop, Booking as IBooking } from "@prisma/client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import SearchBar from "./_components/SearchBar";
import BookingCard from "@/app/_components/BookingCard";
import BarberShopCard from "./_components/BarberShopCard";
import { authOptions } from "../_lib/auth";
import Header from "../_components/header";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          name: "asc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any)?.id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

  return (
    <main>
      <Header />

      <div className="mt-6 px-5">
        <h2 className="text-xl font-bold">
          {session?.user
            ? `Olá, ${session.user.name}`
            : "Olá, vamos agendar um corte hoje?"}
        </h2>

        <p className="text-sm first-letter:uppercase">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <SearchBar />
      </div>

      {confirmedBookings.length > 0 && (
        <div className="mt-6 pl-5">
          <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
            Agendamentos
          </h2>

          <div className=" mt-6 flex gap-3 overflow-x-auto pr-5 [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.map((booking: IBooking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pl-5">
        <h2 className="mb-3 text-sm  font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <ul className="flex gap-4 overflow-x-auto pr-5 [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops?.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopCard barbershop={barbershop} />
            </div>
          ))}
        </ul>
      </div>

      <div className="mb-[4.5rem] mt-6 pl-5">
        <h2 className="mb-3 text-sm  font-bold uppercase text-gray-400">
          Populares
        </h2>

        <ul className="flex gap-4 overflow-x-auto pr-5 [&::-webkit-scrollbar]:hidden">
          {barbershops?.map((barbershop: Barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarberShopCard key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
}
