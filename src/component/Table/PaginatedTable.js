import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function PaginatedTable({
  tableData,
  dataInfo,
  loading,
  pageCount,
  currentPage,
  setCurrentPage,
  handelSearch,
  url,
  onAddButtonClick
}) {
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);

  // جست و جو
  let timeout;
  const handelSetSearchChar = (char) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handelSearch(char);
    }, 1000);
  };

  useEffect(() => {
    let pArr = [];
    for (let i = 1; i <= pageCount; i++) pArr.push(i);
    setPages(pArr);
  }, [pageCount]);

  // اسکلتون
  const renderSkeleton = () => {
    return (
      <table className="w-full mx-auto rounded-lg overflow-hidden text-sm border-collapse border border-gray-100 text-dark shadow-lg bg-white">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-300">
          <tr>
            {dataInfo.map((_, index) => (
              <th key={index} className="p-4 border text-center">
                <Skeleton height={20} width="80%" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, index) => ( // 5 fake rows while loading
            <tr key={index} className="border-b">
              {dataInfo.map((_, idx) => (
                <td key={idx} className="p-4 text-center border">
                  <Skeleton height={20} width="80%" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // محاسبه تعداد کل صفحات
  const totalPages = Math.ceil(pageCount / 5); // با توجه به تعداد هر صفحه (۵)

  return (
    <div>
      <div className="relative w-full max-w-7xl mx-auto mt-10" style={{ direction: "rtl" }}>
        <div className="flex justify-between mx-14 mb-8 items-center">
          <div className="relative w-full max-w-md">
            <input
              onChange={(e) => handelSetSearchChar(e.target.value)}
              type="search"
              className="flex justify-start py-2 w-full px-5 pr-12 rounded-2xl text-right outline-none border border-gray-300 focus:border-2 focus:border-menuHover transition-all duration-300 ease-in-out"
              placeholder={handelSearch.placeholder}
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
              <CiSearch size={24} />
            </div>
          </div>
          {/* اضافه کردن آیتم */}
          <div onClick={() => {
            if (url) {
              navigate(url.startsWith("/") ? url : `/${url}`, { replace: false });
            } else if (onAddButtonClick) {
              onAddButtonClick();
            }
          }}>
            <button className="button text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              +افزودن آیتم
            </button>
          </div>
        </div>

            {/* اسکلتون */}
        {loading ? (
          renderSkeleton()
        ) : (
          tableData.length ? (
            <table className="w-full mx-auto rounded-lg overflow-hidden text-sm border-collapse border border-gray-100 text-dark shadow-lg bg-white">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-300">
                <tr>
                  {dataInfo.map((item, index) => (
                    <th key={index} className="p-4 border text-center">
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    {dataInfo.map((info, idx) =>
                      info.feild ? (
                        <td key={idx} className="p-4 text-center border">
                          {item[info.feild]}
                        </td>
                      ) : (
                        <td key={idx} className="p-4 text-center border">
                          {info.element(item)}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-center text-2xl text-red-500">داده ای وجود ندارد</h1>
          )
        )}

        {/* پیجینیشن */}
        {totalPages > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-5 py-2 rounded-full ${currentPage === 1
                  ? "text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 cursor-not-allowed"
                  : "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br"
                }`}
              disabled={currentPage === 1}
            >
              قبلی
            </button>

            {/* دکمه‌های پیجینیشن */}
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-5 py-2 rounded-full ${currentPage === page
                    ? "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"
                    : "text-white bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 hover:bg-gradient-to-br"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`px-5 py-2 rounded-full ${currentPage === totalPages
                  ? "text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 cursor-not-allowed"
                  : "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br"
                }`}
              disabled={currentPage === totalPages}
            >
              بعدی
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginatedTable;
