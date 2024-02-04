import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Booking } from "@prisma/client";
import Header from "../_components/Header";
import BookingCard from "@/app/_components/BookingCard";
import { isFuture, isPast } from "date-fns";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
    // return signIn("google");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any)?.id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking: Booking) =>
    isFuture(booking.date),
  );
  const finishedBookings = bookings.filter((booking: Booking) =>
    isPast(booking.date),
  );

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
