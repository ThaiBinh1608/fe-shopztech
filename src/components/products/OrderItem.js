import React, { useEffect, useState } from "react";
import SelectQuantity from "../common/SelectQuantity";
import { formatmoney } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import { updateCart } from "../../store/user/userSlice";
import withBase from "../../hocs/withBase";

const OrderItem = ({
  el,
  color,
  defaultQuantity = 1,
  title,
  price,
  thumbnail,
  pid,
  disPath,
}) => {
  const { current } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(() => defaultQuantity);
  const handleQuantity = (number) => {
    if (Number(number) > 1) setQuantity(number);
  };

  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  useEffect(() => {
    disPath(updateCart({ pid, quantity, color }));
  }, [quantity]);

  return (
    <div className="w-full mx-auto  py-3 items-center border-1 border-gray-500 font-bold grid grid-cols-10">
      <span className="col-span-5  max-sm:col-span-5   w-full text-center">
        <div className="flex px-2  gap-2 ">
          <img
            src={thumbnail || el?.product?.thumb}
            alt=""
            className="w-20 h-20 max-sm:w-18 max-sm:h-18 object-cover gap-1 border-2  border-violet-500"
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="font-semibold text-base max-sm:text-xs max-sm:font-semibold ">
              {title}
            </span>
            <span className="text-xs font-normal">{color}</span>
          </div>
        </div>
      </span>
      <span className="col-span-1  max-sm:col-span-2  w-full  text-center">
        <div className="flex items-center justify-center h-full">
          <SelectQuantity
            quantity={quantity}
            handleQuantity={handleQuantity}
            handleChangeQuantity={handleChangeQuantity}
          ></SelectQuantity>
        </div>
      </span>
      <span className="col-span-4  max-sm:col-span-3  w-full  flex items-center justify-center">
        <span className=" text-red-500 text-[16px] max-sm:text-[12px] ">{`${formatmoney(
          price * quantity
        )} VND`}</span>
      </span>
    </div>
  );
};

export default withBase(OrderItem);
