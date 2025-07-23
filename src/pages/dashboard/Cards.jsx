import React, { useEffect, useState } from 'react';
import { FaShoppingBasket, FaDolly, FaLuggageCart, FaMoneyCheckAlt, FaQuestionCircle } from 'react-icons/fa';

import Card from './Card';
import { urlAxios } from '../../Services/URL';

const Cards = () => {
    const [cardInfos, setCardInfos] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGetCardInfos = async () => {
        setLoading(true);
        try {
            const res = await urlAxios.get('admin/orders/orders_statistics');
            if (res.status === 200) {
                const data = res.data.data;
                const titleMap = {
                    carts: "سبد خرید امروز",
                    pendingOrders: "سفارشات مانده امروز",
                    successOrders: "سفارشات امروز",
                    successOrdersAmount: "درآمد امروز"
                };

                const descMap = {
                    carts: "سبد های خرید مانده امروز",
                    pendingOrders: "سفارشات معلق و فاقد پرداختی",
                    successOrders: "سفارشات کامل و دارای پرداختی",
                    successOrdersAmount: "جمع مبالغ پرداختی (تومان)"
                };

                const newCardObj = Object.keys(data).map(key => ({
                    key: key,
                    name: key,
                    currentValue: data[key].today,
                    lastWeekValue: data[key].thisWeek,
                    lastMonthValue: data[key].thisMonth,
                    title: titleMap[key] || `عنوان برای ${key}`,
                    desc: descMap[key] || `توضیحات برای ${key}`,
                    icon: getIconForCard(key) // آیکون با React Icons
                }));

                setCardInfos(newCardObj);
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    // انتخاب آیکون برای هر نوع کارت
    const getIconForCard = (key) => {
        switch (key) {
            case 'carts':
                return <FaShoppingBasket />; // استفاده از آیکون React Icons
            case 'pendingOrders':
                return <FaDolly />;
            case 'successOrders':
                return <FaLuggageCart />;
            case 'successOrdersAmount':
                return <FaMoneyCheckAlt />;
            default:
                return <FaQuestionCircle />;
        }
    };

    useEffect(() => {
        handleGetCardInfos();
    }, []);

    return (
        <div className="flex items-stretch w-full space-x-4 p-4 overflow-x-auto">
            {loading ? (
                <div className="text-center w-full text-gray-500">در حال بارگذاری...</div>
            ) : (
                cardInfos.length > 0 ? (
                    cardInfos.map(cardInfo => (
                        <Card
                            key={cardInfo.key}
                            {...cardInfo}
                            className="bg-white shadow-lg rounded-lg p-6 flex-shrink-0 w-1/4"
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-500 w-full">داده‌ای برای نمایش وجود ندارد.</div>
                )
            )}
        </div>
    );
};

export default Cards;
