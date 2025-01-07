import React from 'react'
import Table from '../../component/Table/Table'
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Chart } from 'chart.js';

function Dashbord() {
    const data = [
        {
            id: 1,
            category: 'aaa',
            title: 'bbb',
            price: '1111',
            stock: '5',
            like_count: '20',
            status: '1',
            color: 'red'
        },
        {
            id: 2,
            category: 'ccc',
            title: 'ddd',
            price: '2222',
            stock: '10',
            like_count: '30',
            status: '1',
            color: 'green'
        },
        {
            id: 3,  // Fixed duplicate id
            category: 'ccc',
            title: 'ddd',
            price: '2222',
            stock: '10',
            like_count: '30',
            status: '1',
            color: 'blue'
        }
    ];

    const datainfo = [
        { feild: "id", title: "#" },
        { feild: "title", title: "عنوان محصول" },
        { feild: "price", title: " قیمت محصول" },
        { feild: "color", title: "رنگ" }
    ];

    const additionalElements = () => {
        return (
            <div className='text-xl '>
                <span className='flex justify-center gap-2'>
                    <button><MdOutlineModeEdit className='text-teal-500' /></button>
                    <button><RiDeleteBinLine className='text-rose-500' /></button>
                </span>
            </div>
        );
    };

    const AdditionalFeild = {
        title: "عملیات",
        elements: (itemId) => additionalElements(itemId)
    };
    return (
        <div>
            <Table data={data} datainfo={datainfo} AdditionalFeild={AdditionalFeild} />
            {/* <Chart/> */}
        </div>
    )
}

export default Dashbord