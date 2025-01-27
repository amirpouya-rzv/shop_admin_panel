import axios from "axios";

const loginToken = JSON.parse(localStorage.getItem('loginToken'))?.token; // دریافت توکن از localStorage

export const urlAxios = axios.create({
  baseURL: 'http://ecomadminapi.azhadev.ir/api', // آدرس پایه API
  headers: {
    Authorization: loginToken ? `Bearer ${loginToken}` : null, // استفاده از توکن در هدر
    "Content-Type": "application/json", // نوع محتوای درخواست
  },
  timeout: 5000, // مدت زمان تایم‌اوت (بر حسب میلی‌ثانیه)
  timeoutErrorMessage: "زمان پاسخ گویی طولانی شد!", // پیام خطای تایم‌اوت
});
