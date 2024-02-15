import React, { memo, useEffect, useState } from "react";
import logo from "../../assets/images/logo1.png";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearMessage } from "../../store/user/userSlice";
import Swal from "sweetalert2";
import { BsCartCheckFill } from "react-icons/bs";
import withBase from "../../hocs/withBase";
import { showCart } from "../../store/app/appSlice";

const Header = () => {
  const {
    FaCartArrowDown,
    BiSolidUserCircle,
    RiLogoutCircleRLine,
    AiFillCloseCircle,
  } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, current, mes } = useSelector((state) => state.user);
  const { isShowCart } = useSelector((state) => state.app);
  const [isShowNav, setISShowNav] = useState(false);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (mes)
      Swal.fire("Oops!!!", mes, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [mes]);

  return (
    <div className="w-full flex justify-between items-center h-[100%] bg-violet-400   border-4 border-violet-600 ">
      <Link to={`/${path.HOME}`}>
        <img
          src={logo}
          alt="logo"
          className="max-w-[200px] max-sm:w-[160px] object-contain"
        />
      </Link>

      <div className="flex text-[18px] h-[100%]">
        {/* <div className="flex flex-col py-2 px-4 border-x-4 border-violet-600 items-center ">
          <span className="flex gap-1 items-center">
            <BsFillTelephoneForwardFill></BsFillTelephoneForwardFill>
            <span className="font-semibold ">0909090909</span>
          </span>
          <span className="font-semibold  ">Từ T2-T7 | 7h-21h</span>
        </div>
        <div className="flex flex-col px-4 border-r-4 border-violet-600 justify-center items-center">
          <span className="flex gap-1 items-center">
            <CgMail></CgMail>
            <span className="font-semibold  text[20px]">
              hakaioxyz@gmail.com
            </span>
          </span>
          <span className="font-semibold text[20px]">Hỗ trợ 24/7</span>
        </div> */}

        <div
          onClick={() => dispatch(showCart())}
          className="flex px-2 items-center cursor-pointer h-[100%]  border-x-4  border-violet-600  gap-1 "
        >
          <FaCartArrowDown size={32}></FaCartArrowDown>
          <span className="font-semibold">{`${
            isLoggedIn && current ? current?.cart?.length : 0
          } items`}</span>
        </div>
        <div className="flex px-4 items-center font-semibold  cursor-pointer  ">
          {isLoggedIn && current ? (
            <div className="flex  flex-col items-center justify-normal ">
              <BiSolidUserCircle
                size={30}
                onClick={() => setISShowNav(!isShowNav)}
              ></BiSolidUserCircle>
              {isShowNav && (
                <div
                  onClick={() => setISShowNav(!isShowNav)}
                  className="absolute top-0 left-0 right-0 bottom-0 bg-overlay flex justify-end  z-50"
                >
                  <div className="h-fit  flex flex-col p-2 rounded-b-xl bg-white border-2 border-violet-700 shadow-2xl">
                    <Link
                      to={`${path.MEMBER}/${path.PERSONAL}`}
                      className="flex hover:text-violet-500 gap-2 items-center justify-between p-2 border-2 "
                    >
                      <span>Profile</span>
                      <BiSolidUserCircle size={18}></BiSolidUserCircle>
                    </Link>
                    {+current.role === 2001 && (
                      <Link
                        to={`${path.ADMIN}/${path.DASHBOARD}`}
                        className="flex hover:text-violet-500 gap-2 items-center justify-between p-2 border-2 "
                      >
                        <span>Admin</span>
                        <BiSolidUserCircle size={18}></BiSolidUserCircle>
                      </Link>
                    )}

                    <div
                      className="flex gap-2 hover:text-violet-500 items-center justify-between p-2 border-2 "
                      onClick={() => dispatch(logout())}
                    >
                      <span>Đăng xuất</span>
                      <RiLogoutCircleRLine size={18}></RiLogoutCircleRLine>
                    </div>

                    <div
                      onClick={() => setISShowNav(!isShowNav)}
                      className="flex gap-2 hover:text-violet-500 items-center justify-between p-2 border-2 "
                    >
                      <span>Đóng</span>
                      <AiFillCloseCircle size={18}></AiFillCloseCircle>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to={`/${path.LOGIN}`}>Đăng nhập</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Header));
