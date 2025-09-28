import axios from "axios";
import { getCookie } from "cookies-next/client";

const token = getCookie("adminToken");
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/prime-table-admin";

export const fetchEscrowData = async ()=>{
    try {
        const response = await axios.get(`${BASE_URL}/escrows`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching escrow data:", error);
        throw error;
    }
}