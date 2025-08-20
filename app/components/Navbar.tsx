"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosNotifications } from "react-icons/io";
import { useState } from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import { UserPen } from "lucide-react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
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
  const router = useRouter();
  const [openNotifications, setOpenNotifications] = useState(false);
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
        <div className="w-[125px] md:w-[150px] h-[50px] flex items-center gap-3">
          {/* mobile nav */}
          <div className="md:hidden">
            {/* hamburger-menu */}
            <div>
              <HiMenuAlt3 className="text-chetwoodBlue text-2xl" />
            </div>

            {/* nav */}
            <div className=""></div>
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
