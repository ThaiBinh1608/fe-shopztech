import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import MemberSidebar from "../../components/Sidebar/MemberSidebar";
const MenberLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`${path.LOGIN}`} replace={true}></Navigate>;
  return (
    <div className="flex min-h-screen">
      <MemberSidebar></MemberSidebar>
      <div className="flex-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default MenberLayout;
