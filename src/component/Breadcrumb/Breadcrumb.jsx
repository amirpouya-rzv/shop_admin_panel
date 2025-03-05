import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="p-4 bg-gradient-to-r font-2xl font-elMessiri">
      <ol className="flex text-sm space-x-3">
        <li>
          <Link
            to="/"
            className="text-blue-700 text-base font-semibold hover:text-blue-900 transition-all duration-300 ease-in-out"
          >
            <span className="bg-blue-200 px-3 py-1 rounded-full shadow-md transform hover:scale-110">
              داشبرد
            </span>
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-green-600 text-base font-medium">
                  {decodeURIComponent(value)}
                </span>
              ) : (
                <Link
                  to={to}
                  className={`${index % 2 === 0 ? "font-bold text-base text-purple-500" : "text-yellow-500 text-lg"
                    } font-semibold hover:text-blue-900 transition-all duration-300 ease-in-out transform hover:scale-110`}
                >
                  {decodeURIComponent(value)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
