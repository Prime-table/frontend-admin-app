import axios from "axios";
import { getCookie } from "cookies-next/client";

const BASE_URL = "https://backend-partner-app.onrender.com/bookings/allbookings";
const token = getCookie("adminToken");

export const fetchBookings = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
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