import { Outlet } from "react-router-dom";

import Header from "@/components/layout/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;