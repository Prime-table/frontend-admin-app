"use client";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import {
  latestPartnersData,
  fetchAllPartnersResponse,
} from "@/app/types/types";
import { fetchAllPartners } from "@/app/services/partners";
// import { LatestPartners } from "@/app/dummyData/data";
import { useState, useEffect, useRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import PartnerPreviewModal from "./PartnerPreviewModal";

function PartnersTable() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<latestPartnersData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState("all");
  const [selectedPartner, setSelectedPartner] =
    useState<latestPartnersData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChooseFilter = (filter: string) => {
    setFilterState(filter);
    setOpenFilter(false);
  };

  const handleAction = (action: string, index: number) => {
    if (action === "preview") {
      setSelectedPartner(filteredData[index]);
      setIsModalOpen(true);
    } else if (action === "approve") {
      const updatedData = [...data];
      const originalIndex = data.findIndex(
        (partner) => partner._id === filteredData[index]._id
      );
      if (originalIndex !== -1) {
        updatedData[originalIndex].status = "approved";
        setData(updatedData);
      }
    } else if (action === "suspend") {
      const updatedData = [...data];
      const originalIndex = data.findIndex(
        (partner) => partner._id === filteredData[index]._id
      );
      if (originalIndex !== -1) {
        updatedData[originalIndex].status = "suspended";
        setData(updatedData);
      }
    }
  };

  const handleModalAction = (action: string) => {
    if (!selectedPartner) return;

    const index = data.findIndex(
      (partner) => partner._id === selectedPartner._id
    );
    if (index === -1) return;

    const updatedData = [...data];
    if (action === "approve") {
      updatedData[index].status = "approved";
    } else if (action === "suspend") {
      updatedData[index].status = "suspended";
    }
    setData(updatedData);
    setSelectedPartner(updatedData[index]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response: fetchAllPartnersResponse = await fetchAllPartners();
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching partners:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const filteredData =
    filterState === "all"
      ? data
      : data.filter((partner) => partner.status === filterState);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openFilter]);

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-300";
      case "suspended":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-5">
        <header className="flex flex-col gap-5">
          <h2 className="text-2xl md:text-3xl font-medium">
            Partner Approvals
          </h2>
        </header>
        <div className="border border-black/30 rounded-sm p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-primary"></div>
            <span className="ml-3 text-gray-600">Loading partners...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-medium">Partner Approvals</h2>
        <div className="flex items-center gap-5 px-4">
          <span>Filter:</span>
          {/* dropdown */}
          <div
            ref={dropdownRef}
            className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center cursor-pointer"
          >
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                Status: {filterState}
              </span>
              <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
            </div>
            <div
              className={`w-full bg-white absolute top-[110%] flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
                openFilter
                  ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto"
                  : "max-h-0 opacity-0 z-[-1] pointer-events-none"
              }`}
            >
              {["all", "approved", "pending", "suspended"].map((status) => (
                <span
                  key={status}
                  onClick={() => handleChooseFilter(status)}
                  className="text-sm font-semibold w-full border border-red-primary 
                  text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                  rounded-md text-center capitalize"
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="border border-black/30 rounded-sm pt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b-black/30 hover:bg-transparent">
              {/* <TableHead className="font-medium pb-3">Name</TableHead> */}
              <TableHead className="font-medium pb-3">Email</TableHead>
              {/* <TableHead className="font-medium pb-3">Partner ID</TableHead> */}
              <TableHead className="font-medium pb-3">Reg.Date</TableHead>
              <TableHead className="font-medium pb-3">Status</TableHead>
              <TableHead className="font-medium pb-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center p-8 text-gray-500"
                >
                  No partners found
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((partner, index) => (
                <TableRow key={partner._id} className="border-b-black/30">
                  {/* <TableCell className="p-3">{partner.fullName}</TableCell> */}
                  <TableCell className="p-3">{partner.email}</TableCell>
                  {/* <TableCell className="p-3">{partner.partnerId}</TableCell> */}
                  <TableCell className="p-3">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell
                    className={`p-3 ${statusClass(
                      partner.status || "pending"
                    )}`}
                  >
                    {partner.status || "pending"}
                  </TableCell>
                  <TableCell className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="border-0 focus:outline-none">
                        <BsThreeDotsVertical className="text-2xl text-black cursor-pointer hover:text-black/80" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-full bg-white flex flex-col items-center justify-center gap-2 border-none p-3">
                        <DropdownMenuItem
                          onClick={() => handleAction("preview", index)}
                          className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                        text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                        rounded-md flex items-center justify-center"
                        >
                          Preview
                        </DropdownMenuItem>
                        {(partner.status || "pending") === "approved" ? (
                          <DropdownMenuItem
                            onClick={() => handleAction("suspend", index)}
                            className="bg-transparent text-sm font-semibold w-full border border-red-primary 
                          text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                          rounded-md flex items-center justify-center"
                          >
                            Suspend
                          </DropdownMenuItem>
                        ) : (partner.status || "pending") === "pending" ? (
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
                              Suspend
                            </DropdownMenuItem>
                          </>
                        ) : (
                          (partner.status || "pending") === "suspended" && (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Partner Preview Modal */}
      <PartnerPreviewModal
        partner={selectedPartner}
        isOpen={isModalOpen}
        onClose={closeModal}
        onAction={handleModalAction}
      />
    </div>
  );
}

export default PartnersTable;
