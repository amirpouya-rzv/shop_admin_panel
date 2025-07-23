import React, { useEffect, useState } from 'react';
import PaginatedTable from '../../component/Table/PaginatedTable';
import { urlAxios } from '../../Services/URL';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import DeleteModal from '../../component/DeleteModal/DeleteModal';
import toast, { Toaster } from 'react-hot-toast';

function ProductTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOnPage, setCountOnPage] = useState(5);
    const [searchChar, setSearchChar] = useState('');
    const [flag, setFlag] = useState("")
    const { productId } = useParams("")


    // حذف محصول
    const [openModal, setOpenModal] = useState(false);
    const [itemfordelete, setItemFoDelete] = useState(null);

    // باز کردن مدال حذف
    const OpenModalforDelete = (id) => {
        setItemFoDelete(id);
        setOpenModal(true);
    };

    // بستن مدال حذف
    const closeDeleteModal = () => {
        setOpenModal(false);
        setItemFoDelete(null);
    };

    // حذف محصول
    const DeletePrduct = (id) => {
        urlAxios.delete(`admin/products/${id}`)
            .then(res => {
                setOpenModal(false);
                toast.success(res?.data?.message);
                setFlag(!flag)
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    const dataInfo = [
        { feild: "id", title: "#" },
        {
            feild: null,
            title: "گروه محصول",
            element: (rowData) => rowData.category?.[0]?.title || "بدون دسته‌بندی"
        },
        { feild: "title", title: "عنوان" },
        { feild: "price", title: "قیمت" },
        { feild: "stock", title: "موجودی" },
        {
            feild: null,
            title: "عملیات",
            element: (rowData) => (
                <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">
                    <Link onClick={() => { }}>
                        <button title="ویرایش">
                            <MdOutlineModeEdit className="text-green-500 hover:text-green-800" />
                        </button>
                    </Link>
                    <button title="حذف" onClick={() => { OpenModalforDelete(rowData.id) }}>
                        <RiDeleteBinLine className="text-rose-500 hover:text-rose-800" />
                    </button>
                </div>
            )
        }
    ];

    const handelSearch = (char) => {
        setSearchChar(char);
    };

    // دریافت داده‌ها از سرور
    useEffect(() => {
        setLoading(true);
        urlAxios
            .get(`admin/products?page=${currentPage}&limit=${countOnPage}&search=${searchChar}`)
            .then((res) => {
                setData(res.data.data);
                setPageCount(res.data.totalPages || 1);
            })
            .catch((err) => {
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage, searchChar, countOnPage, flag]);



    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />

            <PaginatedTable
                tableData={data}
                dataInfo={dataInfo}
                loading={loading}
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                handelSearch={handelSearch}
                url={'/admin/products/addproducs'}
            />

            <DeleteModal
                isOpen={openModal}
                onClose={closeDeleteModal}
                onConfirm={() => DeletePrduct(itemfordelete)}
            />
        </div>
    );
}

export default ProductTable;
