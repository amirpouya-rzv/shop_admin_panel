import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../component/form/FormikControl";
import { urlAxios } from "../../Services/URL";
import { Toaster, toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const AddRole = () => {
    // مسیر‌یابی
    const navigate = useNavigate();
    const location = useLocation();
    const roleToEdit = location.state?.roleToEdit;

    // استیت برای دسترسی‌ها
    const [permissions, setPermissions] = useState([]);

    // مقدار اولیه فرم، بررسی اگر داده‌های roleToEdit وجود داشته باشند
    const initialValues = roleToEdit ? {
        title: roleToEdit.title,
        description: roleToEdit.description,
        permissions_id: roleToEdit.permissions_id || [],
    } : {
        title: "",
        description: "",
        permissions_id: [],
    };

    // دریافت لیست دسترسی‌ها از سرور
    useEffect(() => {
        urlAxios.get("admin/permissions")
            .then(res => {
                if (res.status === 200) {
                    setPermissions(res.data.data.map(p => ({ id: p.id, title: p.description })));
                }
            })
            .catch(err => console.error("خطا در دریافت دسترسی‌ها:", err));
    }, []);

    // اعتبارسنجی فرم
    const validationSchema = Yup.object({
        title: Yup.string().required("عنوان الزامی است"),
        description: Yup.string(),
        permissions_id: Yup.array().of(Yup.string()), 
    });

    // ارسال اطلاعات به سرور
    const onSubmit = async (values, { setSubmitting }) => {

        try {
            const res = roleToEdit
                ? await urlAxios.put(`admin/roles/${roleToEdit.id}`, values)  
                : await urlAxios.post("admin/roles", values);  

            if (res.status === 200 || res.status === 201) {
                toast.success(roleToEdit ? "نقش با موفقیت ویرایش شد" : "نقش با موفقیت اضافه شد");
                navigate("/admin/roles");  
            } else {
                toast.error("مشکلی در ثبت نقش پیش آمد");
            }
        } catch (error) {
            console.error("خطا در ارسال درخواست:", error);
            toast.error("مشکلی در ارتباط با سرور پیش آمد");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        enableReinitialize
    >
        <Form className="w-10/12 mx-auto mt-5 border bg-white p-6 rounded shadow mb-6" style={{ direction: "rtl" }}>
            <IoIosArrowBack
                onClick={() => navigate("/admin/roles")}
                size={20}
                className="mx-[270px] md:mx-[1020px] cursor-pointer"
            />
            <Toaster position="top-center" reverseOrder={false} />
            <h2>{roleToEdit ? "ویرایش نقش" : "افزودن نقش جدید"}</h2>
    
            <div>
                <FormikControl
                    control="input"
                    type="text"
                    label="عنوان :"
                    name="title"
                    placeholder="فقط به صورت لاتین و فارسی تایپ کنید"
                />
                <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm" />
            </div>
    
            <FormikControl
                control="textarea"
                label="توضیحات:"
                name="description"
                placeholder="فقط به صورت لاتین و فارسی تایپ کنید"
            />
    
            <FormikControl
                control="checkbox"
                label="دسترسی ها"
                name="permissions_id"
                options={permissions}
                value={roleToEdit?.permissions_id || []}  // مقدار انتخاب‌شده برای ویرایش
            />
    
            <button
                type="submit"
                className={`mt-4 bg-dark text-white py-2 px-4 rounded`}
            >
                ارسال
            </button>
        </Form>
    </Formik>
    
    );
};

export default AddRole;
