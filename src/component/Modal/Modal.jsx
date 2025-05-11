import React from 'react';

function Modal({ isOpen, onClose, title, children, footer }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-5 rounded-lg w-11/12 md:w-1/2 border border-t-2 border-t-sky-500 border-b-2 border-b-rose-500"
        onClick={(e) => e.stopPropagation()}
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
