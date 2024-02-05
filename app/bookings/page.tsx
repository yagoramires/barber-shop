import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "@/app/_lib/prisma";
import { Booking } from "@prisma/client";

import BookingCard from "@/app/_components/BookingCard";
import Header from "../_components/Header";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
    // return signIn("google");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    await db.booking.findMany({
      where: {
        userId: (session.user as any)?.id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="mb-6 text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 text-sm  font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            <ul className="flex flex-col gap-3">
              {confirmedBookings.map((booking: Booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-sm  font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            <ul className="flex flex-col gap-3">
              {finishedBookings.map((booking: Booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
