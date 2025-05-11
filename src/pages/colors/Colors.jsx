import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Table from "../../component/Table/Table";
import Modal from "../../component/Modal/Modal";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import { urlAxios } from "../../Services/URL";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage, Field, Form, Formik } from "formik";
import FormikControl from "../../component/form/FormikControl";
import * as Yup from "yup";

const Colors = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [editcolor, setEditColor] = useState(null);


    // بستن مدال
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditColor(null);
    };

    // تابع حذف در مدال
    const handleDeleteModalOpen = (id) => {
        setItemIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => setIsDeleteModalOpen(false);
    //فیلدهای اصلی جدول
    const datainfo = [
        { feild: "title", title: "عنوان" },
        { feild: "code", title: "کد رنگ" },
    ];
    // فیلدهای اضافی حدول
    const AdditionalFeild = [
        {
            title: "نمایش رنگ",
            elements: (rowdata) => (
                <div
                    className=" h-5 w-full rounded-full border"
                    style={{ backgroundColor: rowdata.code }}
                ></div>
            ),
        },
        {
            title: "عملیات",
            elements: (rowdata) => additionalElements(rowdata),
        },
    ];

    //قسمت جستو جو
    const searchparams = {
        title: "جستجو",
        placeholder: "قسمتی از عنوان رو جست و جو کنید",
        searchfeild: "title"
    };


    // دکمه ها(حذف و ویرایش)
    const additionalElements = ({ id }) => (
        <div className="text-xl text-center flex justify-center gap-1 items-center">
            <button title="ویرایش" onClick={() => handleModalOpen(id)}>
                <MdOutlineModeEdit className="text-green-500 hover:text-green-800" />
            </button>
            <button title="حذف" onClick={() => handleDeleteModalOpen(id)}>
                <RiDeleteBinLine className="text-rose-500 hover:text-rose-800" />
            </button>
        </div>
    );

    //اعتبار سنجی
    const validationSchema = Yup.object({
        title: Yup.string().required("عنوان  ضروری است"),
        code: Yup.string().required("کد رنگ ضروری است"),
    });


    const initialvalues = {
        title: "",
        code: "",
    };


//دریافت داده ها
    useEffect(() => {
        setLoader(true);
        urlAxios
            .get("admin/colors")
            .then((res) => {
                setData(res.data?.data || []);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, []);


    // ویرایش
    const handleModalOpen = (id) => {
        setIsModalOpen(true);
        setLoader(true);
        urlAxios
            .get(`/admin/colors/${id}`)
            .then((res) => {
                setEditColor(res.data.data);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    };


    //حذف
    const handleDeleteConfirm = (id) => {
        urlAxios
            .delete(`admin/colors/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setData(data.filter((item) => item.id !== id));
                }
            })
            .catch(() => toast.error("اشکال در فرایند حذف"));
        setIsDeleteModalOpen(false);
    };

        //سابمیت فرم
    const onSubmit = (values) => {
        setLoader(true);
        if (values.id) {
            urlAxios
                .put(`admin/colors/${values.id}`, values)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setIsModalOpen(false);
                    setEditColor(null);
                    setData(data.map((item) => (item.id === values.id ? res.data.data : item)));
                })
                .catch((err) => toast.error(err?.response?.data?.message))
                .finally(() => setLoader(false));
        } else {
            urlAxios
                .post("admin/colors", values)
                .then((res) => {
                    toast.success(res?.data?.message);
                    setData([...data, res.data.data]);
                    setIsModalOpen(false);
                })
                .catch((err) => toast.error(err?.response?.data?.message))
                .finally(() => setLoader(false));
        }
    };

    return (
        <div>
            <Table
                data={data || []}
                datainfo={datainfo}
                AdditionalFeild={AdditionalFeild}
                onAddButtonClick={() => setIsModalOpen(true)}
                loader={loader}
                searchparams={searchparams}
            />

            <Toaster position="top-center" reverseOrder={false} />
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="افزودن رنگ">
                <Formik initialValues={editcolor || initialvalues} validationSchema={validationSchema} onSubmit={onSubmit} enableReinitialize>
                    <Form>
                        <FormikControl control="input" name="title" label="عنوان" />
                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

                        <div className="mb-4">
                            <label htmlFor="code">کد رنگ</label>
                            <Field name="code">
                                {({ field }) => (
                                    <input type="color" id="code" {...field} className="w-52 h-10 p-1 border cursor-pointer" />
                                )}
                            </Field>
                            <ErrorMessage name="code" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div className="flex justify-end gap-5">
                            <button type="submit" className="bg-dark text-white py-2 px-4 rounded-lg">
                                {editcolor ? "ویرایش" : "ثبت"}
                            </button>
                            <button type="button" onClick={handleModalClose} className="bg-rose-700 text-white py-2 px-4 rounded-lg">
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

export default Colors;
