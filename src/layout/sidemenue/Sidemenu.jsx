import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CgMenuMotion } from 'react-icons/cg';
import { MdOutlineInvertColors, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { ImExit } from 'react-icons/im';
import Modal from '../../component/Modal/Modal';
import { TbBrandSketch, TbBrandSketchFilled, TbLicense } from 'react-icons/tb';

function Sidemenu() {
  const [menubutton, setMenuButton] = useState(false);

  const changemenubbutton = () => {
    setMenuButton(!menubutton);
  };

  // دکمه خروج
  const [openExitModal, setOpenExitModal] = useState(false);
  const ExitButton = () => {
    setOpenExitModal(true);
  };
  // جذف توکن
  const navigate = useNavigate();
  const confirmExit = () => {
    localStorage.removeItem("loginToken");
    navigate('/auth/login');
  };

  return (
    <div
      className={`h-full fixed top-0 right-0 z-40 ${menubutton ? "bg-menuBg duration-300 shadow-2xl" : "duration-300 h-screen -mx-0"}`}
    >
      <div className={`pt-5 mx-8 ${menubutton ? "duration-300 mx-20 w-48" : "duration-300 w-0"}`}>
        {menubutton ? (
          <button onClick={changemenubbutton}>
            <IoIosCloseCircleOutline size={24} className='md:-mx-16 sm:-mx-10' />
          </button>
        ) : (
          <button onClick={changemenubbutton}>
            <CgMenuMotion size={24} />
          </button>
        )}
      </div>

      <div className={`flex flex-col gap-5 text-right text-textPrimary ${menubutton ? "block" : "hidden"}`}>
        <NavLink
          onClick={changemenubbutton}
          to="/"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            داشبرد
            <LuLayoutDashboard />
          </span>
        </NavLink>


        <NavLink
          onClick={changemenubbutton}
          to="/admin/categories"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            مدیریت گروه محصولات
            <MdOutlineProductionQuantityLimits size={20} />
          </span>
        </NavLink>
        <NavLink
          onClick={changemenubbutton}
          to="/admin/brands"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            مدیریت برندها
            <TbBrandSketchFilled  size={20}/>
          </span>
        </NavLink>


        <NavLink
          onClick={changemenubbutton}
          to="/admin/garanty"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            گارانتی ها
            <TbLicense />
          </span>
        </NavLink>


        <NavLink
          onClick={changemenubbutton}
          to="/admin/colors"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            رنگ ها
            <MdOutlineInvertColors />
          </span>
        </NavLink>

        <button
          onClick={ExitButton}
          className={`hover:bg-menuHover py-3 ${menubutton ? "block text-right" : "hidden"}`}
        >
          <span className='flex items-center justify-end gap-2 mx-4'>
            خروج
            <ImExit />
          </span>
        </button>
      </div>

      <Modal
        isOpen={openExitModal}
        onClose={() => setOpenExitModal(false)}
      >
        <div className="text-center">
          <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
          <div className="flex justify-center mt-4 gap-4">
            <button
              onClick={confirmExit}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              بله
            </button>
            <button
              onClick={() => setOpenExitModal(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              خیر
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Sidemenu;
