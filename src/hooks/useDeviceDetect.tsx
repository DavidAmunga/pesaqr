import { useState, useEffect } from "react";

const useDeviceDetect = () => {
  const [deviceType, setDeviceType] = useState<string | null>(null);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;

    if (/Windows/i.test(userAgent)) {
      setDeviceType("Windows");
    } else if (/Mac/i.test(userAgent)) {
      setDeviceType("Mac");
    } else if (/Android/i.test(userAgent)) {
      setDeviceType("Mobile");
    } else if (/Linux/i.test(userAgent)) {
      setDeviceType("Linux");
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Mobile");
    }
  }, []);

  return deviceType;
};

export default useDeviceDetect;
