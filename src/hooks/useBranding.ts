import { useState, useCallback, useMemo } from "react";

export interface BrandingSettings {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  companyName: string;
}

const defaultBranding: BrandingSettings = {
  logo: null,
  primaryColor: "40 85% 55%",
  secondaryColor: "35 80% 35%",
  fontFamily: "system-ui, sans-serif",
  companyName: "Mali Tenenbaum Architecture & Design",
};

export const useBranding = () => {
  const [branding, setBranding] = useState<BrandingSettings>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("branding");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultBranding;
      }
    }
    return defaultBranding;
  });

  const updateBranding = useCallback((newSettings: BrandingSettings) => {
    setBranding(newSettings);
    localStorage.setItem("branding", JSON.stringify(newSettings));
  }, []);

  const resetBranding = useCallback(() => {
    setBranding(defaultBranding);
    localStorage.removeItem("branding");
  }, []);

  const cssVariables = useMemo(() => ({
    "--brand-primary": `hsl(${branding.primaryColor})`,
    "--brand-secondary": `hsl(${branding.secondaryColor})`,
    "--brand-font": branding.fontFamily,
  }), [branding.primaryColor, branding.secondaryColor, branding.fontFamily]);

  return {
    branding,
    updateBranding,
    resetBranding,
    cssVariables,
  };
};
