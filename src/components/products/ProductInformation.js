import React, { memo, useEffect, useState, useCallback } from "react";
import { productInfoTab } from "../../ultils/contants";
import { VoteBar, Button, VoteOption } from "../";
import { renderStarFromNumber } from "../../ultils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import { apiRatings } from "../../apis";
import Swal from "sweetalert2";
import path from "../../ultils/path";
import { useNavigate } from "react-router-dom";
import Comment from "../Vote/Comment";

const ProductInformation = ({
  totalRatings,
  ratings,
  nameProduct,
  pid,
  rerender,
}) => {
  const navigate = useNavigate();
  const [activedTab, setActivedTab] = useState(1);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  const handleSubmitVote = async ({ comment, score }) => {
    if (!comment || !pid || !score) {
      alert("Đánh giá chưa được hoàn thành");
      return;
    }
    await apiRatings({ star: score, comment, pid, updatedAt: Date.now() });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    rerender();
  };
  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        confirmButtonText: "Go login",
        title: "Oop!",
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVote={handleSubmitVote}
            ></VoteOption>
          ),
        })
      );
    }
  };
  return (
    <div>
      {/* <div className=" mt-4 mx-4 flex items-center gap-2 relative bottom-[-4px] ">
        {productInfoTab.map((el) => (
          <span
            className={`p-2 cursor-pointer rounded-xl text-[18px] font-medium px-4 border-4   hover:text-violet-700 hover:bg-white ${
              activedTab === el.id
                ? "text-violet-700 border-violet-500 bg-white"
                : "border-gray-300"
            }`}
            key={el.id}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="w-full border-2   p-4">
        {productInfoTab.some((el) => el.id === activedTab) &&
          productInfoTab[activedTab - 1]?.content}
      </div> */}
      <div className=" border-2">
        <div className="flex px-2 text-[24px] gap-8 pb-4 mt-4 border-b-4  border-violet-700 font-semibold uppercase">
          Review
        </div>
        <div className="flex  flex-col">
          <div className="flex p-4">
            <div className="flex-4 flex flex-col items-center justify-center border border-violet-500">
              <span className="font-medium text-3xl">
                {`${totalRatings}/5`}{" "}
              </span>
              <span className="flex items-center gap-1">
                {renderStarFromNumber(totalRatings)?.map((el, index) => (
                  <span key={index}>{el}</span>
                ))}
              </span>
              <span>{`${ratings?.length} đánh giá`} </span>
            </div>
            <div className="flex-6 flex gap-2 flex-col p-4">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <VoteBar
                    key={el}
                    number={el + 1}
                    ratingCount={
                      ratings?.filter((i) => i.star === el + 1)?.length
                    }
                    raitingTotal={ratings?.length}
                  ></VoteBar>
                ))}
            </div>
          </div>
          <div className="p-4 flex items-center justify-center flex-col gap-2">
            <span>Đánh giá sản phẩm này?</span>
            <Button handleOnClick={handleVoteNow}>Đánh giá</Button>
          </div>
          <div>
            {ratings?.map((el) => (
              <Comment
                key={el.id}
                star={el.star}
                updatedAt={el.updatedAt}
                comment={el.comment}
                name={`${el.postedBy?.lastName} ${el.postedBy?.firstName}`}
              ></Comment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductInformation);
