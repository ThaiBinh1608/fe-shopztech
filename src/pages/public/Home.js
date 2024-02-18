import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Banner,
  Sidebar,
  BestSellers,
  FeatureProducts,
  CustomSlider,
  DealDaily,
  Loading,
} from "../../components";
import icons from "../../ultils/icons";
import { apiGetProducts } from "../../apis";
import { showModal } from "../../store/app/appSlice";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  const { MdKeyboardArrowRight } = icons;
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetProducts({ sort: "-totalRatings" });
    if (response.success === true) {
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="  bg-violet-100 px-4 py-10 ">
      <div className="max-w-[1420px] m-auto flex ">
        <div className="flex flex-col gap-5 w-[35%] max-sm:w-[45%]  border">
          <Sidebar></Sidebar>
          <DealDaily></DealDaily>
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[65%] max-sm:w-[55%]  border">
          <Banner></Banner>
          <BestSellers></BestSellers>
        </div>
      </div>
      <div className="max-w-[1420px] m-auto my-8">
        <FeatureProducts></FeatureProducts>
      </div>
      <div className="my-8 max-w-[1420px] m-auto">
        <div className="flex  text-[24px] gap-8 pb-4 mt-4 border-b-4  border-violet-700 font-semibold uppercase">
          NEW ARRIVALS
        </div>
        <div className="pt-4  ">
          <div className="w-full">
            <CustomSlider products={newProducts}></CustomSlider>
          </div>
        </div>
      </div>
      {/* <div className="my-8 max-w-[1420px]  m-auto">
        <div className="flex text-[24px] gap-8 pb-4 mt-4 border-b-4  border-violet-700 font-semibold uppercase">
          HOT COLLECTIONS
        </div>
        <div className="flex flex-wrap max-sm:flex-col justify-center items-center mt-4 ">
          {categories?.map((el) => (
            <div key={el._id} className="w-[24%] max-sm:w-full">
              <div className="border-4 flex  gap-2 min-h-[230px] ">
                <img
                  src={el?.image}
                  alt=""
                  className="  w-[144px] h-[129px]  flex-1 object-cover "
                />
                <div className="flex-1">
                  <h4 className="capitalize font-semibold text-[16px]">
                    {el?.title}
                  </h4>
                  <ul className="text-[14px]">
                    {el?.brand.map((item) => (
                      <div
                        key={item}
                        className="flex cursor-pointer hover:underline items-center p-1 "
                      >
                        <MdKeyboardArrowRight></MdKeyboardArrowRight>
                        <li>{item}</li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="max-w-[1420px] m-auto my-8 ">
        <div className="flex text-[24px] gap-8 pb-4 mt-4 border-b-4  border-violet-700 font-semibold uppercase">
          BLOG POST
        </div>
      </div> */}
    </div>
  );
};

export default Home;
