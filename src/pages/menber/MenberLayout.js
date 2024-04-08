import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import MemberSidebar from "../../components/Sidebar/MemberSidebar";
import { Header } from "../../components";
const MenberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`${path.LOGIN}`} replace={true}></Navigate>;
  return (
    <div className="flex flex-col">
      <Header></Header>
      <div className=" px-10 h-screen  max-sm:px-1    items-center justify-center ">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MenberLayout;
