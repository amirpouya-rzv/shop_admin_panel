import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { urlAxios } from "../../Services/URL";
import Modal from "../../component/Modal/Modal";

const ProductTable = () => {
    const [fewerProducts, setFewerProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetFewerProducts = async () => {
        setLoading(true);
        urlAxios
            .get("admin/products/fewer_products")
            .then((res) => {
                setLoading(false);
                if (res.status === 200) {
                    const products = res.data.data;
                    setFewerProducts(products.length > 0 ? products : []);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
            });
    };

    const handleTurnoffNotification = async (productId) => {
        urlAxios
            .get(`admin/products/toggle_notification/${productId}`)
            .then((res) => {
                if (res.status === 200) {
                    Modal("انجام شد", res.data.message, "success");
                    setFewerProducts((old) => old.filter((p) => p.id !== productId));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        handleGetFewerProducts();
    }, []);

    return (
        <div className="w-full h-full p-4 overflow-auto">
            <p className="text-center mt-3 text-gray-800 text-lg font-semibold">
                محصولات رو به اتمام
            </p>
            {loading ? (
<></>            ) : fewerProducts.length === 0 ? (
                <strong className="text-blue-500">
                    فعلا محصول رو به اتمامی وجود ندارد
                </strong>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full text-center border border-gray-300 shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2">#</th>
                                <th className="p-2">دسته</th>
                                <th className="p-2">عنوان</th>
                                <th className="p-2">وضعیت</th>
                                <th className="p-2">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fewerProducts.map((p) => (
                                <tr key={p.id} className="border-b border-gray-300">
                                    <td className="p-2">{p.id}</td>
                                    <td className="p-2">{p.categories[0]?.title}</td>
                                    <td className="p-2">{p.title}</td>
                                    <td className="p-2">
                                        {p.stock === 0 ? (
                                            <span className="text-red-500">پایان یافته</span>
                                        ) : (
                                            `رو به اتمام : (${p.stock})`
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleTurnoffNotification(p.id)}
                                            title="نادیده گرفتن"
                                        >
                                            <FaEyeSlash className="inline-block text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
