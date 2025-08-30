import type { Metadata } from "next";
import UserManagementTable from "@/app/components/user-management/UserManagementTable";

export const metadata: Metadata = {
  title: "User Management | Prime Table Admin",
  description: "manage and view users of app",
};

function UserManagement() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <UserManagementTable />
    </section>
  );
}

export default UserManagement;
