import React from 'react';
import Input from './Input';
import Textarea from './Textarea';  // اصلاح اشتباه تایپی
import Select from './Select';
import Radio from './Radio';
import Checkbox from './Checkbox';
import File from './File';
import Switch from './Switch';
import Datae from './Datae';
import MultiSelect from './MultiSelect'; // اصلاح نام کامپوننت
import SearchableSelect from './SearchableSelect';

function FormikControl(props) {
    switch (props.control) {
        case "input":
            return <Input {...props} />;
        case "textarea":
            return <Textarea {...props} />;
        case "select":
            return <Select {...props} />;
        case "radio":
            return <Radio {...props} />;
        case "checkbox":
            return <Checkbox {...props} />;
        case "file":
            return <File {...props} />;
        case "switch":
            return <Switch {...props} />;
        case "datae":
            return <Datae {...props} />;
        case "multiSelect":
            return <MultiSelect {...props} />; 
        case "searchableSelect":
            return <SearchableSelect/>
        default:
            return null;
    }
}

export default FormikControl;
