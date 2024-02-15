import React, { memo } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);

  return (
    <div className="text-sm flex">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex items-center justify-center hover:text-violet-700 text-[16px]"
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && (
              <span>
                <MdKeyboardArrowRight></MdKeyboardArrowRight>
              </span>
            )}
          </Link>
        ))}
    </div>
  );
};

export default memo(Breadcrumb);
