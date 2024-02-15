import React, { memo } from "react";

const Button = ({ children, handleOnClick, style, fw, type = "button" }) => {
  return (
    <button
      type={type}
      className={
        style
          ? style
          : `px-2 py-2 my-1 rounded-md font-semibold text-white bg-violet-600 ${
              fw ? "w-full" : "w-fit"
            }`
      }
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
    >
      <span>{children}</span>
    </button>
  );
};

export default memo(Button);
