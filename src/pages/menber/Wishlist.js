import React from "react";
import { useSelector } from "react-redux";
import { Product, ProductCard } from "../../components";

const Wishlist = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div className="w-full  px-2">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-semibold px-2 ">
        <span>Danh sách yêu thích</span>
      </h1>
      <div className="flex gap-1 flex-wrap">
        {current?.wishlist?.map((el) => (
          <div key={el._id}>
            <Product
              pid={el._id}
              productData={el}
              className="max-w-[240px] max-h-[320px]"
            ></Product>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
