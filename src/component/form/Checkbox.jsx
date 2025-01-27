import { FastField } from "formik";
import React, { Fragment } from "react";

function Checkbox(props) {
    const { name, label, options=[] } = props;

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
                                type="checkbox"
                                id={option.value}
                                {...field}
                                value={option.value}
                                checked={field.value.includes(option.value)}
                                className="mr-2"
                            />
                            <label htmlFor={option.value} className="mr-4">
                                {option.value}
                            </label>
                        </Fragment>
                    ));
                }}
            </FastField>
        </div>
    );
}

export default Checkbox;
