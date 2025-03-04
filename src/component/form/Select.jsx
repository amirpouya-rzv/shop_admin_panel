import { FastField } from 'formik';
import React from 'react';

function Select(props) {
    const { name, label, options } = props; // مقدار پیش‌فرض برای options

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2">{label}</label>
            <FastField
                id={name}
                as="select"
                name={name}
                className="w-full px-4 py-2 border rounded"
            >
                <option>دسته والد را انتخاب کنید ...</option>
                {options.map(o => (
                    <option key={o.id} value={o.id}>
                        {o.value}
                    </option>
                ))}
            </FastField>
        </div>
    );
}

export default Select;