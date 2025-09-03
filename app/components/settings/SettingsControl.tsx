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
import { useAppContext } from "@/app/providers/provider";
import ColorPicker from "react-pick-color";

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
  const handleSaveGeneralChanges = async (e: React.FormEvent) => {
    e.preventDefault();
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

  //   branding form
  const {
    setPrimaryColor,
    setSecondaryColor,
    defaultPrimaryColor,
    defaultSecondaryColor,
  } = useAppContext();
  const [isSavingBrandingState, setIsSavingBrandingState] = useState(false);
  const [brandingFormState, setBrandingFormState] = useState({
    primaryColor: defaultPrimaryColor,
    secondaryColor: defaultSecondaryColor,
    logo: "/logo.png",
    favicon: "/favicon.ico",
  });
  const handleBrandingReset = () => {
    setBrandingFormState({
      primaryColor: defaultPrimaryColor,
      secondaryColor: defaultSecondaryColor,
      logo: "/logo.png",
      favicon: "/favicon.ico",
    });
  };
  //   color picker
  const [openPrimaryColorPicker, setOpenPrimaryColorPicker] = useState(false);
  const [openSecondaryColorPicker, setOpenSecondaryColorPicker] =
    useState(false);
  const handlePrimaryColorChange = (color: any) => {
    setBrandingFormState({
      ...brandingFormState,
      primaryColor: color.hex,
    });
  };
  const handleSecondaryColorChange = (color: any) => {
    setBrandingFormState({
      ...brandingFormState,
      secondaryColor: color.hex,
    });
  };
  const handleCancelPrimaryColorChange = () => {
    setBrandingFormState((prev) => ({
      ...prev,
      primaryColor: defaultPrimaryColor,
    }));
    setOpenPrimaryColorPicker(false);
  };
  const handleCancelSecondaryColorChange = () => {
    setBrandingFormState((prev) => ({
      ...prev,
      secondaryColor: defaultSecondaryColor,
    }));
    setOpenSecondaryColorPicker(false);
  };
  const handleSaveBrandingChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBrandingState(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setPrimaryColor(brandingFormState.primaryColor);
      setSecondaryColor(brandingFormState.secondaryColor);
      toast.success("Branding settings saved successfully!");
    } catch (error) {
      console.error("Error saving branding settings:", error);
      toast.error("Failed to save branding settings. Please try again.");
    } finally {
      setIsSavingBrandingState(false);
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

        {/* branding */}
        {activeTab === "branding" && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium mb-2">Branding</h3>
            <form onSubmit={handleSaveBrandingChanges} className="space-y-4">
              {/* primary */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Primary Color</span>
                {/* color  */}
                <div className="cursor-pointer w-full md:max-w-[150px] p-3 rounded-md border border-gray-300">
                  <span
                    onClick={() => setOpenPrimaryColorPicker(true)}
                    className="block w-full h-[20px]"
                    style={{ backgroundColor: brandingFormState.primaryColor }}
                  ></span>
                  {openPrimaryColorPicker && (
                    <div className="fixed inset-0 bg-black/50 z-[50] flex items-center justify-center">
                      {/* overlay */}
                      <div
                        className="absolute inset-0"
                        onClick={() => setOpenPrimaryColorPicker(false)}
                      />
                      <div className="w-fit relative z-[10] p-3 border border-gray-300 rounded-md bg-white">
                        <ColorPicker
                          color={brandingFormState.primaryColor}
                          onChange={handlePrimaryColorChange}
                        />
                        {/* action buttons */}
                        <div className="pt-4 w-full flex items-center justify-between gap-3">
                          <button
                            onClick={handleCancelPrimaryColorChange}
                            className="w-1/2 py-3 px-6 bg-gray-300 hover:bg-gray-300/80 
                text-black border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                          >
                            Reset
                          </button>
                          <button
                            className="w-1/2 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out flex items-center justify-center"
                            onClick={() => setOpenPrimaryColorPicker(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* secondary */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Secondary Color</span>
                <div className="w-full md:max-w-[150px] p-3 rounded-md border border-gray-300">
                  <span
                    onClick={() => setOpenSecondaryColorPicker(true)}
                    className="block w-full h-[20px]"
                    style={{
                      backgroundColor: brandingFormState.secondaryColor,
                    }}
                  ></span>
                  {openSecondaryColorPicker && (
                    <div className="fixed inset-0 bg-black/50 z-[50] flex items-center justify-center">
                      {/* overlay */}
                      <div
                        className="absolute inset-0"
                        onClick={() => setOpenSecondaryColorPicker(false)}
                      />
                      <div className="w-fit relative z-[10] p-3 border border-gray-300 rounded-md bg-white">
                        <ColorPicker
                          color={brandingFormState.secondaryColor}
                          onChange={handleSecondaryColorChange}
                        />
                        {/* action buttons */}
                        <div className="pt-4 w-full flex items-center justify-between gap-3">
                          <button
                            onClick={handleCancelSecondaryColorChange}
                            className="w-1/2 py-3 px-6 bg-gray-300 hover:bg-gray-300/80 
                text-black border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                          >
                            Reset
                          </button>
                          <button
                            className="w-1/2 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out flex items-center justify-center"
                            onClick={() => setOpenSecondaryColorPicker(false)}
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* logo */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Logo</span>
                <input
                  type="file"
                  // value={brandingFormState.logo}
                  placeholder="Upload .SVG/ .PNG"
                  onChange={(e) =>
                    setBrandingFormState({
                      ...brandingFormState,
                      logo: e.target.files ? e.target.files[0].name : "",
                    })
                  }
                  className="w-full md:max-w-[400px] border border-gray-300 rounded-md p-2 focus:outline-[1px] focus:outline-red-primary"
                />
              </div>
              {/* favicon */}
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-sm">Favicon</span>
                <input
                  type="file"
                  onChange={(e) =>
                    setBrandingFormState({
                      ...brandingFormState,
                      favicon: e.target.files ? e.target.files[0].name : "",
                    })
                  }
                  className="w-full md:max-w-[400px] border border-gray-300 rounded-md p-2 focus:outline-[1px] focus:outline-red-primary"
                />
              </div>
              <div className="pt-4 w-full flex flex-col md:flex-row items-center gap-5 justify-center md:justify-end">
                <button
                  onClick={handleBrandingReset}
                  className="w-full lg:w-1/4 xl:w-1/5 py-3 px-6 bg-gray-300 hover:bg-gray-300/80 
                text-black border border-transparent rounded-sm transition-colors duration-200 ease-in-out"
                >
                  Reset
                </button>
                <button
                  onClick={handleSaveBrandingChanges}
                  disabled={isSavingBrandingState}
                  type="submit"
                  className="w-full lg:w-1/4 xl:w-1/5 py-3 px-6 bg-red-primary hover:bg-red-primary/90 
                text-white border border-transparent rounded-sm transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSavingBrandingState ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* integration */}
        {activeTab === "integration" && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium mb-2">General Settings</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default SettingsControl;
