import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb, Button } from "../../components";
import withBase from "../../hocs/withBase";
import { formatmoney } from "../../ultils/helpers";
import OrderItem from "../../components/products/OrderItem";
import { Link, createSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";

const DetailCart = ({ location, navigate }) => {
  const { current, currentCart } = useSelector((state) => state.user);
  const handleSubmit = () => {
    if (!current?.address) {
      return Swal.fire({
        icon: "infor",
        title: "Thông báo",
        text: "Bạn phải cập nhật địa chỉ để thanh toán",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Cập nhật",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate({
            pathname: `/${path.MEMBER}/${path.PERSONAL}`,
            // search: createSearchParams({
            //   redirect: location.pathname,
            // }).toString(),
          });
        }
      });
    } else if (current?.cart?.length === 0) {
      return Swal.fire({
        icon: "infor",
        title: "Thông báo",
        text: "Bạn chưa có sản phẩm nào trong giỏ hàng",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Thêm sản phẩm",
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    } else {
      navigate(`/${path.CHECKOUT}`);
    }
  };

  return (
    <div className="w-full">
      <div className="h-[81px] flex flex-col px-4 bg-violet-100">
        <h3 className="text-[24px] font-semibold ">Chi tiết giỏ hàng</h3>
        {/* <Breadcrumb category={location?.pathname}></Breadcrumb> */}
      </div>
      <div className="flex flex-col  border-2 border-black mb-8  ">
        <div className="w-full mx-auto bg-gray-800 text-white  py-3 border-b-2 border-black font-bold grid grid-cols-10">
          <span className="col-span-5  w-full text-center">Product</span>
          <span className="col-span-1  max-sm:col-span-2  w-full text-center">
            Quantity
          </span>
          <span className="col-span-4  max-sm:col-span-3  w-full text-center">
            Price
          </span>
        </div>
        {current?.cart?.map((el) => (
          <OrderItem
            key={el?._id}
            el={el}
            defaultQuantity={el?.quantity}
            color={el?.color}
            title={el?.title}
            thumbnail={el?.thumbnail}
            price={el?.price}
            pid={el?.product?._id}
          ></OrderItem>
        ))}
      </div>
      <div className="flex flex-col justify-center items-end gap-3 mx-4 my-8">
        <span>
          <span className="p-1 font-semibold">Tổng tiền:</span>
          <span className="text-lg font-semibold text-red-500 p-1">{`${formatmoney(
            currentCart?.reduce(
              (sum, el) => sum + Number(el?.price) * el?.quantity,
              0
            )
          )} VND`}</span>
        </span>

        <Button handleOnClick={handleSubmit}>Thanh toán</Button>
      </div>
    </div>
  );
};

export default withBase(DetailCart);
