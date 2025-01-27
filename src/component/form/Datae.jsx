import React, { useEffect, useState } from "react";
import { ErrorMessage, FastField } from "formik";
import jMoment from "moment-jalaali";

function Date(props) {
  const { formik, name, label, icon } = props;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: 1, label: "فروردین" },
    { value: 2, label: "اردیبهشت" },
    { value: 3, label: "خرداد" },
    { value: 4, label: "تیر" },
    { value: 5, label: "مرداد" },
    { value: 6, label: "شهریور" },
    { value: 7, label: "مهر" },
    { value: 8, label: "آبان" },
    { value: 9, label: "آذر" },
    { value: 10, label: "دی" },
    { value: 11, label: "بهمن" },
    { value: 12, label: "اسفند" },
  ];

  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState([]);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const now = jMoment();
    setDay(now.jDate());
    setMonth(now.jMonth() + 1); // ماه‌ها از ۰ شروع می‌شوند، بنابراین باید ۱ اضافه شود
    setYear(now.jYear());
  }, []);

  const handleShowDataConfig = () => {
    setShowConfig(true);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 mb-2">
        {label}
      </label>
      <FastField
        disabled
        id={name}
        name={name}
        className={`w-full px-4 py-2 border rounded ${
          formik.errors[name] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {formik.errors[name] && (
        <p className="text-red-500 text-sm">{formik.errors[name]}</p>
      )}

      {/* مثال اضافه برای نمایش روز، ماه و سال */}
      {showConfig && (
        <div className="mt-4">
          <p>روز: {day}</p>
          <p>ماه: {months.find((m) => m.value === month)?.label}</p>
          <p>سال: {year}</p>
        </div>
      )}
      <button
        type="button"
        onClick={handleShowDataConfig}
        className="mt-2 text-blue-500 underline"
      >
        نمایش اطلاعات تاریخ
      </button>
    </div>
  );
}

export default Date;
