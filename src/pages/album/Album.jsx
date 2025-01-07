import React, { useState } from 'react';
import Table from '../../component/Table/Table';
import Modal from '../../component/Modal/Modal';

function Album() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const data = [
    { id: 1, category: 'aaa', title: 'bbb', price: '1111', stock: '5', like_count: '20', status: '1' },
    { id: 2, category: 'ccc', title: 'ddd', price: '2222', stock: '10', like_count: '30', status: '1' },
  ];

  const datainfo = [
    { feild: 'id', title: '#' },
    { feild: 'title', title: 'عنوان محصول' },
    { feild: 'price', title: ' قیمت محصول' },
  ];

  return (
    <div>
      <Table
        data={data}
        datainfo={datainfo}
        onAddButtonClick={handleModalOpen} // ارسال تابع باز کردن مدال به تیبل
      />

      {/* مدال افزودن آیتم */}
      <Modal
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
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              افزودن
            </button>
          </>
        }
      >
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">عنوان محصول</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="عنوان را وارد کنید"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">قیمت محصول</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="قیمت را وارد کنید"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Album;
