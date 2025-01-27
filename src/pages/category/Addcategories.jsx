import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { urlAxios } from "../../Services/URL";
import { Toaster, toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

const Addcategories = () => {

    const navigate = useNavigate();


    const showInMenuOptions = [
        { id: "نمایش دادن", value: "پنهان کردن" },
    ];

    const isActiveOptions = [
        { id: "فعال", value: "غیر فعال" },
    ];

    const [initialValues,setInitialValues] = useState(
        {
            title: "",
            description: "",
            parent_id: "",
            is_active: false,
            show_in_menu: false,
            image: null,
        }
    )

    const validationSchema = Yup.object({
        parent_id: Yup.number(),
        title: Yup.string().required("عنوان دسته ضروری است"),
        description: Yup.string(),
        image: Yup.mixed()
            .nullable()
            .test(
                "fileformat",
                "فرمت فایل باید jpg یا png باشد",
                (value) =>
                    !value || ["image/jpeg", "image/png"].includes(value?.type)
            ),
    });



    // Get parent categories
    const [parent, setParent] = useState([]);
    const handelgetparentcategoris = (id) => {
        urlAxios.get(`/admin/categories${id ? `?parent=${id}` : ""}`)
            .then(res => {
                if (res.status === 200) {
                    const allParents = res.data.data;
                    setParent(allParents.map(p => ({ id: p.id, value: p.title })));
                } else {
                    toast.error("مشکل در دریافت اطلاعات");
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        handelgetparentcategoris();
    }, []);

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        values = {
            ...values,
            is_active: values.is_active ? 1 : 0,
            show_in_menu: values.show_in_menu ? 1 : 0,
        };

        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('parent_id', values.parent_id);
        formData.append('show_in_menu', values.show_in_menu);
        formData.append('is_active', values.is_active);

        if (values.image) {
            formData.append('image', values.image);
        }

        urlAxios.post(`/admin/categories`, formData)
            .then((res) => {
                console.log(res)
                if (res.status === 201) {
                    toast.success("دسته جدید با موفقیت اضافه شد");
                    resetForm();
                }
            }).catch((err) => {
                toast.error("اشکال در بارگزاری اطلاعات");
            });

        setSubmitting(false);
    };

//ویرایش دسته
const {productId} = useParams();
useEffect(()=>{
urlAxios.get(`/admin/categories/${productId}`)
.then(res=>{console.log(res)
    setInitialValues({
        title: res.data.data.title,
        description: res.data.data.description,
        parent_id: res.data.data.parent_id,
        is_active: res.data.data.is_active,
        show_in_menu: res.data.data.show_in_menu,
        image: null,
    })
})

})

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize={true}
        >
            <>
                <Form
                    className="w-10/12 mx-auto mt-10 bg-white p-6 rounded shadow mb-6"
                    style={{ direction: "rtl" }}
                >
                    <div>
                        <IoIosArrowBack onClick={() => navigate("/admin/categories")} size={20} className="cursor-pointer mx-[1050px]"
                        />
                    </div>

                    <Toaster position="top-center" reverseOrder={false} />
                    <h2 className="text-xl font-semibold mb-4 mt-10">افزودن دسته جدید</h2>

                    {parent.length > 0 &&
                        <FormikControl
                            control="select"
                            label="دسته والد:"
                            name="parent_id"
                            options={parent}
                        />
                    }
                    <FormikControl
                        control="input"
                        type="text"
                        label="عنوان دسته:"
                        name="title"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

                    <FormikControl
                        control="textarea"
                        label="توضیحات:"
                        name="description"
                        placeholder="توضیحات"
                    />

                    <FormikControl
                        control="file"
                        label="تصویر"
                        name="image"
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

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        ارسال
                    </button>
                </Form>
            </>
        </Formik>
    );
};

export default Addcategories;
