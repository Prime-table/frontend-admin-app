"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const data1 = [
  { month: "Jan", bookings: 100 },
  { month: "Feb", bookings: 75 },
  { month: "Mar", bookings: 320 },
  { month: "Apr", bookings: 260 },
  { month: "May", bookings: 180 },
  { month: "Jun", bookings: 40 },
];
const data2 = [
  { month: "Jul", bookings: 180 },
  { month: "Aug", bookings: 95 },
  { month: "Sept", bookings: 220 },
  { month: "Oct", bookings: 160 },
  { month: "Nov", bookings: 280 },
  { month: "Dec", bookings: 240 },
];

export default function BookingsChart() {
  const [loading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<"Jan-Jun" | "Jul-Dec">("Jul-Dec");
  const handleChangeDateRange = async (dateRange: "Jan-Jun" | "Jul-Dec") => {
    setIsLoading(true);
    // Simulate an API call
    setDateRange(dateRange);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
  return (
    <div className="w-full h-[350px] pb-20 md:pb-10 md:p-5 bg-white border border-gray-300 rounded-lg shadow-sm">
      <header className="w-full flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-xl my-3">Bookings Over Time</h2>
        <div className="flex items-center">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              dateRange === "Jan-Jun"
                ? "bg-red-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleChangeDateRange("Jan-Jun")}
          >
            Jan-Jun
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              dateRange === "Jul-Dec"
                ? "bg-red-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleChangeDateRange("Jul-Dec")}
          >
            Jul-Dec
          </button>
        </div>
      </header>
      {loading && (
        <div className="w-full h-[250px] flex items-center justify-center bg-white bg-opacity-75">
          <span className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
      )}
      {!loading && (
        <ResponsiveContainer
          width="100%"
          height="100%"
          className={`focus:outline-none border-none`}
        >
          <LineChart
            data={dateRange === "Jan-Jun" ? data1 : data2}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="month"
              stroke="#666"
              fontSize={12}
              tick={{ fill: "#666" }}
            />
            <YAxis stroke="#666" fontSize={12} tick={{ fill: "#666" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#DC143C"
              strokeWidth={3}
              dot={{ fill: "#DC143C", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "#DC143C" }}
              name="Bookings"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
