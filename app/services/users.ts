import axios from "axios";
import { getCookie } from "cookies-next/client";
import { addUserData } from "../types/types";

const token = getCookie("adminToken");
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/prime-table-admin";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addUser = async (userData:addUserData)=>{
    try {
        const response = await axios.post(`${baseUrl}/users`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export const editUser = async (id: string, payload: { email: string}) =>{
    try {
        const response = await axios.put(`${baseUrl}/users/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error editing user:", error);
        throw error;
    }
}

export const deleteUser = async (id: string) =>{
    try {
        const response = await axios.delete(`${baseUrl}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}

export const bulkUserDelete = async (emails: string[]) =>{
    try {
        const response = await axios.delete(`${baseUrl}/users/bulk-delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                emails,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error bulk deleting users:", error);
        throw error;
    }
}
