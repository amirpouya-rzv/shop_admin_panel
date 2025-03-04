// import React, { useEffect, useState } from 'react';
// import PaginatedTable from '../../component/Table/PaginatedTable';
// import { urlAxios } from '../../Services/URL';
// import { RiDeleteBinLine } from 'react-icons/ri';
// import { MdOutlineModeEdit } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import DeleteModal from '../../component/DeleteModal/DeleteModal';
// import toast, { Toaster } from 'react-hot-toast';

// function UsersTable() {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [pageCount, setPageCount] = useState(1);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [countOnPage, setCountOnPage] = useState(5);
//     const [searchChar, setSearchChar] = useState('');
//     const [flag, setFlag] = useState("")


//     // حذف محصول
//     const [openModal, setOpenModal] = useState(false);
//     const [itemfordelete, setItemFoDelete] = useState(null);

//     // باز کردن مدال حذف
//     const OpenModalforDelete = (id) => {
//         setItemFoDelete(id);
//         setOpenModal(true);
//     };

//     // بستن مدال حذف
//     const closeDeleteModal = () => {
//         setOpenModal(false);
//         setItemFoDelete(null);
//     };

//     // حذف محصول
//     const DeleteUsers = (id) => {
//         urlAxios.delete(`admin/users/${id}`)
//             .then(res => {
//                 setOpenModal(false);
//                 toast.success("محصول با موفقیت حذف شد!");
//                 setFlag(!flag)
//             })
//             .catch(err => {
//                 console.error("خطا در حذف محصول:", err);
//                 toast.error(`محصول مورد نظر حذف نشد`);
//             });
//     };

//     const dataInfo = [
//         { feild: "id", title: "#" },
//         { feild: "user_name", title: "نام کاربری" },
//         { feild: "first_name", title: "نام " },
//         { feild: "last_name ", title: "نام خانوادگی" },
//         { feild: "phone ", title: " تلفن همراه" },
//         { feild: "email ", title: "ایمیل" },

//         {
//             feild: null,
//             title: "حنسیت",
//             element: (rowData) => rowData.gender === 1 ? "آقا" : "خانم"

//         },
//         {
//             field: null,
//             title: "نقش",
//             element: (rowData) => {
//               return (
//                 <>
//                   {rowData.roles && rowData.roles.length > 0 ? (
//                     rowData.roles.map((r) => (
//                       <div key={rowData.id + "-" + r.id} className="text-center">
//                         {r.title}
//                       </div>
//                     ))
//                   ) : (
//                     <div className="text-center">هیچ نقشی وجود ندارد</div>
//                   )}
//                 </>
//               );
//             }
//           },
//         {
//             feild: null,
//             title: "عملیات",
//             element: (rowData) => (
//                 <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">
//                     <Link onClick={() => { }}>
//                         <button title="ویرایش">
//                             <MdOutlineModeEdit className="text-green-500 hover:text-green-800" />
//                         </button>
//                     </Link>
//                     <button title="حذف" onClick={() => { OpenModalforDelete(rowData.id) }}>
//                         <RiDeleteBinLine className="text-rose-500 hover:text-rose-800" />
//                     </button>
//                 </div>
//             )
//         }
//     ];

//     const handelSearch = (char) => {
//         setSearchChar(char);
//     };

//     // دریافت داده‌ها از سرور
//     useEffect(() => {
//         setLoading(true);
//         urlAxios
//             .get(`admin/users?page=${currentPage}&limit=${countOnPage}&search=${searchChar}`)
//             .then((res) => {
//                 console.log(res);
//                 setData(res.data.data.data);
//                 setPageCount(res.data.data.last_page || 1);
//             })
//             .catch((err) => {
//                 console.error("خطا در دریافت داده‌ها:", err);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [currentPage, searchChar, countOnPage, flag]);


//     const handleModalOpen = () => {

//     }

//     return (
//         <div>
//             <Toaster position="top-center" reverseOrder={false} />

//             <PaginatedTable
//                 tableData={data}
//                 dataInfo={dataInfo}
//                 loading={loading}
//                 pageCount={pageCount}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//                 handelSearch={handelSearch}
//                 url={`/admin/users/add-users`}
//                 onAddButtonClick={handleModalOpen}

//             />

//             <DeleteModal
//                 isOpen={openModal}
//                 onClose={closeDeleteModal}
//                 onConfirm={() => DeleteUsers(itemfordelete)}
//             />
//         </div>
//     );
// }

// export default UsersTable;


import React from 'react'

function UsersTable() {
  return (
    <div>UsersTable</div>
  )
}

export default UsersTable