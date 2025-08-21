import type { Metadata } from "next";
import BookingLogsTable from "@/app/components/booking-logs/BookingLogsTable";

export const metadata: Metadata = {
  title: "Booking Logs | Prime Table Admin",
  description: "see booking logs",
};

function BookingLogsPage() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <BookingLogsTable />
    </section>
  );
}

export default BookingLogsPage;
