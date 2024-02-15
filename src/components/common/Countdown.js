import React, { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[35%] h-[25%] border-2 p-2 flex flex-col items-center justify-center bg-gray-300  rounded-lg">
      <span className="text-[16px]  max-sm:text-[12px] text-gray-800">
        {number}
      </span>
      <span className="text-[16px] max-sm:text-[8px] text-gray-700">
        {unit}
      </span>
    </div>
  );
};

export default memo(Countdown);
