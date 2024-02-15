import React, { memo, useState } from "react";
import { formatPrice, formatmoney } from "../../ultils/helpers";
import label from "../../assets/images/label8.png";
import label2 from "../../assets/images/label9.png";
import { renderStarFromNumber } from "../../ultils/helpers";
import { SelectOptions } from "..";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import withBase from "../../hocs/withBase";
import { apiUpdateCart, apiUpdateWishList } from "../../apis";
import { toast } from "react-toastify";
import { getCurrent } from "../../store/user/asyncAction";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { BsCartCheckFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import clsx from "clsx";

const { AiFillHeart, AiFillEye } = icons;

const Product = ({
  productData,
  isNew,
  normal,
  navigate,
  disPath,
  pid,
  className,
}) => {
  const [isShowOption, setIsShowOption] = useState(false);
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const handleClickOption = async (e, flag) => {
    e.stopPropagation();
    if (flag === "CART") {
      if (!isLoggedIn) {
        return Swal.fire({
          title: "Oops!",
          text: "Bạn phải đăng nhập trước",
          icon: "info",
          confirmButtonText: "Đăng nhập",
          showConfirmButton: true,
          cancelButtonText: "Thoát",
          showCancelButton: true,
        }).then((rs) => {
          if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
        });
      }

      const response = await apiUpdateCart({
        pid: productData?._id,
        color: productData?.color,
        price: productData?.price,
        quantity: 1,
        thumbnail: productData?.thumbnail,
        title: productData?.title,
      });

      if (response.success) {
        toast.success(response.mes);
        disPath(getCurrent());
      } else {
        toast.error(response.mes);
      }
    }
    if (flag === "VIEW") {
      navigate(
        `/${productData?.category?.toLowerCase()}/${productData?._id}/${
          productData?.title
        }`
      );
    }
    if (flag === "WISHLIST") {
      const response = await apiUpdateWishList(pid);
      if (response.success) {
        disPath(getCurrent());
        toast.success(response.mes);
      } else {
        toast.error(response.mes);
      }
    }
  };

  return (
    <div className={clsx("w-full  text-[14px] font-semibold px-5", className)}>
      <div
        className="w-full border-4 border-violet-500 rounded-xl p-[4px] flex flex-col items-center  bg-white"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full  relative">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 z-10 flex  gap-2 justify-center">
              <span onClick={(e) => handleClickOption(e, "VIEW")}>
                <SelectOptions icon={<AiFillEye></AiFillEye>}></SelectOptions>
              </span>
              <span onClick={(e) => handleClickOption(e, "WISHLIST")}>
                <SelectOptions
                  icon={
                    <AiFillHeart
                      color={
                        current?.wishlist?.some((i) => i._id === pid.toString())
                          ? "green"
                          : ""
                      }
                    ></AiFillHeart>
                  }
                ></SelectOptions>
              </span>

              {current?.cart?.some(
                (el) => el.product._id === productData._id.toString()
              ) ? (
                <span>
                  <SelectOptions
                    icon={<BsCartCheckFill color="green" />}
                  ></SelectOptions>
                </span>
              ) : (
                <span onClick={(e) => handleClickOption(e, "CART")}>
                  <SelectOptions icon={<FaCartPlus />}></SelectOptions>
                </span>
              )}
            </div>
          )}
          <Link
            to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${
              productData?.title
            }`}
          >
            <div className="w-full h-auto flex  items-center justify-center">
              <img
                src={
                  productData?.thumb ||
                  "https://ingoodcompany.asia/images/products_attr_img/matrix/default.png"
                }
                alt=""
                className="w-[100%] h-[100%]  object-contain"
              />
            </div>
            {!normal && (
              <img
                src={isNew ? label : label2}
                alt=""
                className="absolute top-[-5px] left-[-10px] w-[35%] h-[35%]"
              />
            )}
          </Link>
        </div>

        <div className="flex flex-col mt-[15px] items-start gap-1 w-full">
          <span className="flex h-[16px]">
            {renderStarFromNumber(productData?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span className="text-red-500">{`${formatmoney(
            formatPrice(productData?.price)
          )} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Product));
