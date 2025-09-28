"use client";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { bookingLog } from "@/app/types/types";
import { BookingLogs } from "@/app/dummyData/data";
import { useState, useEffect, useRef } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

function BookingLogsTable() {
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const restaurantDropdownRef = useRef<HTMLDivElement>(null);
  const dateRangeDropdownRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<bookingLog[]>(BookingLogs);
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [openRestaurantFilter, setOpenRestaurantFilter] = useState(false);
  const [openDateRangeFilter, setOpenDateRangeFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [restaurantFilter, setRestaurantFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");

  // Get unique restaurants for filter
  const uniqueRestaurants = [
    ...(BookingLogs ? new Set(BookingLogs.map((log) => log.restaurant)) : []),
  ];

  const handleChooseStatusFilter = (filter: string) => {
    setStatusFilter(filter);
    setOpenStatusFilter(false);
  };

  const handleChooseRestaurantFilter = (filter: string) => {
    setRestaurantFilter(filter);
    setOpenRestaurantFilter(false);
  };

  const handleChooseDateRangeFilter = (filter: string) => {
    setDateRangeFilter(filter);
    setOpenDateRangeFilter(false);
  };

  const getDateRangeFromFilter = (filter: string) => {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    switch (filter) {
      case "last-30-days":
        const thirtyDaysAgo = new Date(startOfDay);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return { from: thirtyDaysAgo, to: now };
      case "last-90-days":
        const ninetyDaysAgo = new Date(startOfDay);
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        return { from: ninetyDaysAgo, to: now };
      case "last-6-months":
        const sixMonthsAgo = new Date(startOfDay);
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        return { from: sixMonthsAgo, to: now };
      case "last-year":
        const oneYearAgo = new Date(startOfDay);
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return { from: oneYearAgo, to: now };
      default:
        return null;
    }
  };

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/prime-table-admin/bookings");

      if (!res.ok) throw new Error("Failed to fetch");

      const bookings = await res.json();

      if (bookings.length > 0) {
        setData(bookings);
      } else {
        setData(BookingLogs); // fallback
      }
    } catch (error) {
      console.warn("Backend not available, using dummy data:", error);
      setData(BookingLogs); // fallback
    }
  };

  fetchBookings();
}, []);


  useEffect(() => {
    let filteredData = BookingLogs.filter((log) => {
      // Status filter
      const statusMatch = statusFilter === "all" || log.status === statusFilter;

      // Restaurant filter
      const restaurantMatch =
        restaurantFilter === "all" || log.restaurant === restaurantFilter;

      // Date range filter
      let dateMatch = true;
      if (dateRangeFilter !== "all") {
        const dateRange = getDateRangeFromFilter(dateRangeFilter);
        if (dateRange) {
          const logDate = new Date(log.date);
          dateMatch = logDate >= dateRange.from && logDate <= dateRange.to;
        }
      }

      return statusMatch && restaurantMatch && dateMatch;
    });

    setData(filteredData);
  }, [statusFilter, restaurantFilter, dateRangeFilter]);

  // Handle click outside for status dropdown
  useEffect(() => {
    if (!openStatusFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenStatusFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openStatusFilter]);

  // Handle click outside for restaurant dropdown
  useEffect(() => {
    if (!openRestaurantFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        restaurantDropdownRef.current &&
        !restaurantDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenRestaurantFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openRestaurantFilter]);

  // Handle click outside for date range dropdown
  useEffect(() => {
    if (!openDateRangeFilter) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateRangeDropdownRef.current &&
        !dateRangeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDateRangeFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDateRangeFilter]);

  const formatCurrency = (value: number, currency: string = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
};


  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-300";
      case "cancelled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <header className="flex flex-col gap-5">
        <h2 className="text-2xl md:text-3xl font-medium">Booking Logs</h2>

        {/* Filters Container */}
        <div className="flex flex-wrap items-center gap-5 px-4">
          <span>Filter:</span>

          {/* Status Filter */}
          <div
            ref={statusDropdownRef}
            className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center 
            cursor-pointer"
          >
            {/* trigger */}
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
              onClick={() => setOpenStatusFilter(!openStatusFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap capitalize">
                Status: {statusFilter}
              </span>{" "}
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            {/* content */}
            <div
              className={`w-full bg-white absolute top-[110%]
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openStatusFilter
                ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleChooseStatusFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                All
              </span>
              <span
                onClick={() => handleChooseStatusFilter("approved")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Approved
              </span>
              <span
                onClick={() => handleChooseStatusFilter("pending")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Pending
              </span>
              <span
                onClick={() => handleChooseStatusFilter("suspended")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Suspended
              </span>
            </div>
          </div>

          {/* Restaurant Filter */}
          <div
            ref={restaurantDropdownRef}
            className="w-[250px] md:w-fit relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center 
            cursor-pointer"
          >
            {/* trigger */}
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
              onClick={() => setOpenRestaurantFilter(!openRestaurantFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap capitalize">
                Restaurant:{" "}
                {restaurantFilter === "all" ? "All" : restaurantFilter}
              </span>{" "}
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            {/* content */}
            <div
              className={`w-full bg-white absolute top-[110%]
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openRestaurantFilter
                ? "max-h-[400px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleChooseRestaurantFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                All
              </span>
              {uniqueRestaurants.map((restaurant) => (
                <span
                  key={restaurant}
                  onClick={() => handleChooseRestaurantFilter(restaurant)}
                  className="text-sm font-semibold w-full border border-red-primary 
                  text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                  rounded-md text-center"
                >
                  {restaurant}
                </span>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div
            ref={dateRangeDropdownRef}
            className="w-[250px] md:w-fit relative border border-black/30 hover:border-red-primary/50 
            duration-300 ease-in-out rounded-sm flex items-center justify-center 
            cursor-pointer"
          >
            {/* trigger */}
            <div
              className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
              onClick={() => setOpenDateRangeFilter(!openDateRangeFilter)}
            >
              <span className="flex items-center text-sm md:text-base whitespace-nowrap capitalize">
                Date Range:{" "}
                {dateRangeFilter === "all"
                  ? "All"
                  : dateRangeFilter.replace("-", " ")}
              </span>{" "}
              <span>
                <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
              </span>
            </div>
            {/* content */}
            <div
              className={`w-full bg-white absolute top-[110%]
            flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
              openDateRangeFilter
                ? "max-h-[400px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
                : "max-h-0 opacity-0 z-[-1] pointer-events-none"
            }`}
            >
              <span
                onClick={() => handleChooseDateRangeFilter("all")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                All
              </span>
              <span
                onClick={() => handleChooseDateRangeFilter("last-30-days")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Last 30 Days
              </span>
              <span
                onClick={() => handleChooseDateRangeFilter("last-90-days")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Last 90 Days
              </span>
              <span
                onClick={() => handleChooseDateRangeFilter("last-6-months")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Last 6 Months
              </span>
              <span
                onClick={() => handleChooseDateRangeFilter("last-year")}
                className="text-sm font-semibold w-full border border-red-primary 
                text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                rounded-md text-center"
              >
                Last Year
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
              <TableHead className="font-medium pb-3">Email</TableHead>
              <TableHead className="font-medium pb-3">Date</TableHead>
              <TableHead className="font-medium pb-3">Time</TableHead>
              <TableHead className="font-medium pb-3">Amount</TableHead>
              <TableHead className="font-medium pb-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-8 text-gray-500"
                >
                  No booking logs found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              data.map((log, index) => (
                <TableRow key={index} className="border-b-black/30">
                  <TableCell className="p-3 font-medium">
                    {log.bookingId}
                  </TableCell>
                  <TableCell className="p-3">{log.restaurant}</TableCell>
                  <TableCell className="p-3">{log.email}</TableCell>
                  <TableCell className="p-3">
                    {new Date(log.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="p-3">{log.time}</TableCell>
                  <TableCell className="p-3 font-medium">
                    {formatCurrency(log.amount)}
                  </TableCell>
                  <TableCell className={`p-3 ${statusClass(log.status)}`}>
                    {log.status}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default BookingLogsTable;
