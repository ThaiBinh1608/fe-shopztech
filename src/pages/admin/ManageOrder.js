import React, { useCallback, useEffect, useState, PureComponent } from "react";
import {
  apiGetOrders,
  apiGetUserOrders,
  apiUpdateStatusOrders,
  apideleteOrders,
} from "../../apis";
import {
  Button,
  CustomSelect,
  InputForm,
  Pagination,
  Select,
} from "../../components";
import { useForm } from "react-hook-form";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { ConvertDataChart, formatmoney } from "../../ultils/helpers";
import { statusOrder } from "../../ultils/contants";
import withBase from "../../hocs/withBase";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useDebounce from "../../hooks/useDebounce";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
const ManageOrder = ({ navigate, localtion }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm({});
  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const [update, setUpdate] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const [params] = useSearchParams();
  const fetchOrder = async (params) => {
    const response = await apiGetOrders({
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
  }, [params, update]);

  // const queriesDebounce = useDebounce(watch("q"), 1000);
  // useEffect(() => {
  //   if (queriesDebounce) {
  //     navigate({
  //       pathname: localtion.pathname,
  //       search: createSearchParams({ q: queriesDebounce }).toString(),
  //     });
  //   } else
  //     navigate({
  //       pathname: localtion.pathname,
  //     });
  // }, [queriesDebounce]);
  // const handleSearchStatus = ({ value }) => {
  //   navigate({
  //     pathname: localtion.pathname,
  //     search: createSearchParams({ status: value }).toString(),
  //   });
  // };
  const handleUpdate = async (data) => {
    const response = await apiUpdateStatusOrders(data, editOrder._id);
    if (response.success) {
      setEditOrder(null);
      render();
      toast.success(response.mes);
    } else {
      toast.error(response.mes);
    }
  };

  const handleDeleteOrder = (oid) => {
    Swal.fire({
      title: "Are you sure remove this order ?",
      // text: "Are you ready remove this user ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apideleteOrders(oid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };
  console.log(orders);

  const dataChart = ConvertDataChart(orders, "pay");
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full  px-2">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-2 ">
        <span>Order</span>
      </h1>
      <div className="w-[230px] h-[230px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={dataChart}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dataChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span className="text-lg font-semibold mb-4">
          Phương thức thanh toán
        </span>
      </div>

      <form onSubmit={handleSubmit(handleUpdate)}>
        {editOrder && <Button type="submit">Update</Button>}
        <table className="table-auto mb-6 text-left w-full">
          <thead className="font-bold bg-gray-800 text-white  text-[13px] ">
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
              <th className="py-1 px-2 border-2 border-gray-500 text-center ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((el, idx) => (
              <tr
                key={el._id}
                className="border-2 border-gray-500 text-center text-sm "
              >
                <td className="py-1 px-2 ">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_LIMIT +
                    idx +
                    1}
                </td>
                <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                  <span className="flex flex-col ">
                    {el.products?.map((item) => (
                      <span
                        className="text-start py-1"
                        key={item._id}
                      >{`•${item.title}-${item.color}-${item.quantity}`}</span>
                    ))}
                  </span>
                </td>
                <td className="py-1 px-1 border-2 border-gray-500 text-center  ">
                  {`${formatmoney(el.total * 23500)} VND`}
                </td>
                <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                  {editOrder?._id === el._id ? (
                    <Select
                      register={register}
                      fullwidth
                      errors={errors}
                      defaultValue={el.status}
                      id={"status"}
                      validate={{ required: "Required fill" }}
                      options={statusOrder}
                    />
                  ) : (
                    <span> {el.status}</span>
                  )}
                </td>

                <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                  {el.pay}
                </td>
                <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="py-1 px-1 ">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>

      <div className="w-full flex items-center justify-center">
        <Pagination totalCount={counts}></Pagination>
      </div>
    </div>
  );
};

export default withBase(ManageOrder);
