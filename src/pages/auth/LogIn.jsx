import axios from 'axios';
import React, { useState } from 'react';
import toast, { LoaderIcon, Toaster } from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { urlAxios } from '../../Services/URL';

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [submit, setSubmit] = useState(false);
  const location = useLocation();
  const [data, setData] = useState({
    phone: '',
    password: '',
    remember: false,
  });

  const togglePasswordVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  const validateInputs = () => {
    const newErrors = {};

    // Validate phone number
    if (!data.phone) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^09\d{9}$/.test(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Validate password
    if (!data.password) {
      newErrors.password = 'Please enter your password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setData({
      ...data,
      [id]: type === 'checkbox' ? checked : value,
    });

    // Remove errors dynamically when conditions are met
    if (id === 'password' && value.length >= 8) {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors;
        return rest;
      });
    }
    if (id === 'phone' && /^09\d{9}$/.test(value)) {
      setErrors((prevErrors) => {
        const { phone, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop submission if validation fails

    setSubmit(true); // Set submitting state

    urlAxios.post('/auth/login', {
      ...data,
      remember: data.remember ? '1' : '0',
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('loginToken', JSON.stringify(res.data));
          navigate('/'); // Navigate if needed
          toast.success(res.data.message)
        }
      })
      .catch((err) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          global: 'Login failed. Please check your credentials.',
        }));
      })
      .finally(() => {
        setSubmit(false);
      });
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="relative h-screen bg-contain bg-center">
        <div className="flex justify-center items-center h-full font-serif">
          <div className="md:w-2/6 w-5/6 items-center p-10 border border-gray-300 rounded-2xl shadow-2xl bg-white bg-opacity-50">
            <form onSubmit={sendData} className="flex flex-col gap-5">
              {
                location.pathname === '/auth/login'
                  ?
                  (<h1 className='text-right font-vazirmatn text-3xl text-gray-500 '> صفحه ورود</h1>)
                  :
                  (<h1>register</h1>)
              }
              <div className="flex flex-col gap-3 mb-5">
                <label htmlFor="phone" className="font-vazirmatn cursor-pointer text-gray-600">
                  شماره همراه:<span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  className="w-full border rounded-3xl p-2 ring-gray-100 shadow-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                  type="text"
                  placeholder="Enter your phone number"
                  value={data.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <span className="text-red-500 animate-pulse">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="password" className="font-vazirmatn cursor-pointer text-gray-600">
                  رمز عبور:<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full border rounded-3xl p-2 ring-gray-100 shadow-xl outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    type={visiblePassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={handleInputChange}
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className={`absolute top-2.5 right-5 ${visiblePassword ? 'text-black' : 'text-gray-500'}`}
                    type="button"
                  >
                    {visiblePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
                {errors.password && <span className="text-red-500 animate-pulse">{errors.password}</span>}
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="remember"
                  type="checkbox"
                  checked={data.remember}
                  onChange={handleInputChange}
                />
                <label htmlFor="remember" className="font-vazirmatn cursor-pointer text-gray-600">
                  مرا به خاطر نگه دار
                </label>
              </div>
              <button
                type="submit"
                className="border bg-green-500 font-vazirmatn text-white rounded-3xl flex justify-center items-center py-2 mt-5"
                disabled={submit}
              >
                {submit ? (
                  <div className="flex items-center gap-1">
                    <span>لطفا کمی صبر کنید...</span>
                    <LoaderIcon />
                  </div>
                ) : (
                  'ورود'
                )}
              </button>
              {errors.global && <span className="text-red-500 text-center mt-3 animate-pulse">{errors.global}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
