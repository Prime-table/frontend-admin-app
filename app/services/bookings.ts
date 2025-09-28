import axios from "axios";
import { getCookie } from "cookies-next/client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/prime-table-admin";
const token = getCookie("adminToken");

export const fetchBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};