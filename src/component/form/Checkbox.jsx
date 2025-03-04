import { Field } from "formik";
import React from "react";

function Checkbox(props) {
    const { name, label, options = [] } = props;

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2">{label}</label>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4"> {/* 4 ستون در موبایل، 5 ستون در صفحه بزرگ */}
                {options.map((option) => (
                    <Field name={name} key={option.id}>
                        {({ field, form }) => {
                            const { value } = field;
                            const checked = value.includes(option.id);

                            return (
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={option.id}
                                        className="mr-2"
                                        checked={checked}
                                        onChange={() => {
                                            const newValue = checked
                                                ? value.filter((val) => val !== option.id)
                                                : [...value, option.id];

                                            form.setFieldValue(name, newValue);
                                        }}
                                    />
                                    <label htmlFor={option.id} className="cursor-pointer">{option.title}</label>
                                </div>
                            );
                        }}
                    </Field>
                ))}
            </div>
        </div>
    );
}

export default Checkbox;
