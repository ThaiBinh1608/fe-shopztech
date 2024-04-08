import React, { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import clsx from "clsx";
const Nav = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="w-full justify-center h-[48px]  text-[24px] border-x-4 border-b-4 border-violet-700  font-bold flex items-center bg-slate-100">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className="flex hover:text-violet-500 text-lg gap-2 items-center justify-between p-2 "
        >
          <span>{el.title}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default memo(Nav);
