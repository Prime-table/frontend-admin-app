"use client";
import { useContext, useState, useEffect, createContext } from "react";

interface AppContextProps {
  defaultPrimaryColor: string;
  defaultSecondaryColor: string;
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color2: string) => void;
}

const AppContext = createContext<AppContextProps | null>(null);

function AppProvider({ children }: { children: React.ReactNode }) {
  const defaultPrimaryColor = "#e22e35";
  const defaultSecondaryColor = "#a6161e";
  const [primaryColor, setPrimaryColor] = useState<string>(defaultPrimaryColor);
  const [secondaryColor, setSecondaryColor] = useState<string>(
    defaultSecondaryColor
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-red-primary",
      String(primaryColor)
    );
    document.documentElement.style.setProperty(
      "--color-red-alt",
      String(secondaryColor)
    );
  }, [primaryColor, secondaryColor]);

  return (
    <AppContext.Provider
      value={{
        defaultPrimaryColor,
        defaultSecondaryColor,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
