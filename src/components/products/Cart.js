import React, { memo } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import withBase from "../../hocs/withBase";
import { showCart, showModal } from "../../store/app/appSlice";
import { useSelector } from "react-redux";
import { formatmoney } from "../../ultils/helpers";
import Button from "../button/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { apiRemoveCart } from "../../apis";
import { getCurrent } from "../../store/user/asyncAction";
import { toast } from "react-toastify";
import path from "../../ultils/path";
const Cart = ({ disPath, navigate }) => {
  const { currentCart } = useSelector((state) => state.user);
  const removeCart = async (pid, color) => {
    const response = await apiRemoveCart(pid, color);
    if (response.success) {
      disPath(getCurrent());
    } else {
      toast.error(response.mes);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className=" max-sm:w-full w-[400px] overflow-hidden h-screen bg-violet-200 grid grid-rows-10  "
    >
      <h3 className=" border-b-4 px-2 border-gray-800 items-center font-bold w-full text-xl flex justify-between  row-span-1 h-full">
        <span>Your Cart</span>
        <span onClick={() => disPath(showCart())} className="cursor-pointer">
          <AiFillCloseCircle size={28}></AiFillCloseCircle>
        </span>
      </h3>
      <section className=" gap-3 flex flex-col max-sm:row-span-5  row-span-7 h-full max-h-full overflow-y-auto p-3">
        {!currentCart && (
          <span className="text-sm">Bạn chưa có sản phẩm nào</span>
        )}
        {currentCart &&
          currentCart?.map((el) => (
            <div
              key={el._id}
              className="flex gap-2 w-full border-b-2 justify-between border-gray-400"
            >
              <div className="flex  gap-2 ">
                <img
                  src={el?.thumbnail || el?.product?.thumb}
                  alt=""
                  className="w-16 h-16 object-cover"
                />
                <div className="flex flex-col gap-1 ">
                  <span className="font-semibold">{el?.title}</span>
                  <span className="text-xs">{el?.color}</span>
                  <span className="text-xs">{`Số lượng: ${el?.quantity}`}</span>
                  <span className="text-lg text-red-500">{`${formatmoney(
                    el?.price
                  )} VND`}</span>
                </div>
              </div>
              <span
                onClick={() => removeCart(el.product?._id, el.color)}
                className="flex items-center hover:text-violet-500 "
              >
                <RiDeleteBin5Line size={24}></RiDeleteBin5Line>
              </span>
            </div>
          ))}
      </section>
      <div className=" row-span-2   max-sm:row-span-4  flex flex-col h-full ">
        <div className="flex items-center  justify-between border-t-4 border-black">
          <span className="p-1 font-semibold">Tổng tiền:</span>
          <span className="text-lg text-red-500 p-1">{`${formatmoney(
            currentCart?.reduce(
              (sum, el) => sum + Number(el?.price) * el.quantity,
              0
            )
          )} VND`}</span>
        </div>
        <div
          onClick={() => {
            disPath(showCart());
            navigate(`/${path.MEMBER}/${path.CARTS}`);
          }}
          className="flex justify-center items-center"
        >
          <Button>Đến giỏ hàng</Button>
        </div>
      </div>
    </div>
  );
};

export default withBase(memo(Cart));
