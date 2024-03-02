import React, { useEffect, useState } from "react";
import { apiGetUserOrders } from "../../apis";
import { CustomSelect, InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { formatmoney } from "../../ultils/helpers";
import { statusOrder } from "../../ultils/contants";
import withBase from "../../hocs/withBase";

const History = ({ navigate, localtion }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({});
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [params] = useSearchParams();
  // const q = watch("q");
  // const status = watch("status");
  const fetchOrder = async (params) => {
    const response = await apiGetUserOrders({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };

  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrder(pr);
  }, [params]);
  const handleSearchStatus = ({ value }) => {
    navigate({
      pathname: localtion.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };
 
  return (
    <div className="w-full  px-2">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-2 ">
        <span>Lịch sử mua hàng</span>
      </h1>
      {/* <div className="w-full px-1 ">
        <div className="flex w-full items-center pb-2  justify-end ">
          <form className="w-[50%] grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <InputForm
                id="q"
                register={register}
                fullwidth
                errors={errors}
                placeholder="Search..."
              ></InputForm>
            </div>
            <CustomSelect
              options={statusOrder}
              value={status}
              onChange={(val) => handleSearchStatus(val)}
              classname="col-span-1"
            ></CustomSelect>
          </form>
        </div>
      </div> */}
      <table className="table-auto mb-6 text-left  w-full">
        <thead className="font-bold bg-gray-800 text-white  ">
          <tr className="border-2 border-gray-500">
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              #
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Sản phẩm
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Tổng tiền
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Trạng thái
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Thanh toán
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Thời gian
            </th>
            {/* <th className="py-1 px-2 border-2 border-gray-500 ">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {orders?.map((el, idx) => (
            <tr key={el._id} className="border-2 border-gray-500 text-center  ">
              <td className="py-1 px-2 ">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                <span className="flex flex-col ">
                  {el.products?.map((item) => (
                    <span className="text-start py-1" key={item._id}>
                      <span className="flex flex-col">
                        <span className="font-semibold">{item?.title}</span>
                        <span className="flex items-center text-xs ga-2">
                          <span className="font-semibold">Số lượng:</span>
                          <span className="">{item?.quantity}</span>
                        </span>
                      </span>
                    </span>
                  ))}
                </span>
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center  ">
                {`${formatmoney(el.total * 23500)} VND`}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.status}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.pay}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              {/* <td className="py-1 px-1 ">
                <span
                  onClick={() => setEditOrder(el)}
                  className="px-1 hover:text-yellow-500 hover:underline cursor-pointer"
                >
                  Edit
                </span>
                <span
                  onClick={() => handleDeleteOrder(el._id)}
                  className="px-1 hover:text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex items-center justify-center">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default withBase(History);
