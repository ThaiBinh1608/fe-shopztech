import React, { memo } from "react";

const Footer = () => {
  return (
    <div className="w-full  ">
      <div className=" w-full h-auto py-10 bg-violet-400 flex flex-wrap justify-center items-center">
        <div className="w-full  px-4 flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-lg text-gray-800">
              ĐĂNG KÝ ĐỂ NHẬN THÔNG BÁO KHUYẾN MÃI
            </span>
            {/* <span className="text-gray-800">
              Đăng ký tài khoản để nhận thông báo các chương trình khuyến mãi
              của shop
            </span> */}
          </div>
          <input
            type="text"
            placeholder="Email"
            className=" p-2 bg-slate-200 flex-1 rounded-l-full rounded-r-full outline-none placeholder:opacity-50"
          />
          <button className=" mx-2 px-3 py-2 bg-white  rounded-l-full rounded-r-full font-medium hover:text-violet-700">
            SEND
          </button>
        </div>
      </div>
      <div className=" w-full py-4 h-auto bg-gray-800 flex items-center justify-center text-white ">
        <div className="w-full flex  px-4">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4  border-violet-700 pl-[15px] ">
              ABOUT US
            </h3>
            <span>
              <span>Địa chỉ: </span>
              <span className="opacity-70">
                đường Bạch Đằng quận Bình Thạnh TP.HCM
              </span>
            </span>
            <span>
              <span>SDT: </span>
              <span className="opacity-70">0909090909</span>
            </span>
            <span>
              <span>EMAIL: </span>
              <span className="opacity-70">hakaioxyz@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4  border-violet-700 pl-[15px] ">
              INFORMATION
            </h3>
            <span className="opacity-70">Typography</span>
            <span className="opacity-70">Gallery</span>
            <span className="opacity-70">Store Location</span>
            <span className="opacity-70">Today's Deals</span>
            <span className="opacity-70">Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[12px] font-medium border-l-4  border-violet-700 ">
              WHO WE ARE?
            </h3>
            <span className="opacity-70">Help</span>
            <span className="opacity-70">Free Shipping</span>
            <span className="opacity-70">FAQs</span>
            <span className="opacity-70">Return & Exchange</span>
            <span className="opacity-70">Testimonials</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
