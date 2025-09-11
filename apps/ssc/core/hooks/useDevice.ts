import { useEffect, useState } from "react";

export const useDevice = () => {
  type DeviceState = {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  };

  const getDeviceState = (): DeviceState => {
    if (typeof document === "undefined")
      return { isMobile: false, isTablet: false, isDesktop: true };
    const w = document.documentElement.clientWidth;
    const h = document.documentElement.clientHeight;

    if (w <= 767 || h <= 600)
      return { isMobile: true, isTablet: false, isDesktop: false };
    if (w <= 1024) return { isMobile: false, isTablet: true, isDesktop: false };
    return { isMobile: false, isTablet: false, isDesktop: true };
  };

  const [device, setDevice] = useState<DeviceState>(() => getDeviceState());

  useEffect(() => {
    const onResize = () => setDevice(getDeviceState());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return device;
};
