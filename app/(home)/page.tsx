import { db } from "../_lib/prisma";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "../_components/Header";
import SearchBar from "./_components/SearchBar";
import Booking from "../_components/BookingCard";
import BarberShopCard from "./_components/BarberShopCard";
import { Barbershop } from "@prisma/client";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});

  return (
    <main>
      <Header />

      <div className="mt-6 px-5">
        <h2 className="text-xl font-bold">Olá, {"Yago"}!</h2>
        <p className="text-sm first-letter:uppercase">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>

      <div className="mt-6 px-5">
        <SearchBar />
      </div>

      <div className="mt-6 px-5">
        <h2 className="mb-3 text-sm font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        {/* <Booking /> */}
      </div>

      <div className="mt-6 pl-5">
        <h2 className="mb-3 text-sm  font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <ul className="flex gap-4 overflow-x-auto pr-5 [&::-webkit-scrollbar]:hidden">
          {barbershops?.map((barbershop: Barbershop) => (
            <BarberShopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </ul>
      </div>

      <div className="mb-[4.5rem] mt-6 pl-5">
        <h2 className="mb-3 text-sm  font-bold uppercase text-gray-400">
          Populares
        </h2>

        <ul className="flex gap-4 overflow-x-auto pr-5 [&::-webkit-scrollbar]:hidden">
          {barbershops?.map((barbershop: Barbershop) => (
            <BarberShopCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </ul>
      </div>
    </main>
  );
}
