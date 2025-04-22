import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircleOutline, IoMdArrowDropdown } from 'react-icons/io';
import { CgMenuMotion } from 'react-icons/cg';
import { MdManageAccounts, MdOutlineInvertColors, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { ImExit } from 'react-icons/im';
import Modal from '../../component/Modal/Modal';
import { TbBrandSketchFilled, TbLicense } from 'react-icons/tb';
import { FaTableList } from "react-icons/fa6";
import { FaStore } from 'react-icons/fa';
import { PiReadCvLogoBold } from 'react-icons/pi';

function Sidemenu() {
  const [menubutton, setMenuButton] = useState(false); // وضعیت منو
  const [submenu, SetSubMenu] = useState(false); // وضعیت زیر منو

  // باز کردن و بستن منو
  const changemenubbutton = () => {
    setMenuButton(!menubutton);
  };

  // دکمه خروج
  const [openExitModal, setOpenExitModal] = useState(false);
  const ExitButton = () => {
    setOpenExitModal(true);
  };

  // حذف توکن و انتقال به صفحه ورود
  const navigate = useNavigate();
  const confirmExit = () => {
    localStorage.removeItem('loginToken');
    navigate('/auth/login');
  };

  // باز کردن زیر منو
  const opensubmen = () => {
    SetSubMenu(!submenu);
  };

  return (
    <>
      {/* لایه پس‌زمینه نیمه‌شفاف */}
      {menubutton && (
        <div
          className="fixed  inset-0 bg-dark bg-opacity-50 z-30"
          onClick={changemenubbutton} // بستن منو با کلیک روی پس‌زمینه
        ></div>
      )}

      <div
        className={`h-full fixed top-0 right-0 z-40 overflow-auto scrollbar-hide ${menubutton ? 'bg-menuBg duration-300 shadow-2xl' : 'duration-300 h-screen -mx-0'}`}
      >
        <div className={` mx-8 ${menubutton ? 'text-white pt-3 duration-300 mx-20 w-48 ' : ' pt-3 duration-300 w-0'}`}>
          {menubutton ? (
            <button onClick={changemenubbutton}>
              <IoIosCloseCircleOutline size={24} className="md:-mx-16 sm:-mx-10" />
            </button>
          ) : (
            <button onClick={changemenubbutton}>
              <CgMenuMotion size={24} />
            </button>
          )}
        </div>

        <div className={` flex flex-col gap-5  text-right text-textPrimary ${menubutton ? 'block' : 'hidden'} h-full `}>
          <NavLink
            onClick={changemenubbutton}
            to="/"
            className={({ isActive }) =>
              `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
            }
          >
            <span className="flex items-center justify-end gap-2">
              داشبرد
              <LuLayoutDashboard />
            </span>
          </NavLink>

          <div>
            <button
              onClick={opensubmen}
              className={`flex items-center gap-2 transition-all duration-500 text-left w-full justify-end px-4 py-2 ${submenu ? 'bg-submenuBg ' : 'hover:bg-menuHover'}`}
            >
              <span className="w-full">
                {/* انیمیشن آیکون */}
                <IoMdArrowDropdown
                  size={20}
                  className={`transform transition-transform duration-300 ${submenu ? 'rotate-180' : 'rotate-0'}`}
                />
              </span>
              فروشگاه
              <FaStore className="flex" size={28} />
            </button>

            <div className={`overflow-hidden transition-all duration-500 ${submenu ? 'max-h-[500px] bg-submenuBg opacity-100' : 'max-h-0 opacity-0'}`}>
              <NavLink
                onClick={changemenubbutton}
                to="/admin/categories"
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
                }
              >
                <span className="flex items-center justify-end gap-2">
                  مدیریت گروه محصولات
                  <MdOutlineProductionQuantityLimits size={20} />
                </span>
              </NavLink>

              <NavLink
                onClick={changemenubbutton}
                to="/admin/brands"
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
                }
              >
                <span className="flex items-center justify-end gap-2">
                  مدیریت برندها
                  <TbBrandSketchFilled size={20} />
                </span>
              </NavLink>

              <NavLink
                onClick={changemenubbutton}
                to="/admin/garranty"
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
                }
              >
                <span className="flex items-center justify-end gap-2">
                  گارانتی ها
                  <TbLicense />
                </span>
              </NavLink>

              <NavLink
                onClick={changemenubbutton}
                to="/admin/colors"
                className={({ isActive }) =>
                  `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
                }
              >
                <span className="flex items-center justify-end gap-2">
                  رنگ ها
                  <MdOutlineInvertColors />
                </span>
              </NavLink>
            </div>
          </div>

          {/* <NavLink
            onClick={changemenubbutton}
            to="/admin/essay"
            className={({ isActive }) =>
              `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
            }
          >
            <span className="flex items-center justify-end gap-2">
              مقالات
              <PiReadCvLogoBold size={20} />
            </span>
          </NavLink> */}

          <NavLink
            onClick={changemenubbutton}
            to="/admin/roles"
            className={({ isActive }) =>
              `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
            }
          >
            <span className="flex items-center justify-end gap-2">
              مدیرت نقش ها
              <MdManageAccounts size={20} />
            </span>
          </NavLink>


          <NavLink
            onClick={changemenubbutton}
            to="/admin/permissions"
            className={({ isActive }) =>
              `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
            }
          >
            <span className="flex items-center justify-end gap-2">
              مجوز ها
              <FaTableList size={20} />
            </span>
          </NavLink>


          {/* <div>
            <NavLink
              onClick={changemenubbutton}
              to="/admin/products"
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
              }
            >
              <span className="flex items-center justify-end gap-2">
                مدیرت محصولات
                <MdManageAccounts size={20} />
              </span>
            </NavLink>



            <NavLink
              onClick={changemenubbutton}
              to="/admin/users"
              className={({ isActive }) =>
                `block py-3 px-4 rounded-lg transition duration-300 ${isActive ? 'bg-menuHover border-l-2 border-rose-500 font-bold' : 'hover:bg-menuHover'}`
              }
            >
              <span className="flex items-center justify-end gap-2">
                مدیرت کاربران
                <MdManageAccounts size={20} />
              </span>
            </NavLink>
          </div> */}

          <button onClick={ExitButton} className={`pb-10 hover:bg-menuHover py-3 ${menubutton ? 'block text-right' : 'hidden'}`}>
            <span className="flex items-center justify-end gap-2 mx-4">
              خروج
              <ImExit />
            </span>
          </button>
        </div>

        <Modal isOpen={openExitModal} onClose={() => setOpenExitModal(false)}>
          <div className="text-center">
            <p>آیا مطمئن هستید که می‌خواهید خارج شوید؟</p>
            <div className="flex justify-center mt-4 gap-4">
              <button onClick={confirmExit} className="px-4 py-2 bg-red-500 text-white rounded">
                بله
              </button>
              <button onClick={() => setOpenExitModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                خیر
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Sidemenu;
