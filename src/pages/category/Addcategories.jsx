import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { urlAxios } from "../../Services/URL";
import { Toaster, toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const AddCategories = () => {

    const { CategoriesId } = useParams();

    //مسیر یابی
    const navigate = useNavigate();

    //شناسه محصول
    const { productId } = useParams();

    const [parentCategories, setParentCategories] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        parent_id: "",
        is_active: false,
        show_in_menu: false,
        image: null,
    });

    //دریافت دسته‌بندی‌ها
    useEffect(() => {
        urlAxios.get(`/admin/categories`).then(res => {
            if (res.status === 200) {
                setParentCategories(res.data.data.map(p => ({ id: p.id, value: p.title })));
                // toast.success("دسته‌بندی‌ها با موفقیت اضافه شد");
            } else {
                // toast.error("مشکل در دریافت اطلاعات دسته‌بندی‌ها");
            }
        }).catch();
    }, []);

    //ادیت کردن دسته
    useEffect(() => {
        if (CategoriesId) {
            urlAxios.get(`/admin/categories/${CategoriesId}`)
                .then(res => {
                    if (res.status === 200) {
                        setInitialValues({
                            title: res.data.data.title,
                            description: res.data.data.description,
                            parent_id: res.data.data.parent_id || "",
                            is_active: res.data.data.is_active === 1,
                            show_in_menu: res.data.data.show_in_menu === 1,
                            image: null,  // تصویر را می‌توانید در صورت نیاز بارگذاری کنید
                        });
                    }
                })
                .catch(err => toast.error("خطا در دریافت اطلاعات دسته برای ویرایش"));
        }
    }, [CategoriesId]);

    //ولیدیشن
    const validationSchema = Yup.object({
        title: Yup.string().required("عنوان دسته ضروری است"),
        description: Yup.string(),
        parent_id: Yup.number(),
        image: Yup.mixed()
            .nullable()
            .test("fileformat", "فرمت فایل باید jpg یا png باشد", (value) =>
                !value || ["image/jpeg", "image/png"].includes(value?.type)
            ),
    });
    //ارسال اطلاعات
    const onSubmit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("parent_id", values.parent_id || "");
        formData.append("show_in_menu", values.show_in_menu ? 1 : 0);
        formData.append("is_active", values.is_active ? 1 : 0);

        const request = CategoriesId
            ? urlAxios.put(`/admin/categories/${CategoriesId}`, formData)
            : urlAxios.post(`/admin/categories`, formData);

        request.then(res => {
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data.data);
                resetForm();
                navigate("/admin/categories");
            }
        }).catch(err => toast.error("خطا در ارسال اطلاعات"));

        setSubmitting(false);
    };


    return (
        //فرم ها
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
        >
            <Form
                className="w-10/12 mx-auto mt-10 bg-white p-6 rounded shadow mb-6"
                style={{ direction: "rtl" }}>

                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />

                <IoIosArrowBack
                    onClick={() => navigate("/admin/categories")}
                    size={20}
                    className="mx-[270px] md:mx-[1060px] cursor-pointer" />

                <Toaster position="top-center" reverseOrder={false} />

                <h2 className="text-xl font-semibold mb-4 mt-10">{productId ? "ویرایش دسته" : "افزودن دسته جدید"}</h2>

                {parentCategories.length > 0 &&
                    <FormikControl
                        control="select"
                        label="دسته والد:"
                        name="parent_id"
                        options={parentCategories}
                    />}

                <FormikControl
                    control="input"
                    type="text"
                    label="عنوان دسته:"
                    name="title"
                />

                <FormikControl
                    control="textarea"
                    label="توضیحات:"
                    name="description"
                    placeholder="توضیحات"
                />

                <FormikControl
                    control="switch"
                    name="show_in_menu"
                    label="نمایش در منو"
                />

                <FormikControl
                    control="switch"
                    name="is_active"
                    label="وضعیت فعال"
                />

                <button type="submit" className="mt-4 bg-dark text-white py-2 px-4 rounded">{productId ? "ویرایش" : "ارسال"}</button>
            </Form>
        </Formik>
    );
};

export default AddCategories;