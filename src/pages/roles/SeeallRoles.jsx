import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Table from "../../component/Table/Table";

import { urlAxios } from "../../Services/URL";
import { Link, useNavigate, useParams } from "react-router-dom";


const SeeallRoles = () => {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false)


    // فیلدهای جدول
    const datainfo = [
        { feild: "id", title: "#" },
        { feild: "title", title: "عنوان" },
        { feild: "description", title: "توضیحات" },
    ];


    const AdditionalFeild = [
       
    ];


    const searchparams = {
        title: 'جستجو',
        placeholder: 'قسمتی از عنوان رو جست و جو کنید',
        searchfeild: 'title'
    };

   


    // دریافت داده‌ها
    useEffect(() => {
        setLoader(false);
        urlAxios
            .get(`/admin/permissions`)
            .then((res) => {
                setData(res.data.data);
                setLoader(false);

            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, [flag]);


    return (
            <Table
                data={data}
                datainfo={datainfo}
                AdditionalFeild={AdditionalFeild}
                // onAddButtonClick={handleModalOpen}
                loader={loader}
                searchparams={searchparams}
            />
        
    
        
    );
};

export default SeeallRoles;
