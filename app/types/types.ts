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