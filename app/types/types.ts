export type latestPartners ={
    fullName: string;
    email: string;
    regDate: string;
    status: "approved" | "pending" | "suspended";
}

export type bookingLog = {
    bookingId: string;
    restaurant: string;
    email: string;
    date: string;
    time: string;
    amount: string
    status: "approved" | "pending" | "cancelled";
}

export type escrowControl = {
    bookingId: string;
    restaurant: string;
    amount: string;
    payoutDate: string;
    status: "approved" | "pending" | "rejected";
}

export type Users = {
    fullName: string;
    email: string;
    role: "partner" | "customer" | "staff";
    status: "approved" | "pending" | "suspended";
    createdAt: string;
    updatedAt: string;
}