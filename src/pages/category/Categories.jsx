import React, { useEffect, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import Table from '../../component/Table/Table';
import Modal from '../../component/Modal/Modal';
import DeleteModal from '../../component/DeleteModal/DeleteModal';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { urlAxios } from '../../Services/URL';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'jalali-moment';
import toast, { Toaster } from 'react-hot-toast';
import { IoIosArrowBack } from 'react-icons/io';


const Categories = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const [loader, setloader] = useState(false)
  // انتخاب زیر دسته ها   
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);  //ذخیره زیر دسته‌ها
  const [subCategories, setSubCategories] = useState([]); // ذخیره زیر دسته‌ها

  // مدال اضافه کردن آیتم
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // مدال حذف
  const [flag, setFlag] = useState(false)
  const handleDeleteModalOpen = (id) => {
    setItemIdToDelete(id);
    setIsDeleteModalOpen(true);
  };
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);

  // حذف داده
  const handleDeleteConfirm = (id) => {
    urlAxios.delete(`/admin/categories/${id}`)
      .then(res => {
        if (res.status === 200) {
          toast.success(res?.data?.message);
          console.log("خطا:", res);
        }
        setFlag(!flag)
      })
      .catch(err => {
        console.log(err);
        toast.error(err?.response?.data?.message || "خطا در حذف");
      });
    setIsDeleteModalOpen(false);
  };

  // دریافت اطلاعات
  const [data, setData] = useState([]);
  useEffect(() => {
    setloader(true)
    urlAxios.get(`/admin/categories${selectedCategoryId ? `?parent=${selectedCategoryId}` : ""}`)
      .then(res => {
        if (res.status === 200) {
          if (selectedCategoryId) {
            setSubCategories(res.data.data);
            setloader(false)
          } else {
            setloader(false)
            setData(res.data.data);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params, selectedCategoryId, flag]);

  // داده‌های اصلی
  const datainfo = [
    { feild: 'id', title: '#' },
    { feild: 'title', title: 'عنوان محصول' },
  ];

  // فیلدهای اضافی برای دسته‌ها
  const AdditionalFeild = [
    // {
    //   title: 'والد',
    //   elements: (rowdata) => rowdata.parent_title || "-----",
    // },
    {
      title: 'تاریخ و ساعت',
      elements: (rowdata) => moment(rowdata.creat_at).locale('fa').format('jYYYY/jMM/jDD - HH:mm  -  dddd '),
    },
    {
      title: 'نمایش در سایت',
      elements: (rowdata) => showinmenu(rowdata),
    },
    {
      title: 'عملیات',
      elements: (rowdata) => additionalElements(rowdata),
    },
  ];

  // فیلدهای اضافی برای زیر دسته‌ها
  const SubCategoryAdditionalFeild = [
    {
      title: 'تاریخ ایجاد',
      elements: (rowdata) => moment(rowdata.create_at).format('jYYYY/jMM/jDD'),
    },
    {
      title: 'عملیات',
      elements: (rowdata) => additionalElements(rowdata),
    },
  ];


  // فیلدهای اضافی برای عملیات
  const additionalElements = ({ id }) => {
    return (
      <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">

        {
          selectedCategoryId ?

            null
            :
            <button onClick={() => setSelectedCategoryId(id)} title="زیر دسته‌ها">
              <VscTypeHierarchySub className={`text-yellow-500 hover:text-amber-800 `} />
            </button>
        }


        <Link to={`/admin/categories/addcategories/${id}`}>
          <button title="ویرایش">
            <MdOutlineModeEdit className="text-sky-500 hover:text-sky-800" />
          </button>
        </Link>
        <button title="حذف" onClick={() => handleDeleteModalOpen(id)}>
          <RiDeleteBinLine className="text-rose-500 hover:text-rose-800" />
        </button>
      </div>
    );
  };

  // نمایش در منو
  const showinmenu = (rowdata) => {
    return (

      <span className='text-center'>
        {
          rowdata.show_in_menu ?
            (<p className="inline-flex items-center rounded-md bg-blue-50 px-10 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">قابل دیدن </p>) :
            (<p className="inline-flex items-center rounded-md bg-pink-50 px-8 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset">غیر قابل دیدن</p>)
        }
      </span>
    );
  };

  // جستجو
  const searchparams = {
    title: 'جستجو',
    placeholder: 'قسمتی از عنوان رو جست و جو کنید',
    searchfeild: 'title',
  };

  // داده‌ها برای نمایش
  const dataToDisplay = selectedCategoryId ? subCategories : data;

  return (
    <div>
      {/* دکمه بازگشت به دسته‌های اصلی */}
      {selectedCategoryId && (
        <div className="flex justify-between items-center mb-10 mt-5 px-2 sm:px-4 mx-10">

          <button
            onClick={() => setSelectedCategoryId(null)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-4 py-2 rounded-full shadow-md transition duration-200 ease-in-out"
          >
            <IoIosArrowBack />
          </button>
          <div className="flex items-center gap-3">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full shadow">
              {
                data.find(item => item.id === selectedCategoryId)?.title || 'نامشخص'
              }
            </span>
            <span className="text-gray-700 font-bold text-lg">:زیر دسته‌های</span>

          </div>
        </div>
      )}


      {/* جدول */}
      <Table
        data={dataToDisplay}
        datainfo={datainfo}
        AdditionalFeild={selectedCategoryId ? SubCategoryAdditionalFeild : AdditionalFeild}
        searchparams={searchparams}
        onAddButtonClick={handleModalOpen}
        loader={loader}
        url={'/admin/categories/addcategories'}
      />

      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {/* مدال افزودن */}
      <Modal
        AdditionalFeild
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title="افزودن آیتم جدید"
        footer={
          <>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-lg"
              onClick={handleModalClose}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              افزودن
            </button>
          </>
        }
      ></Modal>

      {/* مدال حذف */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={() => handleDeleteConfirm(itemIdToDelete)}
      />
    </div>
  );
};

export default Categories;
