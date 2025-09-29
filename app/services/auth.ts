import axios from "axios";
import { LoginFormData } from "../types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/prime-table-admin";

export const loginAdmin = async (data: LoginFormData) => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
    }
}