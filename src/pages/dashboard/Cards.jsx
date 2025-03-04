import React, { useEffect, useState } from 'react';
import Card from './Card';
import { urlAxios } from '../../Services/URL';

const Cards = () => {
    const [cardInfos, setCardInfos] = useState([]);
    const [loading, setLoading] = useState(false);

    // دریافت داده‌ها از API
    const handleGetCardInfos = async () => {
        setLoading(true);
        try {
            const res = await urlAxios.get('admin/orders/orders_statistics');
            if (res.status === 200) {
                const data = res.data.data;
                const newCardObj = Object.keys(data).map(key => ({
                    key: key,
                    name: key,
                    currentValue: data[key].today,
                    lastWeekValue: data[key].thisWeek,
                    lastMonthValue: data[key].thisMonth,
                    title: `عنوان برای ${key}`, // این می‌تواند به‌طور داینامیک تغییر کند
                    desc: `توضیحات برای ${key}`,  // این هم به‌طور داینامیک تغییر کند
                    icon: getIconForCard(key)  // انتخاب آیکون به‌طور داینامیک
                }));
                setCardInfos(newCardObj);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // این تابع می‌تواند به‌طور داینامیک آیکون‌های مختلف را بر اساس نام کارت انتخاب کند.
    const getIconForCard = (key) => {
        switch (key) {
            case 'carts':
                return "fas fa-shopping-basket";
            case 'pendingOrders':
                return "fas fa-dolly";
            case 'successOrders':
                return "fas fa-luggage-cart";
            case 'successOrdersAmount':
                return "fas fa-money-check-alt";
            default:
                return "fas fa-question-circle"; // آیکون پیش‌فرض
        }
    };

    useEffect(() => {
        handleGetCardInfos();
    }, []);

    return (
        <div className="flex items-stretch w-full space-x-4 p-4 overflow-x-auto">
            {loading ? (
                <></>
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
