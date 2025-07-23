// import { Form, Formik } from 'formik';
// import React, { useEffect, useState } from 'react';
// import FormikControl from '../../component/form/FormikControl';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
// import { urlAxios } from '../../Services/URL';
// import { useLocation, useNavigate } from 'react-router-dom';

// function AddUser() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const userId = location.state?.userId
//   const [loader, setLoader] = useState(false); // Assuming you're using a loader state for loading feedback
//   const [allroles, setAllRolse] = useState([])
//   const [selectedRoles, setSelctrdRoles] = useState([])
//   const [reInitialValues, setReInitialValues] = useState(null)
//   const [userToEdit, setUserToEdit] = useState([])
//   const initialValues = {
//     user_name: "",
//     first_name: "",
//     last_name: "",
//     phone: "",
//     email: "",
//     birth_date: "",
//     password: "",
//     gender: 1,
//     roles_id: [],
//   };

//   const validationSchema = Yup.object({
//     user_name: Yup.string()
//       .min(3, 'نام کاربری باید حداقل 3 کاراکتر باشد')
//       .max(20, 'نام کاربری نباید بیشتر از 20 کاراکتر باشد')
//       .required('نام کاربری الزامی است'),
//     first_name: Yup.string()
//       .min(2, 'نام باید حداقل 2 کاراکتر باشد')
//       .max(50, 'نام نباید بیشتر از 50 کاراکتر باشد')
//       .required('نام الزامی است'),
//     last_name: Yup.string()
//       .min(2, 'نام خانوادگی باید حداقل 2 کاراکتر باشد')
//       .max(50, 'نام خانوادگی نباید بیشتر از 50 کاراکتر باشد')
//       .required('نام خانوادگی الزامی است'),
//     phone: Yup.string()
//       .matches(/^\d{10}$/, 'شماره همراه باید 10 رقمی باشد')
//       .required('شماره همراه الزامی است'),
//     email: Yup.string()
//       .email('لطفا ایمیل معتبر وارد کنید')
//       .required('ایمیل الزامی است'),
//     birth_date: Yup.date()
//       .required('تاریخ تولد الزامی است')
//       .max(new Date(), 'تاریخ تولد نمی‌تواند از امروز بیشتر باشد'),
//     password: Yup.string()
//       .min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد')
//       .required('رمز عبور الزامی است'),
//     gender: Yup.number()
//       .oneOf([1, 2], 'لطفا جنسیت را انتخاب کنید')
//       .required('جنسیت الزامی است'),
//     roles_id: Yup.array()
//       .min(1, 'ایدی نقش باید انتخاب شود')
//       .required('ایدی نقش الزامی است'),
//   });

//   useEffect(() => {
//     urlAxios.get('admin/roles')
//       .then(res => {
//         if (res.status === 200) {
//           setAllRolse(res.data.data.map(x => {
//             return ({ id: x.id, value: x.title })
//           }))
//         }
//       })
//   })

//   //ویرایش
//   const handlegetuserId = (userId) => {
//     urlAxios.get('admin/users/{userId}')
//       .then(res => {
//         if (res.status === 200) {
//           setUserToEdit(res.data.data)
//         }
//       })
//   }

//   useEffect(() => {
//     if (userId) {
//       handlegetuserId()
//     }
//   }, [])


//   useEffect(()=>{
//     if (userToEdit) {
//       setSelctrdRoles(userToEdit.roles.map(r=>{return {id:r.id, value:r.title}}))
//         const roles_id = userToEdit.roles.map(p=>p.id);
//         setReInitialValues({
//             birth_date: userToEdit.birth_date ? convertDateToJalali(userToEdit.birth_date, 'jD / jM / jYYYY') : "",
//             roles_id,
//             password: "",
//             user_name: userToEdit.user_name || "",
//             first_name: userToEdit.first_name || "",
//             last_name: userToEdit.last_name || "",
//             phone: userToEdit.phone || "",
//             email: userToEdit.email || "",
//             gender: userToEdit.gender || 1,
//             isEditing : true
//         })
//     }
// },[userToEdit])

//   const onSubmit = (values) => {
//     setLoader(true)
//     urlAxios.post('admin/users', values)
//       .then(response => {
//         toast.success('اطلاعات با موفقیت ثبت شد');
//         // Handle response
//       })
//       .catch(error => {
//         toast.error('مشکلی پیش آمده است');
//       })
//       .finally(() => setLoader(false));

//     setLoader(false);
//   };

//   return (
//     <Formik
//       initialValues={reInitialValues ||initialValues}
//       onSubmit={onSubmit}
//       validationSchema={validationSchema}
//       enableReinitialize
//     >
//       <Form className="w-10/12 mx-auto mt-5 border bg-white p-6 rounded shadow mb-6" style={{ direction: "rtl" }}>
//         <div className="space-y-6">
//           <FormikControl
//             control='input'
//             type='text'
//             name='user_name'
//             label='نا کاربری'
//             placeholder='فقط از حروف فارسی و لاتین استفاده کنید'
//           />
//           <FormikControl
//             control='input'
//             type='text'
//             name='first_name'
//             label='نام'
//             placeholder='فقط از حروف فارسی و لاتین استفاده کنید'
//           />
//           <FormikControl
//             control='input'
//             type='text'
//             name='last_name'
//             label='نام خانوادگی'
//             placeholder='فقط از حروف فارسی و لاتین استفاده کنید'
//           />
//           <FormikControl
//             control='input'
//             type='text'
//             name='phone'
//             label='شماره همراه'
//             placeholder='لطفا شماره همراه معتبر وارد کنید'
//           />
//           <FormikControl
//             control='input'
//             type='email'
//             name='email'
//             label='ایمیل'
//             placeholder='لطفا ایمیل معتبر وارد کنید'
//           />
//           <FormikControl
//             control='input'
//             type='date'
//             name='birth_date'
//             label='تاریخ تولد'
//             placeholder='لطفا تاریخ تولد معتبر وارد کنید'
//           />
//           <FormikControl
//             control='input'
//             type='password'
//             name='password'
//             label='رمز عبور'
//             placeholder='فقط از اعداد استفاده کنید'
//           />
//           <FormikControl
//             control="select"
//             name="gender"
//             label="جنسیت"
//             options={[
//               { label: 'مرد', value: 1 },
//               { label: 'زن', value: 2 }
//             ]}
//           />
//           <FormikControl
//             control="select"
//             name="roles_id"
//             label="نقش‌ها"
//             />


//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="w-full sm:w-auto bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white font-medium rounded-lg py-2.5 px-6 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800"
//             >
//               ثبت اطلاعات
//             </button>
//           </div>
//         </div>
//       </Form>
//     </Formik>
//   );
// }

// export default AddUser;


import React from 'react'

function AddUsre() {
  return (
    <div>AddUsre</div>
  )
}

export default AddUsre