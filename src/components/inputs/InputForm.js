import React, { memo } from "react";
import { clsx } from "clsx";
const InputForm = ({
  label,
  disabeled,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  fullwidth,
  defaultValue,
  style,
  readOnly,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2 ", style)}>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}:
        </label>
      )}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabeled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className={clsx(
          "border-2 border-gray-700 form-select p-2 max-h-[42px] rounded-full",
          fullwidth && "w-full",
          style
        )}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);
