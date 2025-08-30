"use client";
import { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  BriefcaseBusiness,
  Users,
  PiggyBank,
  User,
} from "lucide-react";
import { RiArrowDownSFill } from "react-icons/ri";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import BookingsChart from "./LineChart";
import {
  BookingLogs,
  LatestPartners,
  EscrowControlData,
} from "@/app/dummyData/data";
import { bookingLog, escrowControl } from "@/app/types/types";
import toast from "react-hot-toast";
function AnalyticsandExportData() {
  const [currentTab, setCurrentTab] = useState<"analytics" | "export">(
    "analytics"
  );

  // Filter states for export tab
  const [openDateRangeFilter, setOpenDateRangeFilter] = useState(false);
  const [openRestaurantFilter, setOpenRestaurantFilter] = useState(false);
  const [openReportTypeFilter, setOpenReportTypeFilter] = useState(false);
  const [openFormatFilter, setOpenFormatFilter] = useState(false);

  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [restaurantFilter, setRestaurantFilter] = useState("all");
  const [reportTypeFilter, setReportTypeFilter] = useState("bookings");
  const [formatFilter, setFormatFilter] = useState("csv");

  // report states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReportGenerated, setIsReportGenerated] = useState(false);
  const [previewData, setPreviewData] = useState<
    bookingLog[] | escrowControl[]
  >([]);

  const formatText = (text: string) => {
    const newText = text.replace("-", " ");
    return newText.charAt(0).toUpperCase() + newText.slice(1);
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

  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600";
      case "pending":
        return "text-orange-300";
      case "cancelled":
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    setIsReportGenerated(false);

    // Filter data based on selected filters
    let filteredData: bookingLog[] | escrowControl[] = [];

    if (reportTypeFilter === "bookings") {
      filteredData = BookingLogs.filter((log) => {
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

        return restaurantMatch && dateMatch;
      });
    } else if (reportTypeFilter === "escrow-data") {
      filteredData = EscrowControlData.filter((escrow) => {
        // Restaurant filter
        const restaurantMatch =
          restaurantFilter === "all" || escrow.restaurant === restaurantFilter;

        // Date range filter
        let dateMatch = true;
        if (dateRangeFilter !== "all") {
          const dateRange = getDateRangeFromFilter(dateRangeFilter);
          if (dateRange) {
            const payoutDate = new Date(escrow.payoutDate);
            dateMatch =
              payoutDate >= dateRange.from && payoutDate <= dateRange.to;
          }
        }

        return restaurantMatch && dateMatch;
      });
    }

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setPreviewData(filteredData);
    setIsGenerating(false);
    setIsReportGenerated(true);
    toast.success(
      `${formatText(reportTypeFilter)} Report generated successfully!`
    );
  };
  // Refs for dropdowns
  const dateRangeDropdownRef = useRef<HTMLDivElement>(null);
  const restaurantDropdownRef = useRef<HTMLDivElement>(null);
  const reportTypeDropdownRef = useRef<HTMLDivElement>(null);
  const formatDropdownRef = useRef<HTMLDivElement>(null);

  // Get unique restaurants and partners from data
  const uniqueRestaurants = [
    ...new Set(BookingLogs.map((log) => log.restaurant)),
  ];
  const uniquePartners = [
    ...new Set(LatestPartners.map((partner) => partner.fullName)),
  ];

  // Filter handlers
  const handleChooseDateRangeFilter = (filter: string) => {
    setDateRangeFilter(filter);
    setOpenDateRangeFilter(false);
  };

  const handleChooseRestaurantFilter = (filter: string) => {
    setRestaurantFilter(filter);
    setOpenRestaurantFilter(false);
  };

  const handleChooseReportTypeFilter = (filter: string) => {
    setReportTypeFilter(filter);
    setOpenReportTypeFilter(false);
  };

  const handleChooseFormatFilter = (filter: string) => {
    setFormatFilter(filter);
    setOpenFormatFilter(false);
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateRangeDropdownRef.current &&
        !dateRangeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDateRangeFilter(false);
      }
      if (
        restaurantDropdownRef.current &&
        !restaurantDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenRestaurantFilter(false);
      }
      if (
        reportTypeDropdownRef.current &&
        !reportTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenReportTypeFilter(false);
      }
      if (
        formatDropdownRef.current &&
        !formatDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenFormatFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-2 mb-4">
        <h2 className="text-2xl md:text-3xl font-medium">
          {currentTab === "analytics" ? "Analytics" : "Export Report"}
        </h2>
        {/* tabs */}
        <div className="flex items-center gap-4 mt-4">
          <div
            className={`cursor-pointer py-2 px-4 rounded-lg border transition-colors duration-300 ease-in-out ${
              currentTab === "analytics"
                ? "bg-red-primary text-white border-transparent"
                : "bg-red-primary/10 text-red-primary border-red-primary"
            }`}
            onClick={() => setCurrentTab("analytics")}
          >
            Analytics
          </div>
          <div
            className={`cursor-pointer py-2 px-4 rounded-lg border transition-colors duration-300 ease-in-out ${
              currentTab === "export"
                ? "bg-red-primary text-white border-transparent"
                : "bg-red-primary/10 text-red-primary border-red-primary"
            }`}
            onClick={() => setCurrentTab("export")}
          >
            Export Report
          </div>
        </div>
      </header>
      {currentTab === "analytics" && (
        <div className="w-full flex flex-col gap-5">
          {/* stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {/* booking stats */}
            <div className="md:w-[225px] flex md:justify-between gap-4 p-4 border border-gray-300 rounded-lg">
              <div className="p-3 border border-gray-300 rounded-lg text-gray-500 w-fit h-fit">
                <BriefcaseBusiness className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-[400]">Total Bookings</p>
                <h3 className="text-lg font-medium">1,234</h3>
                <span className={`text-[12px] text-green-500`}>
                  <TrendingUp className="inline mr-1 w-[15px] h-[15px]" /> 12%
                </span>
              </div>
            </div>

            {/* active partners stats */}
            <div className="md:w-[225px] flex md:justify-between gap-4 p-4 border border-gray-300 rounded-lg">
              <div className="p-3 border border-gray-300 rounded-lg text-gray-500 w-fit h-fit">
                <Users className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-[400]">Active Partners</p>
                <h3 className="text-lg font-medium">567</h3>
                <span className={`text-[12px] text-green-500`}>
                  <TrendingUp className="inline mr-1 w-[15px] h-[15px]" /> 1.5%
                </span>
              </div>
            </div>

            {/* payout volume stats */}
            <div className="md:w-[225px] flex md:justify-between gap-4 p-4 border border-gray-300 rounded-lg">
              <div className="p-3 border border-gray-300 rounded-lg text-gray-500 w-fit h-fit">
                <PiggyBank className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-[400]">Payout Volume</p>
                <h3 className="text-lg font-medium">₦50,000</h3>
                <span className={`text-[12px] text-green-500`}>
                  <TrendingUp className="inline mr-1 w-[15px] h-[15px]" /> 12%
                </span>
              </div>
            </div>

            {/* user traffic stats */}
            <div className="md:w-[225px] flex md:justify-between gap-4 p-4 border border-gray-300 rounded-lg">
              <div className="p-3 border border-gray-300 rounded-lg text-gray-500 w-fit h-fit">
                <User className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-[400]">User Traffic</p>
                <h3 className="text-lg font-medium">1,234</h3>
                <span className={`text-[12px] text-green-500`}>
                  <TrendingUp className="inline mr-1 w-[15px] h-[15px]" /> 12%
                </span>
              </div>
            </div>
          </div>

          {/* charts */}
          <BookingsChart />
        </div>
      )}
      {currentTab === "export" && (
        <div className="w-full flex flex-col gap-5">
          {/* filters */}
          <div
            className="grid grid-cols-1 place-content-center place-items-center 
            sm:place-content-start sm:place-items-start sm:grid-cols-2 lg:grid-cols-3 
            items-center gap-5"
          >
            {/* Date Range Filter */}
            <div className="flex flex-col gap-2 items-start w-full">
              <h3>Date Range</h3>
              <div
                ref={dateRangeDropdownRef}
                className="min-w-fit w-full sm:w-[150px] md:w-[250px] lg:w-[325px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
              >
                {/* trigger */}
                <div
                  className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                  onClick={() => setOpenDateRangeFilter(!openDateRangeFilter)}
                >
                  <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                    {dateRangeFilter === "all"
                      ? "all"
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
                    ? "max-h-[350px] opacity-100 z-[10] pointer-events-auto"
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
                    onClick={() => handleChooseDateRangeFilter("today")}
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

            {/* Restaurant Filter */}
            <div className="flex flex-col gap-2 items-start w-full">
              <h3>Restaurant Partner</h3>
              <div
                ref={restaurantDropdownRef}
                className="min-w-fit w-full sm:w-[150px] md:w-[250px] lg:w-[325px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
              >
                {/* trigger */}
                <div
                  className="w-full flex justify-center gap-3 md:gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                  onClick={() => setOpenRestaurantFilter(!openRestaurantFilter)}
                >
                  <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                    {restaurantFilter === "all" ? "all" : restaurantFilter}
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
                    ? "max-h-[250px] opacity-100 z-[10] pointer-events-auto"
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
            </div>

            {/* Report Type Filter */}
            <div className="flex flex-col gap-2 items-start w-full">
              <h3>Report Type</h3>
              <div
                ref={reportTypeDropdownRef}
                className="min-w-fit w-full sm:w-[150px] md:w-[250px] lg:w-[325px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
              >
                {/* trigger */}
                <div
                  className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                  onClick={() => setOpenReportTypeFilter(!openReportTypeFilter)}
                >
                  <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                    {reportTypeFilter.replace("-", " ")}
                  </span>{" "}
                  <span>
                    <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
                  </span>
                </div>
                {/* content */}
                <div
                  className={`w-full bg-white absolute top-[110%]
                flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
                  openReportTypeFilter
                    ? "max-h-[250px] opacity-100 z-[10] pointer-events-auto"
                    : "max-h-0 opacity-0 z-[-1] pointer-events-none"
                }`}
                >
                  <span
                    onClick={() => handleChooseReportTypeFilter("bookings")}
                    className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                  >
                    Bookings
                  </span>
                  <span
                    onClick={() => handleChooseReportTypeFilter("escrow-data")}
                    className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                  >
                    Escrow Data
                  </span>
                </div>
              </div>
            </div>

            {/* Format Filter */}
            <div className="flex flex-col gap-2 items-start w-full">
              <h3>Format</h3>
              <div
                ref={formatDropdownRef}
                className="min-w-fit w-full sm:w-[150px] md:w-[250px] lg:w-[325px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center
                cursor-pointer"
              >
                {/* trigger */}
                <div
                  className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                  onClick={() => setOpenFormatFilter(!openFormatFilter)}
                >
                  <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                    {formatFilter}
                  </span>{" "}
                  <span>
                    <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
                  </span>
                </div>
                {/* content */}
                <div
                  className={`w-full bg-white absolute top-[110%]
                flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
                  openFormatFilter
                    ? "max-h-[250px] opacity-100 z-[10] pointer-events-auto"
                    : "max-h-0 opacity-0 z-[-1] pointer-events-none"
                }`}
                >
                  <span
                    onClick={() => handleChooseFormatFilter("csv")}
                    className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                  >
                    CSV
                  </span>
                  <span
                    onClick={() => handleChooseFormatFilter("pdf")}
                    className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                  >
                    PDF
                  </span>
                  <span
                    onClick={() => handleChooseFormatFilter("excel")}
                    className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                  >
                    Excel
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* generate table */}
          <div className="w-full flex flex-col gap-5">
            {/*action buttons  */}
            <div className="flex flex-wrap items-center gap-5">
              <button
                disabled={isGenerating}
                onClick={handleGenerateReport}
                className="bg-red-primary hover:bg-red-primary/90 disabled:opacity-50 disabled:hover:bg-red-primary 
                duration-300 ease-in-out cursor-pointer text-white px-4 lg:px-6 py-2 lg:py-4 text-sm lg:text-base font-medium rounded-md"
              >
                {isGenerating ? "Generating Report..." : "Generate Report"}
              </button>
              <button
                disabled={!isReportGenerated}
                className="bg-transparent border border-gray-400 cursor-pointer hover:border-red-primary/50 font-medium 
              text-black px-4 lg:px-6 py-2 lg:py-4 text-sm lg:text-base rounded-md duration-300 ease-in-out disabled:opacity-50 disabled:hover:border-gray-400"
              >
                Download Report
              </button>
              <button
                disabled={!isReportGenerated}
                className="bg-transparent border border-gray-400 cursor-pointer hover:border-red-primary/50 font-medium 
              text-black px-4 lg:px-6 py-2 lg:py-4 text-sm lg:text-base rounded-md duration-300 ease-in-out disabled:opacity-50 disabled:hover:border-gray-400"
              >
                Email Report
              </button>
            </div>

            {/* preview table */}
            {isReportGenerated && previewData.length > 0 && (
              <div className="w-full flex flex-col gap-5">
                <h3 className="text-lg font-semibold">Report Preview</h3>
                <div className="border border-black/30 rounded-sm pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-black/30 hover:bg-transparent">
                        {reportTypeFilter === "bookings" ? (
                          <>
                            <TableHead className="font-medium pb-3">
                              Booking ID
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Restaurant
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Date
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Amount
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Status
                            </TableHead>
                          </>
                        ) : (
                          <>
                            <TableHead className="font-medium pb-3">
                              Booking ID
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Restaurant
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Amount
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Payout Date
                            </TableHead>
                            <TableHead className="font-medium pb-3">
                              Status
                            </TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {previewData.map((item, index) => (
                        <TableRow key={index} className="border-b-black/30">
                          {reportTypeFilter === "bookings" ? (
                            // Booking logs table structure
                            <>
                              <TableCell className="p-3 font-medium">
                                {(item as bookingLog).bookingId}
                              </TableCell>
                              <TableCell className="p-3">
                                {(item as bookingLog).restaurant}
                              </TableCell>
                              <TableCell className="p-3">
                                {new Date(
                                  (item as bookingLog).date
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="p-3 font-medium">
                                {(item as bookingLog).amount}
                              </TableCell>
                              <TableCell
                                className={`p-3 ${statusClass(
                                  (item as bookingLog).status
                                )}`}
                              >
                                {(item as bookingLog).status}
                              </TableCell>
                            </>
                          ) : (
                            // Escrow data table structure
                            <>
                              <TableCell className="p-3">
                                {(item as escrowControl).bookingId}
                              </TableCell>
                              <TableCell className="p-3">
                                {(item as escrowControl).restaurant}
                              </TableCell>
                              <TableCell className="p-3">
                                {(item as escrowControl).amount}
                              </TableCell>
                              <TableCell className="p-3">
                                {new Date(
                                  (item as escrowControl).payoutDate
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell
                                className={`p-3 ${statusClass(
                                  (item as escrowControl).status
                                )}`}
                              >
                                {(item as escrowControl).status}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {isReportGenerated && previewData.length === 0 && (
              <div className="w-full flex flex-col gap-5">
                <h3 className="text-lg font-semibold">Report Preview</h3>
                <div className="border border-black/30 rounded-sm p-8">
                  <div className="text-center text-gray-500">
                    No data found for the selected filters.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AnalyticsandExportData;
