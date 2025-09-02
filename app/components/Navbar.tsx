"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { UserPen, X } from "lucide-react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { PiUsersThree } from "react-icons/pi";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiWallet } from "react-icons/pi";
import { MdOutlineAnalytics } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { Star } from "lucide-react";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const handleLogout = async () => {
    router.push("/login");
    setTimeout(() => {
      toast.success("Logged out successfully");
    }, 800);
  };
  return (
    <nav className="bg-white w-full p-3 border-b border-b-gray-500/20 shadow-xs relative">
      <div className="w-full max-w-[95%] mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="w-[150px] h-[50px] flex items-center gap-3">
          {/* mobile nav */}
          <div className="md:hidden">
            {/* hamburger-menu */}
            <div className="cursor-pointer" onClick={() => setOpenNav(true)}>
              <HiMenuAlt3 className="text-chetwoodBlue text-2xl" />
            </div>

            {/* overlay */}
            <div
              className={`w-full h-full bg-black/50 backdrop-blur-xs fixed top-0 left-0 
            ${openNav ? "block" : "hidden"}`}
              onClick={() => setOpenNav(false)}
            />

            {/* nav */}
            <aside
              onClick={() =>
                setTimeout(() => {
                  setOpenNav(false);
                }, 500)
              }
              className={`w-[75%] h-screen absolute z-[50] top-0 ${
                openNav ? "left-0" : "-left-full"
              } bg-red-primary text-white rounded-br-xl duration-300 transition-all flex flex-col gap-3`}
            >
              <header className="bg-white">
                <div className="flex items-center justify-between px-4">
                  <div className="w-[150px] h-[75px]">
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      priority
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setOpenNav(false)}
                  >
                    <X className="text-red-primary text-3xl" />
                  </div>
                </div>
              </header>
              <Link
                href={"/dashboard"}
                className={`${
                  pathname === "/dashboard"
                    ? "font-bold bg-white text-black"
                    : "bg-transparent text-white"
                } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
              >
                <LayoutDashboard className="inline-block mr-2 text-xl" />
                <span className="text-lg">Dashboard</span>
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
                <span className="text-lg">Partner Approvals</span>
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
                <span className="text-lg">Booking Logs</span>
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
                <span className="text-lg">Escrow Control</span>
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
                <span className="text-lg">Analytics</span>
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
                <span className="text-lg">User Management</span>
              </Link>
              <Link
                href={"/rating-&-reviews"}
                className={`${
                  pathname === "/rating-&-reviews"
                    ? "font-bold bg-white text-black"
                    : "bg-transparent text-white"
                } p-3 hover:bg-white hover:text-black hover:font-bold transition-colors flex items-center`}
              >
                <Star className="inline-block mr-2 w-[20px] h-[20px]" />
                <span className="text-lg">Rating & Reviews</span>
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
                <span className="text-lg">Settings</span>
              </Link>
            </aside>
          </div>
          <Image
            src="/logo.svg"
            alt="Logo"
            priority
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>

        {/* cta */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setOpenNotifications(!openNotifications)}
            className="w-fit text-chetwoodBlue cursor-pointer"
          >
            <IoIosNotifications className="text-xl md:text-2xl" />
          </button>
          <button className="w-fit text-chetwoodBlue cursor-pointer">
            <IoChatboxEllipses className="text-xl md:text-2xl" />
          </button>
          {/* mobile profile */}
          <div className="md:hidden flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="border-0 focus:outline-none">
                <UserPen className="text-2xl text-chetwoodBlue" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-gray-300 mt-1 mr-1">
                <DropdownMenuItem>
                  <Link href={"/settings"} className="flex items-center gap-2">
                    <Image
                      alt="admin-image"
                      src={"/admin.jpg"}
                      width={20}
                      height={20}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="flex flex-col gap-1 font-medium">
                      <span className="text-chetwoodBlue text-xs">
                        Mecury Paul
                      </span>
                      <span className="text-gray-500 text-xs">Admin</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <CiLogout className="text-xl md:text-2xl" />
                    <span className="font-medium">Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link
            href={"/settings"}
            className="hidden md:flex items-center gap-2"
          >
            <Image
              alt="admin-image"
              src={"/admin.jpg"}
              width={20}
              height={20}
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex flex-col gap-1 font-medium">
              <span className="text-chetwoodBlue text-sm">Mecury Paul</span>
              <span className="text-gray-500 text-xs">Admin</span>
            </div>
          </Link>
          <div
            onClick={handleLogout}
            className="cursor-pointer hidden md:flex items-center gap-2 text-red-500"
          >
            <CiLogout className="text-xl md:text-3xl" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
