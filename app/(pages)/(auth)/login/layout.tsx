import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Prime Table Admin",
  description: "Login page for the admin panel",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
