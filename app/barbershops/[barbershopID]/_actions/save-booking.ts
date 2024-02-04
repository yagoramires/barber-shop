"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export default async function saveBooking({
  serviceId,
  barbershopId,
  userId,
  date,
}: SaveBookingParams) {
  await db.booking.create({ data: { barbershopId, serviceId, userId, date } });

  revalidatePath("/");
  revalidatePath("/bookings");
}
