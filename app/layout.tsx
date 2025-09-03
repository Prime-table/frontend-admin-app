import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SideBar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import AppProvider from "./providers/provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prime Table Admin",
  description: "Admin application for the managament of prime table data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppProvider>
        <body className={`${poppins.className} antialiased`}>
          <Toaster />
          <div className="w-screen h-screen flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 min-h-0">
              <SideBar />
              <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </body>
      </AppProvider>
    </html>
  );
}
