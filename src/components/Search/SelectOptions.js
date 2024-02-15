import React, { memo } from "react";

const SelectOptions = ({ icon }) => {
  return (
    <div className="text-xl w-[32px] h-[32px] rounded-full bg-gray-200 border shadow-md flex items-center justify-center hover:bg-violet-300 cursor-pointer">
      {icon}
    </div>
  );
};

export default memo(SelectOptions);
