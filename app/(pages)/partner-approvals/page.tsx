import type { Metadata } from "next";
import PartnersTable from "@/app/components/partner-approvals/PartnerTable";

export const metadata: Metadata = {
  title: "Partner Approvals | Prime Table Admin",
  description: "Manage partner approvals",
};

function PartnerApprovals() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <PartnersTable />
    </section>
  );
}

export default PartnerApprovals;
