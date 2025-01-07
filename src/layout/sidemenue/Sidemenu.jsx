import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { CgMenuMotion } from 'react-icons/cg';
import { MdOutlineInvertColors, MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { ImExit } from 'react-icons/im';

function Sidemenu() {
  // استیت برای منوی باز و بسته
  const [menubutton, setMenuButton] = useState(false);
  const changemenubbutton = () => {
    setMenuButton(!menubutton);
  };

  const navigate = useNavigate();

  // برای خروج از حساب کاربری
  const ExitButton = () => {
    navigate('/auth/login');
    localStorage.removeItem("loginToken");
  };

  return (
    <div
      className={`h-full fixed top-0 right-0 z-40 ${menubutton ? "bg-menuBg duration-300 shadow-2xl" : "duration-300 h-screen -mx-0"}`}
    >
      {/* دکمه منو (باز و بسته کردن منو) */}
      <div className={`pt-5 mx-8 ${menubutton ? "duration-300 mx-20 w-48" : "duration-300 w-0"}`}>
        {
          menubutton ?
            <button onClick={changemenubbutton}><IoIosCloseCircleOutline size={24} className='md:-mx-16 sm:-mx-10' /></button>
            :
            <button onClick={changemenubbutton}><CgMenuMotion size={24} /></button>
        }
      </div>

      {/* منوهای نوار کناری */}
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
          to="/admin/album"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          آلبوم
        </NavLink>

        <NavLink
          onClick={changemenubbutton}
          to="/admin/category"
          className={({ isActive }) =>
            `block py-3 px-4 rounded-lg transition duration-300 ${isActive
              ? 'bg-menuHover border-l-2 border-rose-500 font-bold'
              : 'hover:bg-menuHover'
            }`
          }
        >
          <span className='flex items-center justify-end gap-2'>
            محصولات
            <MdOutlineProductionQuantityLimits size={20} />
          </span>
        </NavLink>

        {/* رنگها */}


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

        {/* دکمه خروج */}
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
    </div>
  );
}

export default Sidemenu;
