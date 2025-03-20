import { Outlet } from "react-router-dom";

import LandingHeader from "@/components/layout/LandingHeader";

const LandingLayout = () => {
  return (
    <>
      <LandingHeader />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default LandingLayout;
