import { db } from "@/app/_lib/prisma";
import BarbershopData from "./_components/BarbershopData";
import ServiceCard from "./_components/ServiceCard";
import { Service } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { redirect } from "next/navigation";

interface BarbershopDetailsPageProps {
  params: { barbershopID?: string };
}

export default async function BarbershopDetailsPage({
  params,
}: BarbershopDetailsPageProps) {
  if (!params.barbershopID) {
    return redirect("/");
  }

  const session = await getServerSession(authOptions);

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.barbershopID,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return redirect("/");
  }

  return (
    <div>
      <BarbershopData barbershop={barbershop} />
      <div className="px-5 pt-6">
        <Button className="text-sm font-bold">Serviços</Button>
      </div>
      <ul className="flex flex-col gap-3 px-5 pb-12 pt-6">
        {barbershop.services.map((service: Service) => (
          <ServiceCard
            service={service}
            barbershop={barbershop}
            key={service.id}
            isAuthenticated={!!session?.user}
            userId={(session?.user as any)?.id}
          />
        ))}
      </ul>
    </div>
  );
}
