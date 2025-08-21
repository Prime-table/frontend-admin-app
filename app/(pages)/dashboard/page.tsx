import Image from "next/image";
import Link from "next/link";
import { RiArrowRightSFill } from "react-icons/ri";
import LatestPartnersTable from "@/app/components/dashboard/LatestPartnersTable";

function Dashboard() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      {/* stats card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* card-1 */}
        <div className="p-5 flex items-center gap-5 rounded-md bg-green-100">
          <div
            className="w-12 h-12 bg-green-500 rounded-md 
          flex items-center justify-center"
          >
            <Image
              alt="Cash"
              src="/cash.svg"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">₦250,000</span>
            <span className="text-sm">Total Escrow Balance</span>
          </div>
        </div>
        {/* card-2 */}
        <div className="p-5 flex items-center gap-5 rounded-md bg-orange-100">
          <div
            className="w-12 h-12 bg-orange-500 rounded-md 
          flex items-center justify-center"
          >
            <Image
              alt="Booking"
              src="/booking.svg"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">15,000</span>
            <span className="text-sm">Total Bookings</span>
          </div>
        </div>
        {/* card-3 */}
        <div className="p-5 flex items-center gap-5 rounded-md bg-red-100">
          <div
            className="w-12 h-12 bg-red-500 rounded-md 
          flex items-center justify-center"
          >
            <Image
              alt="Partners"
              src="/partners.svg"
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">300</span>
            <span className="text-sm">Total Partners</span>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-4">
        <Link
          href={"/partner-approvals"}
          className="bg-gray-100 p-5 rounded-md flex items-center 
          justify-between hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div
              className="w-12 h-12
          flex items-center justify-center"
            >
              <Image
                alt="checked"
                src="/checked.svg"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Partner Approvals</span>
          </div>
          <RiArrowRightSFill className="text-3xl text-gray-500" />
        </Link>
        <Link
          href={"/booking-logs"}
          className="bg-gray-100 p-5 rounded-md flex items-center 
          justify-between hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div
              className="w-12 h-12
          flex items-center justify-center"
            >
              <Image
                alt="booking-border"
                src="/booking-border.svg"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Booking Logs</span>
          </div>
          <RiArrowRightSFill className="text-3xl text-gray-500" />
        </Link>
        <Link
          href={"/escrow-control"}
          className="bg-gray-100 p-5 rounded-md flex items-center 
          justify-between hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div
              className="w-12 h-12
          flex items-center justify-center"
            >
              <Image
                alt="escrow"
                src="/escrow.svg"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Escrow Control</span>
          </div>
          <RiArrowRightSFill className="text-3xl text-gray-500" />
        </Link>
        <Link
          href={"/analytics"}
          className="bg-gray-100 p-5 rounded-md flex items-center 
          justify-between hover:bg-gray-200/70 transition-colors"
        >
          <div className="flex items-center gap-5">
            <div
              className="w-12 h-12
          flex items-center justify-center"
            >
              <Image
                alt="earnings"
                src="/earnings.svg"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm">Earnings Report</span>
          </div>
          <RiArrowRightSFill className="text-3xl text-gray-500" />
        </Link>
      </div>

      {/* table */}
      <LatestPartnersTable />
    </section>
  );
}

export default Dashboard;
