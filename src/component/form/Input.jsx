import { ErrorMessage, FastField } from 'formik'
import React from 'react'

function Input(props) {

    const { name, label, type } = props;

    return (
        <div>
            <label htmlFor={props.name} className="block text-gray-700 mb-2">{props.label}</label>
            <FastField

                id={props.name}
                type={type}
                name={props.name}
                className={`w-full px-4 py-2 border rounded ${ErrorMessage.parentCategory && ErrorMessage.parentCategory
                    ? "border-red-500"
                    : "border-gray-300"
                    }`}
            />
            {ErrorMessage.parentCategory && (
                <p className="text-red-500` text-sm">{ErrorMessage.parentCategory}</p>
            )}
        </div>

    )
}

export default Input