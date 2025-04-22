// AddProducts.js
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import FormikControl from "../../component/form/FormikControl";
import { urlAxios } from "../../Services/URL";
import * as yup from "yup";
import toast, { Toaster } from "react-hot-toast";  // وارد کردن Toaster
import { FaAngleDoubleLeft } from "react-icons/fa";

function AddProducts() {
  const [parentCategories, setParentCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [guarantees, setGuarantees] = useState([]);
  const [mainCategories, setMainCategories] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);


  const initialValues = {
    category_ids: "",
    title: "",
    price: "",
    weight: null,
    brand_id: null,
    color_ids: "",
    guarantee_ids: "",
    descriptions: "",
    short_descriptions: "",
    cart_descriptions: "",
    // image: null,
    alt_image: "",
    keywords: "",
    stock: null,
    discount: null,
  }

 //اعتبار سنجی
  const validationSchema = yup.object({
    category_ids: yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
    title: yup.string()
      .required("لطفا این قسمت را پر کنید")
      .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    price: yup.number()
      .required("لطفا این قسمت را پر کنید"),
    weight: yup.number(),
    brand_id: yup.number(),
    color_ids: yup.string().matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
    guarantee_ids: yup.string().matches(/^[0-9\s-]+$/, "فقط ازاعداد و خط تیره استفاده شود"),
    descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-<>/:.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    short_descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    cart_descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    image: yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد", (value) =>
        !value ? true : value.type === "image/jpeg" || value.type === "image/png"
      ),
    keywords: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    stock: yup.number(),
    discount: yup.number(),
  });



// محصولاتدریافت اطلاعات
  useEffect(() => {
    urlAxios
      .get(`/admin/categories`)
      .then((res) => {
        if (res.status === 200 && res.data.data) {
          setParentCategories(
            res.data.data.map((d) => ({
              id: d.id,
              value: d.title,
            }))
          );
        } else {
          console.error("Data structure is not as expected");
        }
      })
      .catch((err) => console.error("Error fetching data: ", err));
  }, []);



  const getAllBrands = () => {
    urlAxios
      .get("admin/brands")
      .then((res) => {
        if (res.status === 200 && Array.isArray(res.data.data)) {
          setBrands(
            res.data.data.map((d) => ({
              id: d.id.toString(),
              value: d.original_name,
            }))
          );
        } else {
          setBrands([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching brands: ", err);
        setBrands([]);
      });
  };

  const getAllColors = () => {
    urlAxios
      .get("admin/colors")
      .then((res) => {
        if (res.status === 200) {
          setColors(
            res.data.data.map((d) => ({
              id: d.id.toString(),
              value: d.title,
            }))
          );
        }
      })
      .catch((err) => console.error("Error fetching colors: ", err));
  };

  const getAllGuarantees = () => {
    urlAxios
      .get("admin/guarantees")
      .then((res) => {
        if (res.status === 200) {
          setGuarantees(
            res.data.data.map((d) => ({
              id: d.id.toString(),
              value: d.title,
            }))
          );
        }
      })
      .catch((err) => console.error("Error fetching guarantees: ", err));
  };

  useEffect(() => {
    getAllBrands();
    getAllColors();
    getAllGuarantees();
  }, []);

  const handlesetMainCategories = (id, value) => {
    setMainCategories("waiting");
    if (value > 0) {
      urlAxios
        .get(`/admin/categories${id ? `?parent=${id}` : ""}`)
        .then((res) => {
          if (res.status === 200) {
            setMainCategories(res.data.data.map((d) => ({ id: d.id, value: d.title })));
          } else {
            setMainCategories(null);
          }
        })
        .catch((err) => {
          setMainCategories(null);
          console.error("Error fetching main categories: ", err);
        });
    }
  };

  const handleSelectedCategories = (value, formik) => {
    const selectedCategory = mainCategories.find((c) => c.id === value);
    if (selectedCategory) {
      setSelectedCategories((prev) => [...prev, selectedCategory]);
      formik.setFieldValue("category_ids", [...formik.values.category_ids, value].join("-"));
    }
  };

  const onSubmit = (values) => {
    urlAxios
      .post("admin/products", values)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است");
        console.error("Error: ", err);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="w-10/12 mx-auto mt-5 border bg-white p-6 rounded shadow mb-6" style={{ direction: "rtl" }}>
          <Toaster position="top-center" reverseOrder={false} />

          <div>
            {parentCategories.length > 0 && (
              <FormikControl
                control="select"
                options={parentCategories}
                name="category_ids"
                label="دسته والد"
                firstItem="...دسته ی مورد نظر رو انتخاب کنید"
                handleOnChange={handlesetMainCategories}
              />
            )}

            {mainCategories === "waiting" ? (
              <div>در حال بارگذاری دسته‌بندی‌ها...</div>
            ) : mainCategories != null ? (
              <FormikControl
                control="select"
                options={mainCategories}
                name="category_ids"
                label="دسته بندی"
                firstItem="...دسته ی مورد نظر رو انتخاب کنید"
                handleOnChange={handleSelectedCategories}
              />
            ) : null}

            {selectedCategories.length > 0 && (
              <div>
                {selectedCategories.map((category) => (
                  <span key={category.id} className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm shadow-md m-1">
                    <FaAngleDoubleLeft className="text-xs mr-2" />
                    {category.value}
                  </span>
                ))}
              </div>
            )}

            <FormikControl
              control="input"
              type="text"
              label="عنوان محصول"
              name="title"
              placeholder="فقط از حروف و اعداد استفاده کنید"
            />
            <FormikControl
              control="input"
              type="number"
              label="قیمت"
              name="price"
              placeholder="قیمت محصول را وارد کنید (تومان)"
            />
            <FormikControl
              control="input"
              type="text"
              label="وزن"
              name="weight"
              placeholder="وزن محصول را وارد کنید (گرم)"
            />
            <FormikControl
              control="select"
              label="برند"
              name="brand_id"
              options={brands}
              placeholder=" برند مورد نظر را انتخاب کنید"
            />
            <FormikControl
              control="select"
              label="رنگ"
              name="color_ids"
              options={colors}
              placeholder="رنگ مورد را انتخاب کنید"
            />
            <FormikControl
              control="select"
              label="گارانتی"
              name="guarantee_ids"
              options={guarantees}
              placeholder="گارانتی مورد نظر را انتخاب کنید"
            />
            <FormikControl
              control="textarea"
              label="توضیحات"
              name="descriptions"
              placeholder="توضیحات محصول را وارد کنید"
            />
            <FormikControl
              control="input"
              type="number"
              label="موجودی"
              name="stock"
              placeholder="موجودی را وارد کنید"
            />
            <FormikControl
              control="input"
              type="number"
              label="درصد تخفیف"
              name="discount"
              placeholder="فقط از اعداد استفاده کنید (درصد)"
            />
            <button type="submit" className="w-full px-4 py-3 bg-blue-500 text-white">
              ارسال
            </button>
          </div>
        </Form>
      )}
    </Formik>

  );
}

export default AddProducts;
