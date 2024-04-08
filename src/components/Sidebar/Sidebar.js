import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import clsx from "clsx";
const Sidebar = ({ style }) => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div
      className={clsx(
        "flex text-[16px] text-base font-semibold border-4 border-violet-600 bg-slate-100 rounded-lg",
        style
      )}
    >
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "px-5 py-[15px] pb-[14px] bg-violet-500 "
              : "px-5 py-[15px] pb-[14px] hover:bg-violet-400 "
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Sidebar);
