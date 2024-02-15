import React, { memo } from "react";
import clsx from "clsx";
const Select = ({
  label,
  options = [],
  register,
  errors,
  validate,
  style,
  fullWidth,
  id,
  defaultValue,
}) => {
  
  return (
    <div className={clsx("flex flex-col gap-2", style)}>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <select
        className={clsx(
          "border-2 border-gray-700 form-select max-h-[42px]",
          fullWidth && "w-full",
          style
        )}
        id={id}
        defaultValue={defaultValue}
        {...register(id, validate)}
      >
        <option className=" border-2 border-gray-700" value="">
          -CHOOSE-
        </option>
        {options?.map((el) => (
          <option value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(Select);
