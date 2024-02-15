import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return <HashLoader color="violet"></HashLoader>;
};

export default memo(Loading);
