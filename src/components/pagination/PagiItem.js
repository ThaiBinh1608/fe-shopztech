import React, { memo } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={clsx(
        " p-2  flex  justify-center w-10 h-10 ",
        !Number(children) && "items-end pb-2",
        Number(children) &&
          "items-center  hover:rounded-full hover:bg-violet-200 ",
        +params.get("page") === children && "rounded-full bg-violet-200",
        !+params.get("page") && children === 1 && "rounded-full bg-violet-200"
      )}
      onClick={handlePagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);
