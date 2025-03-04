import React, { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Table from "../../component/Table/Table";
import Modal from "../../component/Modal/Modal";
import DeleteModal from "../../component/DeleteModal/DeleteModal";
import { urlAxios } from "../../Services/URL";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ErrorMessage, Form, Formik } from "formik";
import FormikControl from "../../component/form/FormikControl";
import * as Yup from "yup";
import { IoIosCloseCircleOutline } from "react-icons/io";

const GarrantyTable = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false)
    const [editgarranty, setEditGarranty] = useState(null);

    const handleModalClose = () => setIsModalOpen(false);
    const handleDeleteModalOpen = (id) => {
        setItemIdToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const handleDeleteModalClose = () => setIsDeleteModalOpen(false);


    // فیلدهای جدول
    const datainfo = [
        { feild: "title", title: "عنوان" },
        { feild: "descriptions", title: "توضیحات" },
        { feild: "length", title: " مدت گارانتی" },
        { feild: "length_unit", title: "واحد" },
    ];


    // نمایش لوگو
    const AdditionalFeild = [
        {
            title: "عملیات",
            elements: (rowdata) => additionalElements(rowdata),
        },
    ];


    const searchparams = {
        title: 'جستجو',
        placeholder: 'قسمتی از عنوان رو جست و جو کنید',
        searchfeild: 'title'
    };

    // دکمه‌های عملیات (ویرایش و حذف)
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
        title: Yup.string().required("این فیلد ضروری است"),
        length_unit: Yup.string()
            .oneOf(["روز", "ماه", "سال"], "واحد طول باید روز، ماه یا سال باشد")
            .required("این فیلد ضروری است"),
        length: Yup.number()
            .typeError("ورودی باید به صورت عدد باشد")
            .required("این فیلد ضروری است")
            .positive("عدد باید مثبت باشد")
            .integer("عدد باید صحیح باشد"),
    });

    // مقدار اولیه فرم
    const initialvalues = {
        title: "",
        length: "",
        descriptions: "",
        length_unit: "",
    };

    // دریافت داده‌ها
    useEffect(() => {
        setLoader(false);
        urlAxios
            .get(`admin/guarantees`)
            .then((res) => {
                setData(res.data.data);
                setLoader(false);

            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }, [flag]);


    //  باز کردن و بستن مدال‌ها برای ویرایش
    const handleModalOpen = (id) => {
        setIsModalOpen(true);
        urlAxios
            .get(`/admin/guarantees/${id}`)
            .then((res) => {
                setEditGarranty(res.data.data);
                setLoader(false);
            })
            .catch((err) => {
                console.error(err);
                setLoader(false);
            });
    }





    // حذف برند
    const handleDeleteConfirm = (id) => {
        urlAxios
            .delete(`admin/guarantees/${id}`)
            .then((res) => {
                setItemIdToDelete(null);
                if (res.status === 200) {
                    toast.success(`برند با موفقیت حذف شد`);
                    setFlag(!flag);
                } else {
                }
            })
            .catch((err) => {
                toast.error(`اشکال در فرایند حذف`)
            });
        setIsDeleteModalOpen(false);
    };


    // ارسال فرم
    const onSubmit = (values) => {
        if (values.id) {
            urlAxios
                .put(`admin/guarantees/${values.id}`, values)
                .then((res) => {
                    toast.success(res.data.message);
                    setData(res.data.data);
                    setIsModalOpen(false);
                    setFlag(!flag);
                })
                .catch((err) => {
                    toast.error("مشکلی پیش آمده است");
                    console.error(err);
                })
                .finally(() => {
                    setLoader(false);
                }
                );

        } else {
            urlAxios
                .post("admin/guarantees", values)
                .then((res) => {
                    toast.success(res.data.message);
                    setData(res.data.data);
                    setIsModalOpen(false);
                    setFlag(!flag);
                })
                .catch((err) => {
                    toast.error("مشکلی پیش آمده است!");
                    console.error(err);
                })
                .finally(() => {
                    setLoader(false);
                }
                );
        }

    };





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
            <Modal isOpen={isModalOpen} onClose={handleModalClose} title="افزودن گارانتی">
                <button onClick={handleModalClose}>
                    <IoIosCloseCircleOutline size={25} className="-mt-10 mx-[610px] mb-6" />
                </button>

                <Formik
                    initialValues={editgarranty || initialvalues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                >
                    <Form style={{ direction: "rtl" }}>
                        {/* عنوان */}
                        <FormikControl control="input" name="title" label="عنوان" />

                        {/* مدت گارانتی */}
                        <FormikControl control="input" name="length" label="مدت گارانتی" />

                        {/* واحد */}
                        <FormikControl
                            control="select"
                            name="length_unit"
                            label="واحد"
                            options={[
                                { id: "روز", value: "روز" },
                                { id: "ماه", value: "ماه" },
                                { id: "سال", value: "سال" },
                            ]}
                        />
                        <ErrorMessage name="length_unit" component="div" className="text-red-500" />

                        {/* توضیحات */}
                        <FormikControl control="input" name="descriptions" label="توضیحات" />
                        <ErrorMessage name="descriptions" component="div" className="text-red-500" />


                        <div className="flex justify-end gap-5">
                            <button type="submit" className="mt-4 bg-dark text-white py-2 px-4 rounded-lg">
                                {editgarranty ? "ویرایش" : "ثبت"}
                            </button>
                            <button
                                type="button"
                                onClick={() => { handleModalClose(); setEditGarranty("") }}
                                className="mt-4 bg-rose-700 text-white py-2 px-4 rounded-lg"
                            >
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

export default GarrantyTable;
