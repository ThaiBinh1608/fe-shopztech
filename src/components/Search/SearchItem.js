import React, { memo, useEffect, useState } from "react";
import icons from "../../ultils/icons";
import { colors } from "../../ultils/contants";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import path from "../../ultils/path";
import { apiGetProducts } from "../../apis";
import { formatPrice } from "../../ultils/helpers";
import useDebounce from "../../hooks/useDebounce";
const { AiOutlineDown } = icons;
const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestPrice, setBestPrice] = useState(null);
  const [params] = useSearchParams();

  const handleSelect = (e) => {
    const aldreadyEl = selected.find((el) => el === e.target.value);
    if (aldreadyEl) {
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    } else setSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPriceProduct = async () => {
    const response = await apiGetProducts({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.products[0]?.price);
  };

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else delete queries.color;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);
  useEffect(() => {
    if (type === "input") fetchBestPriceProduct();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      alert("From price cannot greater than To price ");
  }, [price]);
  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
    <div
      className="p-2 cursor-pointer text-base  relative border-4 rounded-xl bg-white border-violet-700 flex justify-between items-center gap-5"
      onClick={() => changeActiveFilter(name)}
    >
      <span className="capitalize font-medium ">{name}</span>
      <AiOutlineDown></AiOutlineDown>
      {activeClick === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] rounded-xl  left-0 w-fit p-2 border-2 border-violet-700 bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div className="p-2 flex items-center justify-center gap-8">
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-violet-700"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-1"
              >
                {colors.map((el, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={el}
                      id={el}
                      onChange={handleSelect}
                      checked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label className="capitalize" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelected([]);
              }}
            >
              <div className="p-2 flex items-center justify-center gap-4">
                <span className="whitespace-nowrap">{`Giá cao nhất ${Number(
                  formatPrice(bestPrice)
                ).toLocaleString()} VND`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrice({ from: "", to: "" });
                    changeActiveFilter(null);
                  }}
                  className="underline cursor-pointer hover:text-violet-700"
                >
                  Reset
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center p-1 gap-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor="from">From</label>
                    <input
                      className="form-input border-2 border-gray-600"
                      type="number"
                      id="from"
                      value={price.from}
                      onChange={(e) =>
                        setPrice((prev) => ({ ...prev, from: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center p-1 gap-1">
                  <div className="flex items-center gap-2">
                    <label htmlFor="to">To</label>
                    <input
                      className="form-input border-2 border-gray-600"
                      type="number"
                      id="to"
                      value={price.to}
                      onChange={(e) =>
                        setPrice((prev) => ({ ...prev, to: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
