import React, { memo } from "react";

const ExtraInfor = ({ title, sub, icon }) => {
  return (
    <div className="flex items-center p-4 gap-4 text-[18px]">
      <span className="bg-violet-400 p-4 rounded-xl">{icon}</span>
      <div className="flex flex-col text-gray-500">
        <span className="font-semibold">{title}</span>
        <span>{sub}</span>
      </div>
    </div>
  );
};

export default memo(ExtraInfor);
