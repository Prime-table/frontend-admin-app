import { latestPartners, bookingLog } from "../types/types"

export const LatestPartners: latestPartners[] = [
    {
        fullName: "John Doe",
        email: "john@example.com",
        regDate: "2023-01-01",
        status: "approved"
    },
    {
        fullName: "Jane Smith",
        email: "jane@example.com",
        regDate: "2023-02-01",
        status: "pending"
    },
    {
        fullName: "Bob Johnson",
        email: "bob@example.com",
        regDate: "2023-03-01",
        status: "suspended"
    },
    {
        fullName: "Alice Williams",
        email: "alice@example.com",
        regDate: "2023-04-01",
        status: "approved"
    },
    {
        fullName: "Charlie Brown",
        email: "charlie@example.com",
        regDate: "2023-05-01",
        status: "pending"
    },
    {
        fullName: "David Wilson",
        email: "david@example.com",
        regDate: "2023-06-01",
        status: "suspended"
    }
]

export const BookingLogs: bookingLog[] = [
    {
        bookingId: "B1235",
        restaurant: "Big Taste",
        email: "bigtaste@email.com",
        date: "2023-07-01",
        time: "9:45 pm",
        amount: "₦50,000",
        status: "approved"
    },
    {
        bookingId: "B1236",
        restaurant: "Spicy Delight",
        email: "spicydelight@email.com",
        date: "2023-07-02",
        time: "8:30 pm",
        amount: "₦30,000",
        status: "pending"
    },
    {
        bookingId: "B1237",
        restaurant: "Sushi World",
        email: "sushiworld@email.com",
        date: "2023-07-03",
        time: "7:15 pm",
        amount: "₦40,000",
        status: "cancelled"
    },
    {
        bookingId: "B1238",
        restaurant: "Pasta Paradise",
        email: "pastaparadise@email.com",
        date: "2023-07-04",
        time: "6:00 pm",
        amount: "₦35,000",
        status: "approved"
    }
];