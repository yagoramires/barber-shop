import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { Barbershop } from "@prisma/client";
import BarberShopCard from "../(home)/_components/BarberShopCard";
import SearchBar from "../(home)/_components/SearchBar";
import Header from "../_components/header";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  if (!searchParams.search) {
    return redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />

      <div className="flex flex-col gap-6 px-5 py-6">
        <SearchBar defaultValues={{ search: searchParams.search }} />

        <h1 className="text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>

        {barbershops.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {barbershops.map((barbershop: Barbershop) => (
              <div key={barbershop.id} className="w-full">
                <BarberShopCard barbershop={barbershop} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full">
            <h2 className="w-full font-bold">
              Nenhuma barbearia encontrada ...
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
