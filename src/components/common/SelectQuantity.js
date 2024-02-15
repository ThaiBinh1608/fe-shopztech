import React, { memo } from "react";
import icons from "../../ultils/icons";
const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  const { AiOutlinePlus, AiOutlineMinus } = icons;
  return (
    <div className="flex items-center justify-center">
      <span
        className=" cursor-pointer "
        onClick={() => handleChangeQuantity("minus")}
      >
        <AiOutlineMinus size={24}></AiOutlineMinus>
      </span>
      <input
        type="text"
        value={quantity}
        onChange={(e) => handleQuantity(e.target.value)}
        className="py-2 text-[16px] outline-none w-[24px] text-center  border-x-2  border-violet-500 mx-1"
      />
      <span
        className=" cursor-pointer "
        onClick={() => handleChangeQuantity("plus")}
      >
        <AiOutlinePlus size={24}></AiOutlinePlus>
      </span>
    </div>
  );
};

export default memo(SelectQuantity);
