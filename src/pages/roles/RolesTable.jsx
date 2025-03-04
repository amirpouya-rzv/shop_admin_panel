import React, { useEffect, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteModal from '../../component/DeleteModal/DeleteModal';
import PaginatedTable from '../../component/Table/PaginatedTable';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { urlAxios } from '../../Services/URL';
import { GrUserManager } from "react-icons/gr";

function RolesTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [countOnPage, setCountOnPage] = useState(5);
    const [searchChar, setSearchChar] = useState('');
    const [flag, setFlag] = useState("")
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
        urlAxios.delete(`admin/roles/${id}`)
            .then(res => {
                setOpenModal(false);
                toast.success("محصول مورد نظر با موفقیت حذف شد");
                setFlag(!flag)
            })
            .catch(err => {
                console.error("خطا در حذف محصول:", err);
                toast.error(`محصول مورد نظر حذف نشد`);
            });
    };

    // داده های اصلی جدول
    const dataInfo = [
        { feild: "id", title: "#" },
        { feild: "title", title: "عنوان" },
        { feild: "description", title: "توضیحات" },
        {
            feild: null,
            title: "عملیات",
            element: (rowData) => (
                <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">

                    <Link to={`/admin/roles/add-role/${rowData.id}`} state={{ roleToEdit: rowData }}>
                        <button title="ویرایش">
                            <MdOutlineModeEdit className="text-indigo-500 hover:text-indigo-800" />
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

    // دریافت داده‌ها  
    useEffect(() => {
        setLoading(true);
        urlAxios
            .get(`admin/roles`)
            .then((res) => {
                setData(res.data.data);
                setPageCount(res.data.totalPages || 1);
            })
            .catch((err) => {
                console.error("Error fetching roles:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [currentPage, searchChar, countOnPage, flag]);



    // // باز کردن مذال
    // const handleModalOpen = () => {
    // }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />

            <PaginatedTable
                tableData={data}
                dataInfo={dataInfo}
                loading={loading}
                handelSearch={handelSearch}
                url={`/admin/roles/add-role`}
                // onAddButtonClick={handleModalOpen}

            />

            <DeleteModal
                isOpen={openModal}
                onClose={closeDeleteModal}
                onConfirm={() => DeletePrduct(itemfordelete)}
            />
        </div>
    );
}

export default RolesTable