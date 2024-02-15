import React, { memo } from "react";

const inputSelect = ({ value, changeValue, options }) => {
  return (
    <select
      className="p-1 border-2 border-violet-700"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
    >
      <option value="">Choose</option>
      {options?.map((el) => (
        <option key={el.id} value={el.value}>
          {el.text}
        </option>
      ))}
    </select>
  );
};

export default memo(inputSelect);
