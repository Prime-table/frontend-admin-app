"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiWallet } from "react-icons/pi";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";

function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="bg-red-primary text-white rounded-br-xl py-4 px-1 w-[25%] lg:w-[20%] xl:w-[16%] h-[99%] hidden md:flex flex-col gap-3">
      <Link
        href={"/dashboard"}
        className={`${
          pathname === "/dashboard"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <LayoutDashboard className="inline-block mr-2 text-xl" />
        <span className="text-sm">Dashboard</span>
      </Link>
      <Link
        href={"/partner-approvals"}
        className={`${
          pathname === "/partner-approvals"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <PiUsersThree className="inline-block mr-2 text-xl" />
        <span className="text-sm">Partner Approvals</span>
      </Link>
      <Link
        href={"/booking-logs"}
        className={`${
          pathname === "/booking-logs"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <IoBriefcaseOutline className="inline-block mr-2 text-xl" />
        <span className="text-sm">Booking Logs</span>
      </Link>
      <Link
        href={"/escrow-control"}
        className={`${
          pathname === "/escrow-control"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <PiWallet className="inline-block mr-2 text-xl" />
        <span className="text-sm">Escrow Control</span>
      </Link>
      <Link
        href={"/analytics"}
        className={`${
          pathname === "/analytics"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <MdOutlineAnalytics className="inline-block mr-2 text-xl" />
        <span className="text-sm">Analytics</span>
      </Link>
      <Link
        href={"/user-management"}
        className={`${
          pathname === "/user-management"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <CiUser className="inline-block mr-2 text-xl" />
        <span className="text-sm">User Management</span>
      </Link>
      <Link
        href={"/settings"}
        className={`${
          pathname === "/settings"
            ? "font-bold bg-white text-black"
            : "bg-transparent text-white"
        } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
      >
        <CiSettings className="inline-block mr-2 text-xl" />
        <span className="text-sm">Settings</span>
      </Link>
    </aside>
  );
}

export default SideBar;
