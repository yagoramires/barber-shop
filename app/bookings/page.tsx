import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Booking } from "@prisma/client";
import Header from "../_components/Header";
import BookingCard from "@/app/_components/BookingCard";

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
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="mb-3 mt-6 text-sm  font-bold uppercase text-gray-400">
          Confirmados
        </h2>
        <ul className="flex flex-col gap-3">
          {confirmedBookings.map((booking: Booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </ul>

        <h2 className="mb-3 mt-6 text-sm  font-bold uppercase text-gray-400">
          Finalizados
        </h2>
        <ul className="flex flex-col gap-3">
          {finishedBookings.map((booking: Booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </ul>
      </div>
    </>
  );
}
