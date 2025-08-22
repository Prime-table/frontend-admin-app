"use client";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { escrowControl } from "@/app/types/types";
import { EscrowControlData } from "@/app/dummyData/data";
import { useState, useEffect, useRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function EscrowTable() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<escrowControl[]>(EscrowControlData);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState("all");

  const handleChooseFilter = (filter: string) => {
    setFilterState(filter);
    setOpenFilter(false);
  };

  const handleAction = (action: string, index: number) => {
    if (action === "approve") {
      const updatedData = [...data];
      updatedData[index].status = "approved";
      setData(updatedData);
    } else if (action === "suspend") {
      const updatedData = [...data];
      updatedData[index].status = "rejected";
      setData(updatedData);
    }
  };

  useEffect(() => {
    const filteredData = EscrowControlData.filter((escrow) => {
      if (filterState === "all") return true;
      return escrow.status === filterState;
    });
    setData(filteredData);
  }, [filterState]);

  useEffect(() => {
    if (!openFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openFilter]);

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-300";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col gap-5">
        <h2 className="text-lg md:text-xl font-bold">Escrow Control</h2>
        <div className="flex items-center gap-5 px-4">
          <span>Filter:</span>
          {/* dropdown */}
          <div
            ref={dropdownRef}
            className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center 
            cursor-pointer"
          >
            {/* trigger */}
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                Status: {filterState}
              </span>{" "}
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            {/* content */}
            <div
              className={`w-full bg-white absolute top-[110%]
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openFilter
                ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleChooseFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                All
              </span>
              <span
                onClick={() => handleChooseFilter("approved")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Approved
              </span>
              <span
                onClick={() => handleChooseFilter("pending")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Pending
              </span>
              <span
                onClick={() => handleChooseFilter("rejected")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Rejected
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="border border-black/30 rounded-sm pt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b-black/30 hover:bg-transparent">
              <TableHead className="font-medium pb-3">Booking ID</TableHead>
              <TableHead className="font-medium pb-3">Restaurant</TableHead>
              <TableHead className="font-medium pb-3">Amount</TableHead>
              <TableHead className="font-medium pb-3">Payout Date</TableHead>
              <TableHead className="font-medium pb-3">Status</TableHead>
              <TableHead className="font-medium pb-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((escrow, index) => (
              <TableRow key={index} className="border-b-black/30">
                <TableCell className="p-3">{escrow.bookingId}</TableCell>
                <TableCell className="p-3">{escrow.restaurant}</TableCell>
                <TableCell className="p-3">{escrow.amount}</TableCell>
                <TableCell className="p-3">
                  {new Date(escrow.payoutDate).toLocaleDateString()}
                </TableCell>
                <TableCell className={`p-3 ${statusClass(escrow.status)}`}>
                  {escrow.status}
                </TableCell>
                <TableCell className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border-0 focus:outline-none">
                      <BsThreeDotsVertical
                        className="text-2xl text-black 
                  cursor-pointer hover:text-black/80"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-full bg-white
            flex flex-col items-center justify-center gap-2 border-none p-3"
                    >
                      {escrow.status === "approved" ? (
                        <DropdownMenuItem
                          onClick={() => handleAction("suspend", index)}
                          className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md flex items-center justify-center"
                        >
                          Reject
                        </DropdownMenuItem>
                      ) : escrow.status === "pending" ? (
                        <>
                          <DropdownMenuItem
                            onClick={() => handleAction("approve", index)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md flex items-center justify-center"
                          >
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("suspend", index)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md flex items-center justify-center"
                          >
                            Reject
                          </DropdownMenuItem>
                        </>
                      ) : (
                        escrow.status === "rejected" && (
                          <DropdownMenuItem
                            onClick={() => handleAction("approve", index)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md flex items-center justify-center"
                          >
                            Approve
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default EscrowTable;
