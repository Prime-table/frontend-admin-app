import axios from "axios";
import { getCookie } from "cookies-next/client";

const token = getCookie("adminToken");
const baseUrl = "https://backend-partner-app.onrender.com/partners/getallpartners";

export const fetchAllPartners = async () =>{
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching partners data:", error);
        throw error;
    }
}