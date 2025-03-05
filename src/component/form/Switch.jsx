import React from "react";
import { FastField } from "formik";

function Switch({ name, label }) {
    return (
        <div className="flex items-center space-x-4 my-4 gap-5">
            <label htmlFor={name} className="text-gray-700">
                {label}
            </label>
            <FastField name={name}>
                {({ field }) => (
                    <label className="relative inline-block w-12 h-6">
                        <input
                            type="checkbox"
                            id={name}
                            {...field}
                            className="sr-only peer"
                        />
                        <div
                            className="w-full h-full bg-gray-300 peer-focus:ring-2 
                            peer-focus:ring-sky-300 peer-checked:bg-sky-500 
                            rounded-full transition duration-300"
                        ></div>
                        <div
                            className="absolute top-0.5 left-0.5 w-5 h-5 bg-white 
                            rounded-full peer-checked:translate-x-6 
                            transition-transform duration-300"
                        ></div>
                    </label>
                )}
            </FastField>
        </div>
    );
}

export default Switch;
