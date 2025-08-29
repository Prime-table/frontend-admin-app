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
import BookingsChart from "./LineChart";
import { BookingLogs, LatestPartners } from "@/app/dummyData/data";
function AnalyticsandExportData() {
  const [currentTab, setCurrentTab] = useState<"analytics" | "export">(
    "analytics"
  );

  // Filter states for export tab
  const [openDateRangeFilter, setOpenDateRangeFilter] = useState(false);
  const [openRestaurantFilter, setOpenRestaurantFilter] = useState(false);
  const [openPartnerFilter, setOpenPartnerFilter] = useState(false);
  const [openReportTypeFilter, setOpenReportTypeFilter] = useState(false);
  const [openFormatFilter, setOpenFormatFilter] = useState(false);

  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [restaurantFilter, setRestaurantFilter] = useState("all");
  const [partnerFilter, setPartnerFilter] = useState("all");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("pdf");

  // Refs for dropdowns
  const dateRangeDropdownRef = useRef<HTMLDivElement>(null);
  const restaurantDropdownRef = useRef<HTMLDivElement>(null);
  const partnerDropdownRef = useRef<HTMLDivElement>(null);
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

  const handleChoosePartnerFilter = (filter: string) => {
    setPartnerFilter(filter);
    setOpenPartnerFilter(false);
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
        partnerDropdownRef.current &&
        !partnerDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenPartnerFilter(false);
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
          <div className="flex items-center gap-5 px-4">
            <span>Filter:</span>

            {/* Date Range Filter */}
            <div
              ref={dateRangeDropdownRef}
              className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
            >
              {/* trigger */}
              <div
                className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                onClick={() => setOpenDateRangeFilter(!openDateRangeFilter)}
              >
                <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                  Period:{" "}
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
                    ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
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

            {/* Restaurant Filter */}
            <div
              ref={restaurantDropdownRef}
              className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
            >
              {/* trigger */}
              <div
                className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                onClick={() => setOpenRestaurantFilter(!openRestaurantFilter)}
              >
                <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                  Restaurant:{" "}
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
                    ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
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

            {/* Partner Filter */}
            <div
              ref={partnerDropdownRef}
              className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
            >
              {/* trigger */}
              <div
                className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                onClick={() => setOpenPartnerFilter(!openPartnerFilter)}
              >
                <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                  Partner: {partnerFilter === "all" ? "all" : partnerFilter}
                </span>{" "}
                <span>
                  <RiArrowDownSFill className="text-2xl md:text-4xl text-black/80" />
                </span>
              </div>
              {/* content */}
              <div
                className={`w-full bg-white absolute top-[110%]
                flex flex-col items-center justify-center gap-2 py-4 px-3 duration-300 ease-in-out ${
                  openPartnerFilter
                    ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
                    : "max-h-0 opacity-0 z-[-1] pointer-events-none"
                }`}
              >
                <span
                  onClick={() => handleChoosePartnerFilter("all")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  All
                </span>
                {uniquePartners.map((partner) => (
                  <span
                    key={partner}
                    onClick={() => handleChoosePartnerFilter(partner)}
                    className="text-sm font-semibold w-full border border-red-primary 
                      text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                      rounded-md text-center"
                  >
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            {/* Report Type Filter */}
            <div
              ref={reportTypeDropdownRef}
              className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
            >
              {/* trigger */}
              <div
                className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                onClick={() => setOpenReportTypeFilter(!openReportTypeFilter)}
              >
                <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                  Type:{" "}
                  {reportTypeFilter === "all"
                    ? "all"
                    : reportTypeFilter.replace("-", " ")}
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
                    ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto overflow-y-auto"
                    : "max-h-0 opacity-0 z-[-1] pointer-events-none"
                }`}
              >
                <span
                  onClick={() => handleChooseReportTypeFilter("all")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  All
                </span>
                <span
                  onClick={() => handleChooseReportTypeFilter("booking-logs")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  Booking Logs
                </span>
                <span
                  onClick={() => handleChooseReportTypeFilter("partner-data")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  Partner Data
                </span>
                <span
                  onClick={() => handleChooseReportTypeFilter("escrow-data")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  Escrow Data
                </span>
                <span
                  onClick={() =>
                    handleChooseReportTypeFilter("analytics-summary")
                  }
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  Analytics Summary
                </span>
              </div>
            </div>

            {/* Format Filter */}
            <div
              ref={formatDropdownRef}
              className="w-[200px] md:w-[250px] relative border border-black/30 hover:border-red-primary/50 
                duration-300 ease-in-out rounded-sm flex items-center justify-center 
                cursor-pointer"
            >
              {/* trigger */}
              <div
                className="w-full flex justify-center gap-8 capitalize py-2 px-4 md:py-3 md:px-6"
                onClick={() => setOpenFormatFilter(!openFormatFilter)}
              >
                <span className="flex items-center text-sm md:text-base whitespace-nowrap">
                  Format: {formatFilter}
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
                    ? "max-h-[175px] opacity-100 z-[10] pointer-events-auto"
                    : "max-h-0 opacity-0 z-[-1] pointer-events-none"
                }`}
              >
                <span
                  onClick={() => handleChooseFormatFilter("pdf")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  PDF
                </span>
                <span
                  onClick={() => handleChooseFormatFilter("csv")}
                  className="text-sm font-semibold w-full border border-red-primary 
                    text-red-alt px-3 py-2 cursor-pointer hover:bg-red-primary/10 duration-300 ease-in-out 
                    rounded-md text-center"
                >
                  CSV
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

          {/* Export Button */}
          <div className="flex justify-end px-4">
            <button className="bg-red-primary text-white px-6 py-3 rounded-md hover:bg-red-alt duration-300 ease-in-out font-medium">
              Export Report
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AnalyticsandExportData;
