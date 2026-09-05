import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";

export const useResponsive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Match the server's no-viewport result during hydration, then use the real viewport.
  const device = isHydrated ? undefined : { width: 0 };
  const xxl = useMediaQuery({
    query: "(min-width: 1600px)",
  }, device);
  const xl = useMediaQuery({
    query: "(min-width: 1200px)",
  }, device);
  const lg = useMediaQuery({
    query: "(min-width: 992px)",
  }, device);
  const md = useMediaQuery({
    query: "(min-width: 768px)",
  }, device);
  const sm = useMediaQuery({
    query: "(min-width: 576px)",
  }, device);
  const xs = useMediaQuery({
    query: "(max-width: 576px)",
  }, device);
  return { xxl, xl, lg, md, sm, xs };
};
