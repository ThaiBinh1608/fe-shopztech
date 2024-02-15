import React, { memo } from "react";
import banner from "../../assets/images/banner1.jpg";
const Banner = () => {
  return (
    <div className="w-full ">
      <img
        src={banner}
        alt="banner"
        className="w-full h-[360px] object-cover rounded-xl"
      />
    </div>
  );
};

export default memo(Banner);
