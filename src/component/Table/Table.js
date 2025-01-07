import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';

function Table({ data, datainfo, AdditionalFeild,searchparams,onAddButtonClick }) {


    const [initdata,setInitData]=useState("")
    const [searchChat,setSearChChat] = useState("")


    useEffect(()=>{
        setInitData(data.filter(value=>value.title.includes(searchChat)))
    },[])

    return (
        <div className='mt-20' style={{ direction: 'rtl' }}>

            <div className="flex justify-between mx-14 mb-10 items-center">

                {/* serach box */}

                <div className="relative w-full max-w-md">
                    <input
                    onChange={(e)=>setSearChChat(e.target.value)}
                        type="search"
                        className="flex justify-start py-2 w-full px-5 pr-12 rounded-2xl text-right outline-none border border-gray-300 focus:border-2 focus:border-menuHover"
                        placeholder="جستجو ..."
                    />
                    <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
                        <CiSearch size={24} />
                    </div>
                </div>

                <button
          onClick={onAddButtonClick} // اتصال دکمه به تابع باز کردن مدال
          className="bg-teal-950 text-white px-3 py-2 rounded items-end"
        >
          + افزودن آیتم
        </button>

            </div>


            <table className="w-11/12 mx-auto text-sm border-collapse border border-gray-100 ">
                <thead className='bg-gray-300'>
                    <tr>
                        {/* ایجاد ستون های جدول بر اساس اطلاعات دریافت شده از دیتابیس*/}
                        {
                            datainfo.map((item, index) => (
                                <th key={index} className='p-5 border'>{item.title}</th>
                            ))
                        }
                        {/* اضافه کردن ستون اضافی به جدول */}
                        {
                            AdditionalFeild ? (
                                <th className='p-5 border'>{AdditionalFeild.title}</th>
                            ) : null
                        }
                    </tr>
                </thead>
                <tbody>
                    {/* روی ذکورد های دریافتی map 
                             میزنیم*/}
                    {
                        data.map((item, index) => (
                            <tr key={index} className='border-b hover:bg-gray-200'>

                                {/* روی اطلاعات هر رکورد map 
                                میزنیم برای نمایش در جدول */}
                                {
                                    datainfo.map((info, index) => (
                                        <td key={index} className='p-5 text-center border'>{item[info.feild]}</td>
                                    ))
                                }
                                {/* اضافه کردت سطر های اضافی */}
                                {
                                    AdditionalFeild ? (
                                        <td className='p-5 text-center border'>
                                            {AdditionalFeild.elements()}
                                        </td>
                                    ) : null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
