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
const Category = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  //مدال اضافه کردن آیتم 
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const [flag, setFlag] = useState(false)
  // مدال حذف
  const handleDeleteModalOpen = (id) => {
    setItemIdToDelete(id); // Set the item ID to delete
    setIsDeleteModalOpen(true); // Open the delete modal
  };
  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);


  //حذف داده
  const handleDeleteConfirm = (id) => {
    urlAxios.delete(`/admin/categories/${id}`)
      .then(res => {
        if (res.status === 201) {
          toast.success('دسته با موفقیت حذف شد');
        } else {
          toast.error('خطا در حذف دسته');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('خطا در حذف دسته');
      });
    setIsDeleteModalOpen(false);
  };

  //دریافت اطلاعات
  const [data, setData] = useState([])
  useEffect((id = null) => {
    urlAxios.get(`/admin/categories${id ? `parent=${id}` : ""}`)
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          setData(res.data.data)
          setFlag(!flag);
        } else {
        }
      })
      .catch(err => { console.log(err) })
  }, [params, flag])


  // داده های اصلی 
  const datainfo = [
    { feild: 'id', title: '#' },
    { feild: 'title', title: 'عنوان محصول' },
  ];




  //فیلد های اضافی در جدول
  const AdditionalFeild = [
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
  ]




  //ذاذه های اضافی
  const additionalElements = ({ id }) => {
    return (
      <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">
        <Link  to={`/admin/addcategories/${id}`}>
          <button title='زیر دسته ها' >
            <VscTypeHierarchySub className="text-primary" />
          </button>
        </Link>
        <Link to={`/admin/addcategories/${id}`}>
          <button title='ویرایش' >
            <MdOutlineModeEdit className="text-teal-500" />
          </button>
        </Link>
        <button title='حذف' onClick={() => handleDeleteModalOpen(id)}>
          <RiDeleteBinLine className="text-rose-500" />
        </button>
      </div>
    );
  };


  //داده های اضافی
  const showinmenu = (rowdata) => {
    return (
      <span className='text-center'>
        {
          rowdata.show_in_menu ?
            (<p className='text-secondary'>موجود هست</p>)
            :
            (<p className='text-rose-800'>موجود نیست</p>)
        }
      </span>
    )
  }

  //جستوجو
  const searchparams = {
    title: 'جستوجو',
    placeholder: 'قسمتی از عنوان رو جست و جو کنید',
    searchfeild: 'title',
  };

  return (
    <div>
      <Table
        data={data}
        datainfo={datainfo}
        AdditionalFeild={AdditionalFeild}
        searchparams={searchparams}
        onAddButtonClick={handleModalOpen}
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

export default Category;
