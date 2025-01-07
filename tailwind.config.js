/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        elMessiri: ['"El Messiri"', 'serif'],
        vazirmatn: ['"Vazirmatn"', 'sans-serif'],
      },
      colors: {
        dark: "#19181F",
        primary: "#6C5CE7", // بنفش
        secondary: "#74B9FF", // آبی روشن
        background: "#F1F2F6", // زمینه
        card: "#FFFFFF", // کارت‌ها
        success: "#55EFC4", // موفقیت
        warning: "#FDCB6E", // هشدار
        danger: "#D63031", // خطر
        accent: "#FAB1A0", // تأکید
        border: "#D1D8E0", // حاشیه‌ها
        menuBg: "#2C3E50", // پس‌زمینه منو
        menuHover: "#34495E", // هاور/فعال
        submenuBg: "#1A252F", // پس‌زمینه زیرمنو
        textPrimary: "#ECF0F1", // متن اصلی
        textSecondary: "#BDC3C7", // متن فرعی
        textActive: "#FFFFFF", // متن فعال
        highlight: "#E74C3C", // رنگ تأکیدی
        icon: "#3498DB", // آیکون‌ها
      },
    },
  },
  plugins: [],
};
