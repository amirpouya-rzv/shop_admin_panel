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
import toast from 'react-hot-toast';


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
        if (res.status === 201) {
          toast.success(res.data.message);
        }
        setFlag(!flag)
      })
      .catch(err => {
        console.log(err);
        toast.error(err.data.message);
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
      title: 'تاریخ',
      elements: (rowdata) => moment(rowdata.creat_at).format('jYYYY/jMM/jDD'),
    },
    {
      title: 'نمایش در منو',
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
            (<p className='text-white border md:rounded-full bg-teal-800 sm:rounded-none'>موجود هست</p>) :
            (<p className='text-white border rounded-full bg-rose-800'>موجود نیست</p>)
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
      <Table
        data={dataToDisplay}
        datainfo={datainfo}
        AdditionalFeild={selectedCategoryId ? SubCategoryAdditionalFeild : AdditionalFeild}
        searchparams={searchparams}
        onAddButtonClick={handleModalOpen}
        loader={loader}
        url={'/admin/categories/addcategories'}
      />
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        onConfirm={() => handleDeleteConfirm(itemIdToDelete)}
      />
    </div>
  );
};

export default Categories;
