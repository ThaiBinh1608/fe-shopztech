import React, { useRef, useEffect, memo } from "react";
import icons from "../../ultils/icons";

const VoteBar = ({ number, ratingCount, raitingTotal }) => {
  const { AiFillStar } = icons;
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / raitingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, raitingTotal]);
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-[10%] items-center justify-center gap-1 text-gray-500 text-lg font-medium">
        <span>{number}</span>
        <span>
          <AiFillStar color="gold"></AiFillStar>
        </span>
      </div>
      <div className="w-[75%]">
        <div className="w-full relative h-2 bg-gray-300 rounded-l-full rounded-r-full">
          <div
            ref={percentRef}
            className="absolute  inset-0 bg-violet-500"
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end">{`${
        ratingCount || 0
      } đánh giá`}</div>
    </div>
  );
};

export default memo(VoteBar);
