import { FastField } from 'formik'
import React from 'react'

function Textarea(props) {

    const {name,label,placeholder} = props;

    return (
        <div>
            <label htmlFor={props.name} className="block text-gray-700 mb-2">{props.label}</label>
            <FastField
                id={props.name}
                as="textarea"
                name={props.name}
                className={`w-full px-4 py-2 border rounde`}
            />
            
        </div>

    )
}

export default Textarea