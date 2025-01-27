import React from "react";
import { FastField } from "formik";

function File(props) {
    const { name, label } = props;

    const handleFileChange = (e, field, form) => {
        const file = e.target.files[0];
        if (file) {
            // بررسی حجم فایل
            if (file.size > 2 * 1024 * 1024) {
                form.setFieldError(name, "اندازه فایل نباید بیشتر از ۲ مگابایت باشد");
                return;
            }
            form.setFieldValue(name, file);

            // ذخیره پیش‌نمایش
            const reader = new FileReader();
            reader.onload = () => {
                form.setFieldValue(`${name}_preview`, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2">
                {label}
            </label>
            <FastField name={name}>
                {({ field, form }) => (
                    <div>
                        <input
                            type="file"
                            id={name}
                            onChange={(e) => handleFileChange(e, field, form)}
                            accept="image/jpeg,image/png"
                        />
                        {form.values[`${name}_preview`] && (
                            <img
                                src={form.values[`${name}_preview`]}
                                alt="پیش‌نمایش"
                                className="mt-2 w-24 h-24 object-cover rounded"
                            />
                        )}
                        {form.values[name] && (
                            <button
                                type="button"
                                onClick={() => form.setFieldValue(name, null)}
                                className="text-red-500 text-xs mt-2"
                            >
                                حذف فایل
                            </button>
                        )}
                        {form.errors[name] && form.touched[name] && (
                            <div className="text-red-500 text-xs mt-1">
                                {form.errors[name]}
                            </div>
                        )}
                    </div>
                )}
            </FastField>
        </div>
    );
}

export default File;
