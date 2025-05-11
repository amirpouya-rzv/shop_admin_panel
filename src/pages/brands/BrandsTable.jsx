import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Table from "../../component/Table/Table";
import Modal from "../../component/Modal/Modal";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import { urlAxios } from "../../Services/URL";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {  Form, Formik } from "formik";
import FormikControl from "../../component/form/FormikControl";
import * as Yup from "yup";
import { IoIosCloseCircleOutline } from "react-icons/io";

const BrandsTable = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [editbrand, setEditBrand] = useState(null);
    
    
    //فرایند حذف
    const [flag, setFlag] = useState(false)
    const handleModalClose = () => setIsModalOpen(false);
    const handleDeleteModalOpen = (id) => {
        setItemIdToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => setIsDeleteModalOpen(false);


    // فیلدهای جدول
    const datainfo = [
        { feild: "id", title: "#" },
        { feild: "original_name", title: "عنوان لاتین" },
        { feild: "persian_name", title: "عنوان فارسی" },
        { feild: "descriptions", title: "توضیحات" },
    ];

    const AdditionalFeild = [
            // نمایش لوگو
        // {
        //     title: "لوگو",
        //     elements: (rowdata) =>
        //         rowdata.logo ? (
        //             <img
        //                 src={`http://ecomadminapi.azhadev.ir/${rowdata.logo}`}
        //                 alt={rowdata.original_name}
        //                 className="w-10"
        //             />
        //         ) : (
        //             <h1 className="text-red-500">لوگو ندارد</h1>
        //         ),
        // },
        {
            title: "عملیات",
            elements: (rowdata) => additionalElements(rowdata),
        },
    ];

    //جستو جو
    const searchparams = {
        title: 'جستجو',
        placeholder: 'قسمتی از عنوان رو جست و جو کنید',
        searchfeild: 'original_name'
    };

    //   (ویرایش و حذف) دکمه ها
    const additionalElements = ({ id }) => (
        <div className="text-xl text-center flex justify-center gap-1 title-font font-medium items-center">
            <Link onClick={() => { handleModalOpen(id) }}>
                <button title="ویرایش">
                    <MdOutlineModeEdit className="text-green-500 hover:text-green-800" />
                </button>
            </Link>
            <button title="حذف" onClick={() => handleDeleteModalOpen(id)}>
                <RiDeleteBinLine className="text-rose-500 hover:text-rose-800" />
            </button>
        </div>
    );


    // اسکیما اعتبارسنجی فرم
    const validationSchema = Yup.object({
        original_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, "عنوان حتما باید انگلیسی باشد") // فقط حروف انگلیسی و فاصله
            .required("عنوان لاتین ضروری است"),
        persian_name: Yup.string()
            .matches(/^[\u0600-\u06FF\s]+$/, "عنوان حتما باید فارسی باشد") // فقط حروف فارسی
            .required("عنوان فارسی ضروری است"),
        descriptions: Yup.string(),
        logo: Yup.mixed()
            .nullable()
            .test(
                "fileformat",
                "فرمت فایل باید jpg یا png باشد",
                (value) => !value || ["image/jpg", "image/png"].includes(value?.type)
            ),
    });

    // مقدار اولیه فرم
    const initialvalues = {
        original_name: "",
        persian_name: "",
        descriptions: "",
        logo: null,
    };


    // دریافت داده‌ها
    useEffect(() => {
        setLoader(true);
        urlAxios
            .get(`/admin/brands`)
            .then((res) => {
                setData(res.data.data);
                setLoader(false);

            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, [flag]);

    // حذف برند
    const handleDeleteConfirm = (id) => {
        urlAxios
            .delete(`/admin/brands/${id}`)
            .then((res) => {
                setItemIdToDelete(null);
                if (res.status === 200) {
                    toast.success(res?.data?.message);
                    setFlag(!flag);
                } else {
                }
            })
            .catch((err) => {
                toast.error(err?.response?.data?.message);
            });
        setIsDeleteModalOpen(false);
    };


    // ارسال فرم
    const onSubmit = (values) => {
        const formData = new FormData();
        formData.append("original_name", values.original_name);
        formData.append("persian_name", values.persian_name);
        formData.append("descriptions", values.descriptions || "");
        // if (values.logo) formData.append("logo", values.logo);

        if (values.id) {
            urlAxios
                .post(`/admin/brands/${values.id}`, formData)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setData([...data, res.data.data]);
                    setIsModalOpen(false);
                    setFlag(!flag);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                    console.error(err);
                })
                .finally(() => {
                    setLoader(false);
                    setEditBrand("");
                }
                );

        } else {
            urlAxios
                .post("/admin/brands", formData)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setData([...data, res.data.data]);
                    setIsModalOpen(false);
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message);
                    setLoader(false);
                    console.error(err);
                })
                .finally(() => {
                    setLoader(false);
                    setEditBrand("");
                }
                );
        }

    };


    //  باز و بستن مدال‌ برای ویرایش
    const handleModalOpen = (id) => {
        setIsModalOpen(true);
        urlAxios
            .get(`/admin/brands/${id}`)
            .then((res) => {
                setEditBrand(res.data.data);
                setLoader(false);

            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }




    return (
        <div>
            <Table
                data={data}
                datainfo={datainfo}
                AdditionalFeild={AdditionalFeild}
                onAddButtonClick={handleModalOpen}
                loader={loader}
                searchparams={searchparams}
            />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* مدال */}
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="افزودن برند">
                <button onClick={handleModalClose}>
                    <IoIosCloseCircleOutline size={25} className="-mt-10 mx-[610px] mb-6" />
                </button>

                <Formik
                    initialValues={editbrand || initialvalues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    <Form style={{ direction: "rtl" }} encType="multipart/form-data">
                        <div className="flex flex-col gap-3">

                            <FormikControl
                                control="input"
                                name="original_name"
                                label="عنوان لاتین"
                            />

                            <FormikControl
                                control="input"
                                name="persian_name"
                                label="عنوان فارسی"
                            />

                            <FormikControl
                                control="textarea"
                                name="descriptions"
                                label="توضیحات"
                            />

                            {/* <FormikControl
                             control="file"
                              name="logo"
                               label="تصویر"
                                />
                        <ErrorMessage name="logo" component="div" className="text-red-500" /> */}

                        </div>
                        <div className="flex justify-end gap-5 ">
                            <button type="submit" className="mt-4 bg-dark text-white py-2 px-4 rounded-lg">
                                {editbrand ? "ویرایش" : "ثبت"}
                            </button>
                            <button type="button" onClick={() => { handleModalClose(); setEditBrand("") }} className="mt-4 bg-rose-700 text-white py-2 px-4 rounded-lg">
                                انصراف
                            </button>
                        </div>
                    </Form>
                </Formik>
            </Modal>
            <DeleteModal isOpen={isDeleteModalOpen} onClose={handleDeleteModalClose} onConfirm={() => handleDeleteConfirm(itemIdToDelete)} />
        </div>
    );
};

export default BrandsTable;
