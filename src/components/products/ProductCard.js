import React, { memo } from "react";
import { formatmoney, renderStarFromNumber } from "../../ultils/helpers";
import withBase from "../../hocs/withBase";
import path from "../../ultils/path";

const ProductCard = ({
  image,
  title,
  price,
  totalRatings,
  pid,
  navigate,
  category,
}) => {
  return (
    <div
      onClick={(e) => navigate(`/${category?.toLowerCase()}/${pid}/${title}`)}
      className="w-1/3 flex cursor-pointer flex-auto px-[10px]"
    >
      <div className="flex w-full border ">
        <img
          src={image}
          alt="product"
          className="w-[120px] max-sm:w-[80px]  object-contain p-4"
        />
        <div className=" flex flex-col mt-[15px] max-sm:mt-[8px]  max-sm:text-[15px] items-start gap-1 w-full ">
          <span className="line-clamp-1 capitalize ">
            {title?.toLowerCase()}
          </span>
          <span className="flex h-[16px] ">
            {renderStarFromNumber(totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span className="text-red-500">{`${formatmoney(price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(ProductCard));
