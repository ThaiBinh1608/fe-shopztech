import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-white text-xl max-sm:text-sm font-semibold pb-10">
        Quá trình tải dữ liệu sẽ mất chút thời gian, xin vui lòng đợi tải lại
        trang
      </div>
      <HashLoader color="violet"></HashLoader>;
    </div>
  );
};

export default memo(Loading);
