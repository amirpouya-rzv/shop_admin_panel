import React from 'react';

function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded-lg w-1/2"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مدال هنگام کلیک داخل مدال
      >
        {/* عنوان مدال */}
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

        {/* محتوای مدال */}
        <div>{children}</div>

        {/* دکمه‌های مدال */}
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
