import { useState, useEffect } from "react";

export default function useMobileCheck() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setIsMobile(document.documentElement.clientWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}
