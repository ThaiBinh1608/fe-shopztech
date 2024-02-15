import React, { memo } from "react";
import clsx from "clsx";
const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  style,
  fullwidth,
  placeholder,
  labelText,
}) => {
  return (
    <div
      className={clsx(
        " mb-[4px] flex flex-col relative",
        fullwidth && "w-full"
      )}
    >
      {labelText && (
        <label
          className="absolute top-0 left-[8px] font-medium "
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        className={clsx(
          "px-3 py-2  mt-6 rounded-l-full  rounded-r-full  border-2 border-gray-400  outline-none w-full  focus:shadow-xl",
          style
        )}
        placeholder={
          placeholder || nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)
        }
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === nameKey) && (
        <small className="text-red-500 text-base">
          {invalidFields.find((el) => el.name === nameKey)?.mes}
        </small>
      )}
    </div>
  );
};

export default memo(InputField);
