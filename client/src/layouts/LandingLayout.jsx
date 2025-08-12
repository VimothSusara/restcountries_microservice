import { Outlet } from "react-router-dom";

import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";

const LandingLayout = () => {
  return (
    <>
      <LandingHeader />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default LandingLayout;
