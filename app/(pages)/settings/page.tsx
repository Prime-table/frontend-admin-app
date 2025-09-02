import type { Metadata } from "next";
import SettingsControl from "@/app/components/settings/SettingsControl";

export const metadata: Metadata = {
  title: "Settings | Prime Table Admin",
  description: "Configure platform-wide preferences and defaults.",
};

function Settings() {
  return (
    <section className="w-full flex flex-col gap-5 p-5">
      <SettingsControl />
    </section>
  );
}

export default Settings;
