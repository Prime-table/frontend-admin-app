"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

function SettingsControl() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [generalFormState, setGeneralFormState] = useState({
    platformName: "Prime Table",
    currency: "NGN(₦)",
    timezone: "Africa/Lagos",
    reservation: 60,
    supportEmail: "Support@primetable.com",
  });

  const currencies = [
    {
      value: "NGN(₦)",
    },
    {
      value: "GHS(₵)",
    },
    {
      value: "RAND(₨)",
    },
    {
      value: "USD($)",
    },
    {
      value: "EUR(€)",
    },
  ];
  const timeZones = [
    {
      value: "Africa/Lagos",
    },
    {
      value: "America/New_York",
    },
    {
      value: "Asia/Tokyo",
    },
    {
      value: "Europe/London",
    },
    {
      value: "Australia/Sydney",
    },
  ];
  const handleGeneralReset = () => {
    setGeneralFormState({
      platformName: "Prime Table",
      currency: "NGN(₦)",
      timezone: "Africa/Lagos",
      reservation: 60,
      supportEmail: "Support@primetable.com",
    });
  };
  const handleSaveGeneralChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("General settings saved successfully!");
    } catch (error) {
      console.error("Error saving general settings:", error);
      toast.error("Failed to save general settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-5">
      {/* header */}
      <header className="flex flex-col gap-2s">
        <h2 className="text-2xl md:text-3xl font-medium">Settings</h2>
        <p>Configure platform-wide preferences and defaults.</p>
      </header>

      {/* tabs */}
      <div className="w-full flex flex-wrap items-center relative">
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative text-sm ${
              activeTab === "general"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative text-sm ${
              activeTab === "branding"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("branding")}
        >
          Branding
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors text-black hover:text-red-primary
            duration-300 ease-in-out relative text-sm ${
              activeTab === "integration"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("integration")}
        >
          Integration
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors  text-black hover:text-red-primary
            duration-300 ease-in-out relative text-sm ${
              activeTab === "notificaton"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("notificaton")}
        >
          Notification
        </span>
        <span
          className={`cursor-pointer py-4 px-3 transition-colors  text-black hover:text-red-primary
            duration-300 ease-in-out relative text-sm ${
              activeTab === "security"
                ? "text-red-primary after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[2px] after:bg-red-primary"
                : ""
            }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </span>
        <hr className="absolute bottom-0 left-0 right-0 text-gray-300 h-[2px]" />
      </div>

      {/* content */}
      <div className="w-full shadow-sm border border-gray-300 rounded-md p-5">
        {activeTab === "general" && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium mb-2">General Settings</h3>
            <form className="space-y-4">
              {/* platform name */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Platform Name</span>
                <input
                  type="text"
                  value={generalFormState.platformName || ""}
                  onChange={(e) =>
                    setGeneralFormState({
                      ...generalFormState,
                      platformName: e.target.value,
                    })
                  }
                  className="w-full md:max-w-[400px] border border-gray-300 rounded-md p-2 focus:outline-[1px] focus:outline-red-primary"
                />
              </div>

              {/* default currency */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Default Currency</span>
                <Select
                  value={generalFormState.currency}
                  onValueChange={(value) =>
                    setGeneralFormState({
                      ...generalFormState,
                      currency: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full md:max-w-[400px]">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.value} value={currency.value}>
                        {currency.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* timezone */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Timezone</span>
                <Select
                  value={generalFormState.timezone}
                  onValueChange={(value) =>
                    setGeneralFormState({
                      ...generalFormState,
                      timezone: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full md:max-w-[400px]">
                    <SelectValue placeholder="Select a timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* reservation window */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">
                  Reservation Window (days)
                </span>
                <input
                  type="number"
                  value={generalFormState.reservation || 60}
                  onChange={(e) =>
                    setGeneralFormState({
                      ...generalFormState,
                      reservation: Number(e.target.value),
                    })
                  }
                  className="w-full md:max-w-[400px] border border-gray-300 rounded-md p-2 focus:outline-[1px] focus:outline-red-primary"
                />
              </div>
              {/* support email */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Support Email</span>
                <input
                  type="email"
                  value={generalFormState.supportEmail || ""}
                  onChange={(e) =>
                    setGeneralFormState({
                      ...generalFormState,
                      supportEmail: e.target.value,
                    })
                  }
                  className="w-full md:max-w-[400px] border border-gray-300 rounded-md p-2 focus:outline-[1px] focus:outline-red-primary"
                />
              </div>

              {/* action buttons */}
              <div className="pt-4 w-full flex flex-col md:flex-row items-center gap-5 justify-center md:justify-end">
                <button
                  onClick={handleGeneralReset}
                  className="w-full lg:w-1/4 xl:w-1/5 py-3 px-6 bg-gray-300 hover:bg-gray-300/80 
                text-black border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Reset
                </button>
                <button
                  onClick={handleSaveGeneralChanges}
                  disabled={isSaving}
                  type="submit"
                  className="w-full lg:w-1/4 xl:w-1/5 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsControl;
