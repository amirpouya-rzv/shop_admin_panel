import { ErrorMessage, FastField } from "formik";
import React from "react";

function Input({ name, label, type = "text" }) {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2">{label}</label>
            <FastField name={name}>
                {({ field, meta }) => (
                    <div>
                        <input
                            {...field}
                            id={name}
                            type={type}
                            value={field.value || ''}  // مقداردهی اولیه به ورودی
                            className={`w-full px-4 py-2 border rounded ${meta.touched && meta.error ? "border-red-500" : "border-gray-300"}`}
                        />
                        {meta.touched && meta.error && (
                            <p className="text-red-500 text-sm">{meta.error}</p>
                        )}
                    </div>
                )}
            </FastField>
        </div>
    );
}

export default Input;
