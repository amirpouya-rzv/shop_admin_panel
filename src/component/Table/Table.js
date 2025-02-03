import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { IoIosArrowRoundBack } from "react-icons/io";
function Table({ data, datainfo, AdditionalFeild, searchparams, onAddButtonClick }) {

    const navigate = useNavigate();
    const Params = useParams();
    const location = useLocation();
    console.log(location)
    const [filteredData, setFilteredData] = useState(data);
    const [searchChat, setSearChChat] = useState("");

    useEffect(() => {
        if (searchChat.trim() === "") {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter(value => {
                return (
                    value.title.toLowerCase().includes(searchChat.toLowerCase()) ||
                    datainfo.some(info => {
                        if (typeof value[info.feild] === "number") {
                            return value[info.feild].toString().includes(searchChat);
                        }
                        return false;
                    })
                );
            }));
        }
    }, [data, searchChat, datainfo]);

    return (
        <div className='mt-20 text-center' style={{ direction: 'rtl' }}>
            <div className="flex justify-between mx-14 mb-10 items-center">
                {/* Search box */}
                <div className="relative w-full max-w-md">
                    <input
                        onChange={(e) => setSearChChat(e.target.value)} // Update search term
                        type="search"
                        className="flex justify-start py-2 w-full px-5 pr-12 rounded-2xl text-right outline-none border border-gray-300 focus:border-2 focus:border-menuHover"
                        placeholder="جستجو ..."
                    />
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        <CiSearch size={24} />
                    </div>
                </div>
                {/* اضافه کردن ایتم */}
                <Link to={'/admin/addcategories'}>
                    <button
                        className="bg-teal-950 text-white px-3 py-1 rounded items-end"
                    >
                        +
                    </button>
                </Link>
            </div>
            {/* Table */}
            {
                data.length ?
                    (
                        <div>
                            <table className="w-11/12 mx-auto text-sm border-collapse border border-gray-100 text-dark">
                                <thead className='bg-gray-300'>
                                    <tr>
                                        {/* فیلدهای اصلی */}
                                        {datainfo.map((item, index) => (
                                            <th key={index} className='p-5 border text-pink'>{item.title}</th>
                                        ))}
                                        {/* فیلد های اضافی */}
                                        {AdditionalFeild.length > 0 &&
                                            AdditionalFeild.map((a, index) => (
                                                <th key={index} className='p-5 border md:tabl'>{a.title}</th>
                                            ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* فیلد های اصلی */}
                                    {filteredData.map((item, index) => (
                                        <tr key={index} className='border-b hover:bg-gray-200'>
                                            {/* Render table data based on field names */}
                                            {datainfo.map((info, idx) => (
                                                <td key={idx} className='p-5 text-center border'>{item[info.feild]}</td>
                                            ))}
                                            {/* فیلد های اضافی */}
                                            {AdditionalFeild.length > 0 &&
                                                AdditionalFeild.map((a, idx) => (
                                                    <td key={idx} className='p-5 border'>{a.elements(item)}</td>
                                                ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-rose-900 drop-shadow-2xl mt-36 text-3xl text-center">داده ای وجود ندارد</h1>
                        </div>
                    )
            }

        </div>
    );
}
export default Table;