import { useEffect } from "react";
import { useLocation } from "react-router-dom";
//context

const OpenOnTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    //eslint-disable-next-line
  }, [pathname]);
};

export default OpenOnTop;
