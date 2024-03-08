import React, { useCallback, useEffect, useRef, useState } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts, apiUpdateCart } from "../../apis";
import * as DOMPurify from "dompurify";
import {
  Breadcrumb,
  Button,
  SelectQuantity,
  ExtraInfor,
  ProductInformation,
  CustomSlider,
} from "../../components";
import Slider from "react-slick";
import {
  formatPrice,
  formatmoney,
  renderStarFromNumber,
} from "../../ultils/helpers";
import { productExtraInfo } from "../../ultils/contants";
import clsx from "clsx";
import Swal from "sweetalert2";
import withBase from "../../hocs/withBase";
import path from "../../ultils/path";
import { toast } from "react-toastify";
import { getCurrent } from "../../store/user/asyncAction";
import { useSelector } from "react-redux";
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};
const DetailProduct = ({ navigate, disPath, localtion }) => {
  const titleRef = useRef();
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedproduct, setRelatedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [update, setUpdate] = useState(false);
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response.success) {
      setProduct(response.productData);
      setCurrentImage(response.productData?.thumb);
    }
  };
  const [varriants, setVarriants] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    price: "",
    thumb: "",
    images: [],
    color: "",
  });

  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    setRelatedProduct(response.products);
  };
  useEffect(() => {
    if (varriants) {
      setCurrentProduct({
        title: product?.varriants?.find((el) => el.sku === varriants)?.title,
        color: product?.varriants?.find((el) => el.sku === varriants)?.color,
        price: product?.varriants?.find((el) => el.sku === varriants)?.price,
        images: product?.varriants?.find((el) => el.sku === varriants)?.images,
        thumb: product?.varriants?.find((el) => el.sku === varriants)?.thumb,
      });
    } else {
      setCurrentProduct({
        title: product?.title,
        color: product?.color,
        price: product?.price,
        images: product?.images,
        thumb: product?.thumb,
      });
    }
  }, [varriants, product]);

  useEffect(() => {
    if (pid) {
      fetchProductData();
      fetchProducts();
    }
    window.scroll(0, 0);
    titleRef.current.scrollIntoView({ block: "start" });
  }, [pid]);
  useEffect(() => {
    if (pid) {
      fetchProductData();
    }
  }, [update]);
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleQuantity = (number) => {
    if (Number(number) > 1) {
      setQuantity(number);
    }
  };
  const handleChangeQuantity = (flag) => {
    if (flag === "minus" && quantity === 1) return;
    if (flag === "plus" && quantity === product?.quantity) return;
    if (flag === "minus") setQuantity((prev) => +prev - 1);
    if (flag === "plus") setQuantity((prev) => +prev + 1);
  };
  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };

  const { current, isLoggedIn } = useSelector((state) => state.user);
  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      return Swal.fire({
        title: "Oops!",
        text: "Bạn phải đăng nhập trước",
        icon: "info",
        confirmButtonText: "Đăng nhập",
        showConfirmButton: true,
        cancelButtonText: "Thoát",
        showCancelButton: true,
      }).then(async (rs) => {
        if (rs.isConfirmed)
          navigate({
            pathname: `/${path.LOGIN}`,
            search: createSearchParams({
              redirect: localtion.pathname,
            }).toString(),
          });
      });
    }
    const response = await apiUpdateCart({
      pid: product._id,
      color: currentProduct?.color || product?.color,
      quantity,
      price: currentProduct?.price || product?.price,
      thumbnail: currentProduct?.thumb || product?.thumb,
      title: currentProduct?.title || product?.title,
    });

    if (response.success) {
      toast.success(response.mes);
      disPath(getCurrent());
    } else {
      toast.error(response.mes);
    }
  };

  return (
    <div className="w-full">
      <div ref={titleRef} className="h-[81px] flex flex-col px-4 bg-violet-100">
        <h3 className="text-[24px] font-semibold ">
          {currentProduct?.title || product?.title}
        </h3>
        <Breadcrumb
          title={currentProduct?.title || product?.title}
          category={category}
        ></Breadcrumb>
      </div>
      {/* product */}
      <div className="max-w-[1420px] m-auto mt-4 flex  max-sm:flex-col h-full  ">
        <div className="w-[40%]  max-sm:w-full  flex flex-col  border-4 border-violet-700 rounded-xl">
          <div className="flex items-center justify-center w-full   ">
            <img
              src={
                currentProduct?.thumb ||
                currentImage ||
                "https://ingoodcompany.asia/images/products_attr_img/matrix/default.png"
              }
              alt=""
              className="w-[80%] max-w-[360px] max-h-[360px] h-[70%]  object-contain"
            />
          </div>

          <div className="w-full h-full my-1 ">
            <Slider
              {...settings}
              className="w-full h-full  flex items-center justify-center "
            >
              {currentProduct?.images?.length > 0
                ? currentProduct?.images?.map((el) => (
                    <img
                      src={el}
                      alt="sub-product"
                      className="w-[143px] h-[143px] py-2 cursor-pointer object-cover  "
                      onClick={(e) => handleClickImage(e, el)}
                    ></img>
                  ))
                : product?.images?.map((el) => (
                    <img
                      src={el}
                      alt="sub-product"
                      className="w-[143px] h-[143px] py-2 cursor-pointer object-cover  "
                      onClick={(e) => handleClickImage(e, el)}
                    ></img>
                  ))}
            </Slider>
          </div>
        </div>
        <div className="w-[30%]  max-sm:w-full p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-[30px] font-semibold text-red-500">
              {`${formatmoney(
                formatPrice(
                  currentProduct?.price ? currentProduct?.price : product?.price
                )
              )} VND`}
            </h2>
          </div>
          <div className="flex h-[16px]">
            {renderStarFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}

            <span className="text-red-500 font-medium mx-3">{`Đã bán: ${product?.sold}`}</span>
          </div>
          <ul className="pl-4 list-square text-sm ">
            {product?.description?.length > 1 &&
              product?.description?.map((el) => (
                <li className="leading-6" key={el}>
                  {el}
                </li>
              ))}
            {product?.description?.length === 1 && (
              <div
                className="text-sm line-clamp-[10] mb-8 "
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description[0]),
                }}
              ></div>
            )}
          </ul>
          <div className=" flex flex-col">
            <span className="text-[16px] font-semibold mr-3">Màu sắc:</span>
            <div className="flex flex-wrap gap-2">
              <div
                onClick={() => setVarriants(null)}
                className={clsx(
                  "flex p-2  border-2 items-center cursor-pointer gap-2",
                  !varriants && "border-violet-500"
                )}
              >
                <img
                  src={product?.thumb}
                  alt="thumb"
                  className="w-8 h-8  rounded-md object-cover"
                />
                <span className="flex flex-col">
                  <span className="text-base">{product?.color}</span>
                  <span className="text-sm">{product?.price}</span>
                </span>
              </div>
              {product?.varriants?.map((el) => (
                <div
                  key={el.sku}
                  onClick={() => setVarriants(el.sku)}
                  className={clsx(
                    "flex p-2  border-2 items-center cursor-pointer gap-2",
                    varriants === el.sku && "border-violet-500"
                  )}
                >
                  <img
                    src={el?.thumb}
                    alt="thumb"
                    className="w-8 h-8  rounded-md object-cover"
                  />
                  <span className="flex flex-col">
                    <span className="text-base">{el?.color}</span>
                    <span className="text-sm">{el?.price}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <span className=" font-medium">{`Kho: ${product?.quantity}`}</span>
          <div className="text-sm flex flex-col gap-8">
            <div className="flex items-center ">
              <span className="text-[18px] font-semibold mr-3">Số lượng:</span>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              ></SelectQuantity>
            </div>

            <Button handleOnClick={handleAddToCart} fw>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="w-[30%]  max-sm:w-full">
          {productExtraInfo.map((el) => (
            <ExtraInfor
              key={el.id}
              title={el.title}
              sub={el.sub}
              icon={el.icon}
            ></ExtraInfor>
          ))}
        </div>
      </div>
      {/* description */}
      <div className=" max-w-[1420px] m-auto mt-8">
        <ProductInformation
          totalRatings={product?.totalRatings}
          ratings={product?.ratings}
          nameProduct={product?.title}
          pid={product?._id}
          rerender={rerender}
        ></ProductInformation>
      </div>
      <div className="max-w-[1420px] m-auto">
        <div className="flex px-2 text-[24px] gap-8 pb-4 mt-4 border-b-4  border-violet-700 font-semibold uppercase">
          OTHER PRODUCT
        </div>
        <div className=" mt-4">
          <CustomSlider normal={true} products={relatedproduct}></CustomSlider>
        </div>
      </div>
      <div className="w-full h-[100px]"></div>
    </div>
  );
};

export default withBase(DetailProduct);
