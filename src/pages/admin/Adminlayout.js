import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "../../ultils/path";
import { AdminSidebar } from "../../components";
const Adminlayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current || +current.role !== 2001)
    return <Navigate to={`${path.LOGIN}`} replace={true}></Navigate>;
  return (
    <div className="flex w-full min-h-screen ">
      <div className=" ">
        <AdminSidebar></AdminSidebar>
      </div>
      <div className="flex-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Adminlayout;
