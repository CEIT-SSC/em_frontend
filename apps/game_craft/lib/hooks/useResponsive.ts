import { useMediaQuery } from "react-responsive";

export const useResponsive = () => {
  const xxl = useMediaQuery({
    query: "(min-width: 1600px)",
  });
  const xl = useMediaQuery({
    query: "(min-width: 1200px)",
  });
  const lg = useMediaQuery({
    query: "(min-width: 992px)",
  });
  const md = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const sm = useMediaQuery({
    query: "(min-width: 576px)",
  });
  const xs = useMediaQuery({
    query: "(max-width: 576px)",
  });
  return { xxl, xl, lg, md, sm, xs };
};
