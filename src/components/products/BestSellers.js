import React, { memo, useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { Product, CustomSlider, Loading } from "..";
import { getNewProducts } from "../../store/products/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import Swal from "sweetalert2";
const tabs = [
  { id: 1, name: "Bán nhiều nhất" },
  { id: 2, name: "sản phẩm mới" },
];

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [activedTab, setActivedTab] = useState(1);
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const { newProducts } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    // Swal.fire({
    //   icon: "infor",
    //   title: "Thông báo",
    //   text: "Quá trình tải dữ liệu sẽ mất chút thời gian, xin vui lòng đợi một chút và tải lại trang",
    // });
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetProducts({ sort: "-sold" });
    if (response.success) {
      setBestSellers(response.products);
      setProducts(response.products);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
    }
  };
  useEffect(() => {
    fetchProducts();
    dispatch(getNewProducts());
    // Đặt interval để gửi yêu cầu đến server mỗi 5 giây (5000ms)
    const intervalId = setInterval(() => {
      fetchProducts();
    }, 60000);

    // Hủy interval khi component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);
  useEffect(() => {
    if (activedTab === 1) setProducts(bestSellers);
    if (activedTab === 2) setProducts(newProducts);
  }, [activedTab]);

  return (
    <div>
      <div className="flex text-[16px] gap-4 pb-2 border-b-4  border-violet-700">
        {tabs.map((el) => (
          <span
            key={el.id}
            className={`font-semibold uppercase border-r cursor-pointer ${
              activedTab === el.id ? "text-violet-700" : ""
            } `}
            onClick={() => setActivedTab(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="pt-4  ">
        <CustomSlider
          products={products}
          activedTab={activedTab}
        ></CustomSlider>
      </div>
      <div className="w-full px-4 flex    max-sm:flex-col   max-sm:px-0  gap-4 mt-8">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className=" w-[50%]
          max-sm:w-full flex-1 object-contain"
        />
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
          alt=""
          className=" w-[50%]   max-sm:w-full   flex-1 object-contain"
        />
      </div>
    </div>
  );
};

export default memo(BestSellers);
