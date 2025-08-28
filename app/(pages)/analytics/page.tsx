import type { Metadata } from "next";
import AnalyticsandExportData from "@/app/components/analytics/AnalyticsData";

export const metadata: Metadata = {
  title: "Analytics | Prime Table Admin",
  description: "see data analysis and export data",
};

function AnalyticsPage() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <AnalyticsandExportData />
    </section>
  );
}

export default AnalyticsPage;
