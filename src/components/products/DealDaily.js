import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { apiGetProducts } from "../../apis/product";
import {
  formatmoney,
  renderStarFromNumber,
  secondsToHms,
} from "../../ultils/helpers";
import { Countdown } from "..";
import { useSelector } from "react-redux";
import moment from "moment";
import withBase from "../../hocs/withBase";
import { getDealDaily } from "../../store/products/productSlice";

const { AiFillStar, HiOutlineMenu } = icons;

const DealDaily = ({ disPath }) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  const { dealDaily } = useSelector((state) => state.products);
  let idInterval;
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      sort: "-totalRatings",
      limit: 10,
    });
    if (response.success) {
      const pr = response.products[Math.round(Math.random() * 10)];
      disPath(
        getDealDaily({ data: pr, time: Date.now() + 24 * 60 * 60 * 1000 })
      );
      // const today = `${moment().format("MM/DD/YYYY")}`;
      // const h = 23 - new Date().getHours();
      // const m = 59 - new Date().getMinutes();
      // const s = 59 - new Date().getSeconds();
      // setHour(h);
      // setMinute(m);
      // setSecond(s);
    }
    // else {
    //   setHour(0);
    //   setMinute(59);
    //   setSecond(59);
    // }
  };

  // useEffect(() => {
  //   fetchDealDaily();
  // }, []);
  useEffect(() => {
    if (dealDaily?.time) {
      const deltaTime = dealDaily?.time - Date.now();
      const number = secondsToHms(deltaTime);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    }
  }, [dealDaily]);
  useEffect(() => {
    idInterval && clearInterval(idInterval);
    if (moment(moment(dealDaily?.time).format("MM/DD/YYYY")).isBefore(moment()))
      fetchDealDaily();
  }, [expireTime]);
  useEffect(() => {
    let idInterval = setInterval(() => {
      if (second > 0) setSecond((prev) => prev - 1);
      else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(60);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(59);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  return (
    <div className="border-4  border-violet-700 bg-white rounded-xl w-full flex-auto">
      <div className="flex items-center justify-center text-red-500 p-2 w-full">
        <span className=" ">
          <AiFillStar size={24}></AiFillStar>
        </span>
        <span className="font-bold text-[24px]">DEAL DAILY</span>
      </div>
      <div className="w-full flex flex-col items-center">
        <img
          src={
            dealDaily?.data?.thumb ||
            "https://ingoodcompany.asia/images/products_attr_img/matrix/default.png"
          }
          alt=""
          className="w-[50%] h-[50%] object-contain"
        />
        <div className="flex flex-col text-[16px] font-semibold pb-2 mt-[10px] items-center gap-1 w-full">
          <span className="flex h-[16px]">
            {renderStarFromNumber(dealDaily?.data?.totalRatings)?.map(
              (el, index) => (
                <span key={index}>{el}</span>
              )
            )}
          </span>
          <span className="line-clamp-1">{dealDaily?.data?.title}</span>
          <span className="text-red-500">{`${formatmoney(
            dealDaily?.data?.price
          )} VND`}</span>
        </div>
      </div>
      <div className="">
        <div className="flex text-[14px]  m-4 items-center justify-center gap-2">
          <Countdown unit="Hours" number={hour}></Countdown>
          <Countdown unit="Minute" number={minute}></Countdown>
          <Countdown unit="Seconds" number={second}></Countdown>
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full h-[52px] border-2 text-[16px] font-medium text-white bg-violet-500 border-violet-700 py-2 "
        >
          <HiOutlineMenu></HiOutlineMenu>
          <span>Option</span>
        </button>
      </div>
    </div>
  );
};

export default withBase(memo(DealDaily));
