import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

function Table({ data, datainfo, AdditionalFeild, url, searchparams, onAddButtonClick }) {
    const [filteredData, setFilteredData] = useState(data);
    const [searchChat, setSearChChat] = useState("");
    const navigate = useNavigate()
    // صفحه‌بندی
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // تعداد آیتم‌ها در هر صفحه

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

    return (
        <div className='mt-20 text-center' style={{ direction: 'rtl' }}>
            <div className="flex justify-between mx-14 mb-10 items-center">
                {/* Search box */}
                <div className="relative w-full max-w-md">
                    <input
                        onChange={(e) => setSearChChat(e.target.value)}
                        type="search"
                        className="flex justify-start py-2 w-full px-5 pr-12 rounded-2xl text-right outline-none border border-gray-300 focus:border-2 focus:border-menuHover"
                        placeholder="جستجو ..."
                    />
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        <CiSearch size={24} />
                    </div>
                </div>
                {/* اضافه کردن آیتم */}
                <div onClick={() => {
                    console.log("Navigating to:", url);
                    if (url)
                        navigate(url);
                    else onAddButtonClick();
                }}>
                    <button className="bg-teal-950 text-white px-3 py-1 rounded">
                        +
                    </button>
                </div>


            </div>

            {/* Table */}
            {
                currentData.length > 0 ? (
                    <div>
                        <table className="w-11/12 mx-auto text-sm border-collapse border border-gray-100 text-dark">
                            <thead className='bg-gray-300'>
                                <tr>
                                    {datainfo.map((item, index) => (
                                        <th key={index} className='p-5 border'>{item.title}</th>
                                    ))}
                                    {AdditionalFeild.length > 0 &&
                                        AdditionalFeild.map((a, index) => (
                                            <th key={index} className='p-5 border'>{a.title}</th>
                                        ))
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {currentData.map((item, index) => (
                                    <tr key={index} className='border-b hover:bg-gray-200'>
                                        {datainfo.map((info, idx) => (
                                            <td key={idx} className='p-5 text-center border'>{item[info.feild]}</td>
                                        ))}
                                        {AdditionalFeild.length > 0 &&
                                            AdditionalFeild.map((a, idx) => (
                                                <td key={idx} className='p-5 border'>{a.elements(item)}</td>
                                            ))
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination */}
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-4 py-1 rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 text-white"}`}
                            >
                                قبلی
                            </button>

                            <span className="px-5 ">{currentPage} از {totalPages}</span>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3.5 py-1 rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 text-white"}`}
                            >
                                بعدی
                            </button>
                        </div>
                    </div>
                ) : (
                    <Loader />)
            }
        </div >
    );
}

export default Table;
