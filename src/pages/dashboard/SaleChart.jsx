import React, { useEffect, useState } from "react";
import jMoment from "jalali-moment";
import { FaSpinner } from "react-icons/fa";
import { urlAxios } from "../../Services/URL";
import { setDashboardChart } from "../../component/dashboardChart";

const labels = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const SaleChart = () => {
  const [loading, setLoading] = useState(false);

  const handleGetChartInfo = async () => {
    setLoading(true);
    urlAxios
      .get('admin/orders/this_year_orders')
      .then(res => {
        setLoading(false);

        if (res.status === 200) {
          const monthsOrdersArr = [];
          const now = jMoment();
          let thisMonth = now.jMonth();

          for (let i = 0; i < 12; i++) {
            if (thisMonth === -1) thisMonth = 11;
            monthsOrdersArr.push({ month: thisMonth, amount: 0 });
            thisMonth--;
          }

          const orders = res.data.data;
          for (const order of orders) {
            const moment = jMoment(order.pay_at);
            const monthIndex = moment.jMonth();
            const index = monthsOrdersArr.findIndex((o) => o.month === monthIndex);
            monthsOrdersArr[index].amount += parseInt(order.pay_amount);
          }

          monthsOrdersArr.reverse();

          // فراخوانی تابع setDashboardChart
          setDashboardChart(
            monthsOrdersArr.map((o) => labels[o.month]),
            monthsOrdersArr.map((o) => o.amount / 1000000)
          );
        }
      })
      .catch(err => {
        setLoading(false);
        console.error("Error fetching data:", err);
      });
  };

  useEffect(() => {
    handleGetChartInfo();
  }, []);

  return (
    <div className="w-full lg:w-10/12 p-4">
      {loading ? (
        <div className="flex justify-center items-center text-blue-500">
          <FaSpinner className="animate-spin text-3xl" />
        </div>
      ) : (
        <canvas id="myChart" height="195"></canvas>
      )}
    </div>
  );
};

export default SaleChart;
