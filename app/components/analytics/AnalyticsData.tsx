"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BriefcaseBusiness,
  Users,
  PiggyBank,
  User,
} from "lucide-react";
import BookingsChart from "./LineChart";
function AnalyticsandExportData() {
  const [currentTab, setCurrentTab] = useState<"analytics" | "export">(
    "analytics"
  );
  return (
    <>
      {currentTab === "analytics" && (
        <div className="w-full flex flex-col gap-5">
          <header>
            <h2 className="text-lg font-bold">Analytics</h2>
          </header>
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
    </>
  );
}

export default AnalyticsandExportData;
