import React, { useCallback, useEffect, useState } from "react";
import { apiGetProducts, apiDeleteProduct } from "../../apis/product";
import moment from "moment";
import { InputForm, Pagination, Varrians } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProduct from "./UpdateProduct";
const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({});
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);
  const [customizeVarrians, setCustomizeVarrians] = useState(null);

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  const [counts, setCounts] = useState(0);
  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setProducts(response.products);
      setCounts(response.counts);
    }
  };
  const queriesDebounce = useDebounce(watch("q"), 1000);
  useEffect(() => {
    if (queriesDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queriesDebounce }).toString(),
      });
    } else
      navigate({
        pathname: location.pathname,
      });
  }, [queriesDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);

    fetchProducts(searchParams);
  }, [params, update]);
  const handleDeleteProduct = (pid) => {
    Swal.fire({
      title: "Are you sure remove this product ?",
      // text: "Are you ready remove this user ?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) {
          render();
          toast.success(response.mes);
        } else {
          toast.error(response.mes);
        }
      }
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 relative ">
      {editProduct && (
        <div className="absolute inset-0 w-full  h-full  z-40 bg-gray-200">
          <UpdateProduct
            editProduct={editProduct}
            render={render}
            setEditProduct={setEditProduct}
          ></UpdateProduct>
        </div>
      )}
      {customizeVarrians && (
        <div className="absolute inset-0  h-full  z-50 bg-gray-200">
          <Varrians
            customizeVarrians={customizeVarrians}
            render={render}
            setCustomizeVarrians={setCustomizeVarrians}
          ></Varrians>
        </div>
      )}
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-4 ">
        <span>Manage Product</span>
      </h1>
      <div className="w-full px-1 ">
        <div className="flex w-full items-center   justify-end ">
          <form className="w-[45%]">
            <InputForm
              id="q"
              register={register}
              fullwidth
              errors={errors}
              placeholder="Search product by title, description,..."
            ></InputForm>
          </form>
        </div>
      </div>
      <table className="table-auto mb-6 text-left w-full">
        <thead className="font-bold bg-gray-800 text-white  text-[13px] ">
          <tr className="border-2 border-gray-500">
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Order
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Thumb
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Title
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Brand
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Category
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Price
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Quantity
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Sold
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Color
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Varriants
            </th>
            <th className="py-1 px-2 border-2 border-gray-500  text-center">
              Total Raitings
            </th>
            <th className="py-1 px-2 border-2 border-gray-500 ">UpdateAt</th>
            <th className="py-1 px-2 border-2 border-gray-500 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, idx) => (
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
                <img src={el.thumb} alt="" className="w-12 h-12 object-cover" />
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center  ">
                {el.title}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.brand}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.category}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.price}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.quantity}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.sold}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.color}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el?.Varrians?.length || 0}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {el.totalRatings}
              </td>
              <td className="py-1 px-1 border-2 border-gray-500 text-center ">
                {moment(el.createdAt).format("DD/MM/YYYY")}
              </td>
              <td className="py-1 px-1 ">
                <span
                  onClick={() => setEditProduct(el)}
                  className="px-1 hover:text-yellow-500 hover:underline cursor-pointer"
                >
                  Edit
                </span>
                <span
                  onClick={() => setCustomizeVarrians(el)}
                  className="px-1 hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Varrian
                </span>
                <span
                  onClick={() => handleDeleteProduct(el._id)}
                  className="px-1 hover:text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </span>
              </td>
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
export default ManageProducts;
