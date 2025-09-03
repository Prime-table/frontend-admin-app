import type { Metadata } from "next";
import EscrowTable from "@/app/components/escrow-control/EscrowTable";
export const metadata: Metadata = {
  title: "Escrow Control | Prime Table Admin",
  description: "manage and view escrow transactions",
};

function EscrowControlpage() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <EscrowTable />
    </section>
  );
}

export default EscrowControlpage;
