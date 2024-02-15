import React, { memo } from "react";
import avatar from "../../assets/images/avatar.jpg";
import moment from "moment";
import { renderStarFromNumber } from "../../ultils/helpers";
const Comment = ({
  image = avatar,
  name = "User",
  comment,
  updatedAt,
  star,
}) => {
  return (
    <div className="flex w-full h-full  border-2  mt-2 px-2 justify-start">
      <div className="p-4  w-[60px] h-[60px] items-center justify-center flex flex-col">
        <img
          src={image}
          alt="avatar"
          className="max-w-[60px] max-h-[60px] rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col  justify-center   flex-auto">
        <h3 className="font-medium pl-4">{name}</h3>
        <div className="flex  justify-between items-center">
          <span className="flex items-center gap-1  pl-4">
            {renderStarFromNumber(star)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </span>
          <span>{moment(updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex pl-4">
          <span className="flex items-center gap-1 ">{comment}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(Comment);
