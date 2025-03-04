import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Table({ data, datainfo, AdditionalFeild, url, searchparams, onAddButtonClick }) {
    const [filteredData, setFilteredData] = useState(data);
    const [searchChat, setSearChChat] = useState("");
    const [loading, setLADING] = useState(false);
    const navigate = useNavigate();

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    // محاسبه کل صفحات
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);




    // فیلتر داده‌ها براساس جستجو
    useEffect(() => {
        if (searchChat.trim() === "") {
            setFilteredData(data);
        } else {
            setFilteredData(
                data.filter(value =>
                    value[searchparams.searchfeild]?.toLowerCase().includes(searchChat.toLowerCase())
                )
            );
        }
        setCurrentPage(1); // هنگام جستجو، صفحه اول را نمایش بده
    }, [data, searchChat, searchparams]);


    // برش داده‌های جدول برای نمایش صفحه جاری
    const currentData = Array.isArray(filteredData) ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

    // Simulate loading state
    useEffect(() => {
        setLADING(true);
        setTimeout(() => {
            setFilteredData(data);
            setLADING(false);
        }, 2000);
    }, [data]);

    return (
        <div className='mt-5 text-center' style={{ direction: 'rtl' }}>
            <div className="flex justify-between mx-14 mb-8 items-center">
                {/* Search box */}
                <div className="relative w-full max-w-md">
                    <input
                        onChange={(e) => setSearChChat(e.target.value)}
                        type="search"
                        className="flex justify-start py-2 w-full px-5 pr-12 rounded-2xl text-right outline-none border border-gray-300 focus:border-2 focus:border-menuHover transition-all duration-300 ease-in-out"
                        placeholder="جستجو ..."
                    />
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        <CiSearch size={24} />
                    </div>
                </div>

                {/* Add Item Button */}
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

            {/* Table */}
            {loading ? (
                <table className="w-11/12 mx-auto rounded-lg overflow-hidden text-sm border-collapse border border-gray-100 text-dark shadow-lg bg-white">
                    <thead className='bg-gradient-to-r from-blue-100 to-blue-300'>
                        <tr>
                            {/* Skeleton for headers */}
                            {datainfo.map((_, index) => (
                                <th key={index} className='p-4 border text-center'>
                                    <Skeleton height={20} width="80%" />
                                </th>
                            ))}
                            {AdditionalFeild.length > 0 &&
                                AdditionalFeild.map((a, index) => (
                                    <th key={index} className='p-4 border text-center'>
                                        <Skeleton height={20} width="80%" />
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(5)].map((_, index) => (
                            <tr key={index} className="border-b">
                                {datainfo.map((_, idx) => (
                                    <td key={idx} className='p-4 text-center border'>
                                        <Skeleton height={20} width="80%" />
                                    </td>
                                ))}
                                {AdditionalFeild.length > 0 &&
                                    AdditionalFeild.map((_, idx) => (
                                        <td key={idx} className='p-4 text-center border'>
                                            <Skeleton height={20} width="80%" />
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                currentData.length > 0 ? (
                    <table className="w-11/12 mx-auto rounded-lg overflow-hidden text-sm border-collapse border border-gray-100 text-dark shadow-lg bg-white">
                        <thead className='bg-gradient-to-r from-blue-100 to-blue-300'>
                            <tr>
                                {datainfo.map((item, index) => (
                                    <th key={index} className='p-4 border text-center'>{item.title}</th>
                                ))}
                                {AdditionalFeild.length > 0 &&
                                    AdditionalFeild.map((a, index) => (
                                        <th key={index} className='p-4 border text-center'>{a.title}</th>
                                    ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((item, index) => (
                                <tr key={index} className='border-b hover:bg-gray-100'>
                                    {datainfo.map((info, idx) => (
                                        <td key={idx} className='p-4 text-center border'>{item[info.feild]}</td>
                                    ))}
                                    {AdditionalFeild.length > 0 &&
                                        AdditionalFeild.map((a, idx) => (
                                            <td key={idx} className='p-4 text-center'>{a.elements(item)}</td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className="text-center text-2xl text-red-500">داده ای وجود ندارد</h1>
                )
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-5 py-2 rounded-full ${currentPage === 1
                            ? "text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 cursor-not-allowed"
                            : "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br"}`}
                    >
                        قبلی
                    </button>

                    {/* Page Numbers */}
                    <span className="px-4 py-1">{currentPage} از {totalPages}</span>


                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-5 py-2 rounded-full ${currentPage === totalPages
                            ? "text-white bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 cursor-not-allowed"
                            : "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br"}`}
                    >
                        بعدی
                    </button>
                </div>
            )}
        </div>
    );
}

export default Table;
