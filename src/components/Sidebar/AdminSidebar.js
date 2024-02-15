import React, { memo, Fragment, useState } from "react";
import logo from "../../assets/images/logo1.png";
import { Link, NavLink } from "react-router-dom";
import { adminListSidebar } from "../../ultils/contants";
import { clsx } from "clsx";
import icons from "../../ultils/icons";
import path from "../../ultils/path";

const { BsFillArrowDownCircleFill, BsFillArrowLeftCircleFill } = icons;
const activedStyle =
  "px-4 py-2 flex items-center gap-2 font-medium text-violet-600 ";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-medium hover:text-violet-600 ";
const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowtab = (tabId) => {
    if (actived.some((el) => el === tabId))
      setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };
  return (
    <div className=" border-4 h-auto text-sm bg-violet-100 border-violet-700 py-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <Link to={`/${path.HOME}`}>
          <img
            src={logo}
            alt="logo"
            className=" p-4 object-contain w-[200px]"
          />
        </Link>
        <small className="font-medium text-[16px]">Admin Workspace</small>
      </div>
      <div className="flex flex-col p-2">
        {adminListSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <div className="border-2 gap-2">
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    clsx(isActive && activedStyle, !isActive && notActiveStyle)
                  }
                >
                  <div className="flex gap-2 items-center justify-center">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                </NavLink>
              </div>
            )}
            {el.type === "PARENT" && (
              <div className="flex flex-col border-2 font-medium ">
                <div
                  onClick={() => {
                    handleShowtab(+el.id);
                  }}
                  className="flex items-center justify-between gap-2 px-4 py-2 "
                >
                  <div className="flex gap-2 items-center justify-center cursor-pointer">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  <div>
                    {actived.some((id) => id === el.id) ? (
                      <BsFillArrowLeftCircleFill></BsFillArrowLeftCircleFill>
                    ) : (
                      <BsFillArrowDownCircleFill></BsFillArrowDownCircleFill>
                    )}
                  </div>
                </div>
                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col">
                    {el.submenu.map((item) => (
                      <div className="border-2">
                        <NavLink
                          onClick={(e) => e.stopPropagation()}
                          key={item.text}
                          to={item.path}
                          className={({ isActive }) =>
                            clsx(
                              isActive && activedStyle,
                              !isActive && notActiveStyle,
                              "pl-8"
                            )
                          }
                        >
                          <span>{item.text}</span>
                        </NavLink>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
