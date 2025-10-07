export type latestPartners ={
    fullName: string;
    email: string;
    regDate: string;
    status: "approved" | "pending" | "suspended";
}

export type latestPartnersData = {
    _id: string;
    email: string;
    password: string;
    status?: string;
    partnerId: string;
    createdAt: string;
    updatedAt: string;
    _v: number;
}

export interface fetchAllPartnersResponse {
    success: boolean;
    count: number
    data: latestPartnersData[];
}

export type bookingLog = {
    _id: number;
    bookingId: string;
    restaurant: string;
    email: string;
    date: string;
    time: string;
    amount: number
    status: "approved" | "pending" | "cancelled";
}

export type escrowControl = {
    _id: string,
    bookingId: string;
    restaurant: string;
    amount: string;
    payoutDate: string;
    status: "approved" | "pending" | "rejected";
}

export type Users = {
    _id?: string;
    fullName: string;
    email: string;
    role: "partner" | "customer" | "staff";
    status: "approved" | "pending" | "suspended";
    createdAt: string;
    updatedAt: string;
}
export type addUserData = {
  fullName: string;
  email: string;
  role: string;
  status: "approved" | "pending" | "suspended";
}

export type Reviews = {
    id: string;
    userName: string;
    restaurant: string;
    rating: number;
    review: string;
    status: "approved" | "removed" | "flagged";
    createdAt: string;
    updatedAt: string;
}

// auth types
export type LoginFormData = {
    email: string;
    password: string;
}
export type adminLoginResponse = {
    _id: string;
    email: string;
    token: string;
}