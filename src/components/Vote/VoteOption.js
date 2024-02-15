import React, { memo, useRef, useEffect, useState } from "react";
import logo from "../../assets/images/logo1.png";
import { VoteOptions } from "../../ultils/contants";
import icons from "../../ultils/icons";
import { Button } from "..";
const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const [chooseStar, setChooseStar] = useState(null);
  const modalRef = useRef();
  const { AiFillStar } = icons;
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className="max-w-[1420px] rounded-xl  bg-white py-8 px-10 flex  flex-col gap-4 items-center justify-center"
    >
      <img
        src={logo}
        alt="logo"
        className="max-w-[300px] object-contain my-4"
      />
      <h2 className="text-center font-medium text-lg">{`Đánh giá sản phẩm ${nameProduct}`}</h2>
      <textarea
        placeholder="Ghi nhận xét hồi của bạn"
        className="border-2 border-violet-700 p-2 rounded-xl outline-none w-full "
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="flex  flex-col w-full gap-4 ">
        <p className="text-lg">Cảm nhận của bạn về sản phẩm?</p>
        <span className="flex  gap-4">
          {VoteOptions.map((el) => (
            <div
              key={el.id}
              className="p-4 flex flex-col items-center cursor-pointer  "
              onClick={() => {
                setChooseStar(el.id);
                setScore(el.id);
              }}
            >
              {Number(chooseStar) && chooseStar >= el.id ? (
                <AiFillStar color="gold" size={24}></AiFillStar>
              ) : (
                <AiFillStar color="gray" size={24}></AiFillStar>
              )}

              <span className="text-sm text-center">{el.text}</span>
            </div>
          ))}
        </span>
      </div>
      <Button
        fw
        handleOnClick={() => {
          handleSubmitVote({ comment, score });
        }}
      >
        Bình luận
      </Button>
    </div>
  );
};

export default memo(VoteOption);
