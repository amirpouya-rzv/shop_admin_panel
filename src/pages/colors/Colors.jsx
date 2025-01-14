import React, { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdOutlineModeEdit } from 'react-icons/md';
import Table from '../../component/Table/Table';
import Modal from '../../component/Modal/Modal';
import DeleteModal from '../../component/DeleteModal/DeleteModal';

const Colors = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  
  const handleDeleteModalOpen = (id) => {
    setItemIdToDelete(id); // Set the item ID to delete
    setIsDeleteModalOpen(true); // Open the delete modal
  };

  const handleDeleteModalClose = () => setIsDeleteModalOpen(false);

  const handleDeleteConfirm = () => {
    // Handle the deletion logic here (remove the item by `itemIdToDelete`)
    setIsDeleteModalOpen(false); // Close the delete modal after confirmation
  };

  const data = [
    {
      id: 1,
      category: 'aaa',
      title: 'bbb',
      price: '1111',
      stock: '5',
      like_count: '20',
      status: '1',
      color: 'red',
    },
    {
      id: 2,
      category: 'ccc',
      title: 'ddd',
      price: '2222',
      stock: '10',
      like_count: '30',
      status: '1',
      color: 'green',
    },
    {
      id: 3,
      category: 'ccc',
      title: 'ddd',
      price: '2222',
      stock: '10',
      like_count: '30',
      status: '1',
      color: 'blue',
    },
  ];

  const datainfo = [
    { feild: 'id', title: '#' },
    { feild: 'title', title: 'عنوان محصول' },
    { feild: 'price', title: ' قیمت محصول' },
    { feild: 'color', title: 'رنگ' },
    { feild: 'stock', title: 'تعداد محصول' },
  ];

  const additionalElements = (id) => {
    return (
      <div className="text-xl">
        <button>
          <MdOutlineModeEdit className="text-teal-500" />
        </button>
        <button onClick={() => handleDeleteModalOpen(id)}>
          <RiDeleteBinLine className="text-rose-500" />
        </button>
      </div>
    );
  };

  const AdditionalFeild = {
    title: 'عملیات',
    elements: additionalElements,
  };

  const searchparams = {
    title: 'جستوجو',
    placeholder: 'قسمتی از عنوان رو جست و جو کنسد',
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
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Colors;
