import { FastField } from "formik";
import React, { Fragment } from "react";

function Radio(props) {
    const { name, label, options  } = props;

    return (
        <div>
            <label htmlFor={name} className="block text-gray-700 mb-2">
                {label}
            </label>
            <FastField name={name}>
                {({ field }) => {
                    return options.map((option) => (
                        <Fragment key={option.id}>
                            <input
                                type="radio"
                                id={`radio${option.id}`}
                                {...field}
                                value={option.id}
                                checked={field.value === option.id}
                                className="mr-2"
                            />
                            <label htmlFor={`radio${option.id}`} className="mr-4">
                                {option.value}
                            </label>
                        </Fragment>
                    ));
                }}
            </FastField>
        </div>
    );
}

export default Radio;
