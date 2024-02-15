import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Footer } from "../../components";
const Public = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col  ">
      <Header></Header>
      <Navigation></Navigation>

      <div className="w-full ">
        <Outlet></Outlet>
      </div>
      <div className="w-full ">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Public;
