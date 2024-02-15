import React, { memo, Fragment, useState } from "react";
import avatar from "../../assets/images/avatar.jpg";
import { Link, NavLink } from "react-router-dom";
import { adminListSidebar, memberListSidebar } from "../../ultils/contants";
import { clsx } from "clsx";
import icons from "../../ultils/icons";
import path from "../../ultils/path";
import { useSelector } from "react-redux";
import Button from "../button/Button";
const { BsFillArrowDownCircleFill, BsFillArrowLeftCircleFill } = icons;
const activedStyle =
  "px-4 py-2 flex items-center gap-2 font-medium text-violet-600 ";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-medium hover:text-violet-600 ";
const MemberSidebar = () => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);

  const handleShowtab = (tabId) => {
    if (actived.some((el) => el === tabId))
      setActived((prev) => prev.filter((el) => el !== tabId));
    else setActived((prev) => [...prev, tabId]);
  };

  return (
    <div className=" border-4 h-auto text-sm bg-violet-100 border-violet-700 ">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-full flex items-center justify-center  py-4 border-b-4 border-violet-500 ">
          <Link to={`/${path.HOME}`} className="text-lg font-bold ">
            <Button>HOME PAGE</Button>
          </Link>
        </div>

        <img
          src={current?.avatar || avatar}
          alt="logo"
          className=" p-2 object-contain w-[120px] rounded-full"
        />
        <small>{`${current?.firstName} ${current?.lastName}`}</small>
      </div>
      <div className="flex flex-col p-2">
        {memberListSidebar.map((el) => (
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

export default memo(MemberSidebar);
