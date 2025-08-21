import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Page Not Found | Prime Table Admin",
  description: "Page not found",
};

function NotFound() {
  return (
    <section className="w-full h-full p-5 flex flex-col items-center justify-center">
      {/* logo */}
      <Image
        src="/primetablelogo.jpg"
        alt="Login Image"
        width={500}
        height={500}
        className="w-[150px] h-[150px] rounded-full mb-8"
      />

      {/* 404 message */}
      <h1 className="text-red-primary text-3xl font-bold mb-2 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-4 text-lg text-center">
        Sorry, the page you are looking for does not exist.
      </p>

      {/* Back to home link */}
      <Link
        href="/dashboard"
        className="bg-red-primary text-white hover:bg-red-primary/75 py-4 px-6 text-sm text-center"
      >
        Back To Dashboard
      </Link>
    </section>
  );
}

export default NotFound;
