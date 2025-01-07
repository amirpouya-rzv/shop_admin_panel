import React from 'react';
import './styles.css';  // Importing the CSS file into the project

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null; // If modal is not open, return nothing

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close the modal if the user clicks outside
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative modal-animation" // Adding animation class
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing if clicked inside
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">حذف آیتم</h2>

        {/* Modal Content */}
        <p className="text-gray-700 mb-4">آیا مطمئن هستید که می‌خواهید این آیتم را حذف کنید؟</p>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
            onClick={onClose}
          >
            انصراف
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            onClick={onConfirm}
          >
            تایید حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
