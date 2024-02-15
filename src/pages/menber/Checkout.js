import React, { useEffect, useState } from "react";
import images from "../../assets/images/payment.svg";
import { useSelector } from "react-redux";
import { formatPrice, formatmoney } from "../../ultils/helpers";
import { Button, Congrat, Paypal } from "../../components";
import { apiCreateOrder } from "../../apis";
import Swal from "sweetalert2";
import withBase from "../../hocs/withBase";
import { getCurrent } from "../../store/user/asyncAction";

const Checkout = ({ disPath, navigate }) => {
  const { currentCart, current } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (isSuccess) disPath(getCurrent());
  }, [isSuccess]);

  const handlePay = async () => {
    const response = await apiCreateOrder({
      products: currentCart,
      total: Math.round(
        +currentCart?.reduce(
          (sum, el) => sum + Number(el?.price) * el?.quantity,
          0
        ) / 23500
      ),
      address: current?.address,
    });
    if (response.success) {
      setIsSuccess(true);
      Swal.fire("Thành công!!!", "Đơn hàng đã được tạo", "success").then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className=" flex h-full w-full max-sm:flex-col max-h-screen overflow-y-auto gap-6">
      <div className="w-[40%] max-sm:w-full flex justify-center items-center ">
        <img src={images} alt="" className="h-[80%] object-contain" />
      </div>

      <div className="flex   w-[60%] max-sm:w-full max-sm:m-0 items-center justify-center flex-col gap-6 m-4">
        {isSuccess && <Congrat></Congrat>}
        <h2 className="font-bold text-2xl p-2">Thanh toán</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="border-2  bg-violet-200">
              <th className=" text-left p-2">Sản phẩm</th>
              <th className=" text-center p-2">Số lượng</th>
              <th className=" text-right p-2">Giá</th>
            </tr>
          </thead>
          <tbody>
            {currentCart?.map((el) => (
              <tr className="border" key={el?._id}>
                <td className=" text-left p-2">{el.title}</td>
                <td className=" text-center p-2">{el.quantity}</td>
                <td className=" text-right p-2">{`${formatmoney(
                  formatPrice(el?.price)
                )} VND`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <span>
          <span className="p-1 font-semibold">Tổng tiền:</span>
          <span className="text-lg font-semibold text-red-500 p-1">{`${formatmoney(
            currentCart?.reduce(
              (sum, el) => sum + Number(el?.price) * el?.quantity,
              0
            )
          )} VND`}</span>
        </span>
        <span>
          <span className="p-1 font-semibold">Địa chỉ:</span>
          <span className="text-lg font-semibold text-red-500 p-1">
            {current?.address}
          </span>
        </span>
        <div className="w-full px-8"></div>

        <div className=" flex flex-col ">
          <div className="py-2">
            <Button fw handleOnClick={handlePay}>
              Thanh toán khi nhận hàng
            </Button>
          </div>
          <Paypal
            payload={{
              products: currentCart,
              total: Math.round(
                +currentCart?.reduce(
                  (sum, el) => sum + Number(el?.price) * el?.quantity,
                  0
                ) / 23500
              ),
              address: current?.address,
            }}
            setIsSuccess={setIsSuccess}
            amount={Math.round(
              +currentCart?.reduce(
                (sum, el) => sum + Number(el?.price) * el?.quantity,
                0
              ) / 23500
            )}
          ></Paypal>
        </div>
      </div>
    </div>
  );
};

export default withBase(Checkout);
