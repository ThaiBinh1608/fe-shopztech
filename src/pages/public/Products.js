import React, { useState, useEffect, useCallback } from "react";
import {
  useNavigate,
  createSearchParams,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  Product,
  SearchItem,
  InputSelect,
  Pagination,
  InputForm,
} from "../../components";
import { apiGetProducts } from "../../apis";
import { sorts } from "../../ultils/contants";
import Masonry from "react-masonry-css";
import useDebounce from "../../hooks/useDebounce";
import { useForm } from "react-hook-form";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm({});
  const fetchProductsByCategory = async (queries) => {
    if (category && category !== "products") queries.category = category;
    const response = await apiGetProducts({
      ...queries,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setProducts(response);
  };
  const queriesDebounce = useDebounce(watch("q"), 1000);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (queries.from && queries.to) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.from;
    delete queries.to;
    if (queriesDebounce) {
      queries.q = queriesDebounce;
    }
    const q = { ...priceQuery, ...queries };

    fetchProductsByCategory(q);
    window.scrollTo(0, 0);
  }, [params]);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);

  return (
    <div className="w-full ">
      <div className=" flex flex-col px-4 ">
        <h3 className="text-[24px] font-semibold uppercase ">
          {category !== ":category" ? category : "Products"}
        </h3>
        <Breadcrumb category={category} className=""></Breadcrumb>
        <form className="w-full my-2  ">
          <InputForm
            id="q"
            register={register}
            fullwidth
            errors={errors}
            placeholder="Tìm theo tên, thể loại, nhãn hiệu sản phẩm..."
          ></InputForm>
        </form>
      </div>
      <div className="max-w-[1420px] m-auto rounded-xl  bg-violet-200  mt-2 p-4 flex justify-between items-center">
        <div className="w-auto flex-auto flex  flex-col ">
          <span className="font-semibold text-lg mb-1">Filter by:</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            ></SearchItem>
            <SearchItem
              name="color"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
            ></SearchItem>
          </div>
        </div>
        <div className="w-auto flex flex-col">
          <span className="font-semibold text-lg mb-1">Sort by:</span>
          <div className="w-full p-2">
            <InputSelect
              changeValue={changeValue}
              value={sort}
              options={sorts}
            ></InputSelect>
          </div>
        </div>
      </div>
      <div className="max-w-[1420px] m-auto mt-8 ">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((el) => (
            <Product
              key={el._id}
              pid={el._id}
              productData={el}
              normal={true}
            ></Product>
          ))}
        </Masonry>
      </div>

      <div className="max-w-[1420px] m-auto mt-4 flex items-center justify-center ">
        <Pagination totalCount={products?.counts}></Pagination>
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Products;
