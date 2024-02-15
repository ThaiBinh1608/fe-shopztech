import React, { memo } from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-full justify-center h-[48px]  text-[24px] border-x-4 border-b-4 border-violet-700  font-bold flex items-center bg-slate-100">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive ? "px-4 text-violet-700" : " px-4 hover:text-violet-700 "
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Navigation);
