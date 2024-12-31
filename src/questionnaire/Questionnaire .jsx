import React, { useState } from 'react';

const Questionnaire = () => {

    const questions = [
        {
            id: 1,
            questionText: "کدام سیاره به عنوان سیاره سرخ شناخته می‌شود؟",
            options: [
                { text: "زمین", isCorrect: false },
                { text: "مریخ", isCorrect: true },
                { text: "زهره", isCorrect: false },
                { text: "مشتری", isCorrect: false }
            ],
        },
        {
            id: 2,
            questionText: "پایتخت ایران کدام شهر است؟",
            options: [
                { text: "شیراز", isCorrect: false },
                { text: "اصفهان", isCorrect: false },
                { text: "تهران", isCorrect: true },
                { text: "مشهد", isCorrect: false }
            ],
        },
        {
            id: 3,
            questionText: "رشته کوه هیمالیا در کدام قاره قرار دارد؟",
            options: [
                { text: "آفریقا", isCorrect: false },
                { text: "آسیا", isCorrect: true },
                { text: "اروپا", isCorrect: false },
                { text: "آمریکای جنوبی", isCorrect: false }
            ],
        },
        {
            id: 4,
            questionText: "کدام فلز رسانایی الکتریکی بیشتری دارد؟",
            options: [
                { text: "آهن", isCorrect: false },
                { text: "طلا", isCorrect: false },
                { text: "نقره", isCorrect: true },
                { text: "مس", isCorrect: false }
            ],
        },
        {
            id: 5,
            questionText: "بزرگ‌ترین قاره جهان کدام است؟",
            options: [
                { text: "آمریکا", isCorrect: false },
                { text: "آسیا", isCorrect: true },
                { text: "آفریقا", isCorrect: false },
                { text: "اروپا", isCorrect: false }
            ],
        },
        {
            id: 6,
            questionText: "واحد اندازه‌گیری شدت جریان الکتریکی چیست؟",
            options: [
                { text: "وات", isCorrect: false },
                { text: "آمپر", isCorrect: true },
                { text: "ولت", isCorrect: false },
                { text: "اهم", isCorrect: false }
            ],
        },
        {
            id: 7,
            questionText: "کدام حیوان بزرگ‌ترین پستاندار جهان است؟",
            options: [
                { text: "فیل", isCorrect: false },
                { text: "وال آبی", isCorrect: true },
                { text: "کرگدن", isCorrect: false },
                { text: "گوزن شمالی", isCorrect: false }
            ],

        },
        {
            id: 8,
            questionText: "نویسنده کتاب 'شاهنامه' کیست؟",
            options: [
                { text: "فردوسی", isCorrect: true },
                { text: "حافظ", isCorrect: false },
                { text: "سعدی", isCorrect: false },
                { text: "مولانا", isCorrect: false }
            ],
        },
        {
            id: 9,
            questionText: "نقطه جوش آب در فشار استاندارد چند درجه سانتی‌گراد است؟",
            options: [
                { text: "50", isCorrect: false },
                { text: "100", isCorrect: true },
                { text: "200", isCorrect: false },
                { text: "150", isCorrect: false }
            ],
        },
        {
            id: 10,
            questionText: "اولین رئیس جمهور ایران چه کسی بود؟",
            options: [
                { text: "محمدعلی رجایی", isCorrect: false },
                { text: "ابوالحسن بنی‌صدر", isCorrect: true },
                { text: "سید علی خامنه‌ای", isCorrect: false },
                { text: "اکبر هاشمی رفسنجانی", isCorrect: false }
            ],

        }
    ];

    const [current, setcurrent]=useState()
    const [nextquestion, setNextQuestion] = useState(0)

    const Nextquestion = (index) => {

        setNextQuestion(index + 1)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-t from-blue-500 ">
          <div className="flex flex-col w-10/12 max-w-3xl bg-white rounded-lg shadow-xl p-6">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {questions[0].questionText}
              </h1>
            </div>
            <div className="space-y-4">
              {questions[0].options.map((value, index) => {
                return (
                  <button
                    key={index}
                    className="w-full py-3 px-4 text-lg font-medium text-gray-700 bg-gray-100 rounded-md border border-gray-300 
                    hover:bg-blue-300  hover:text-white transition-colors duration-300"
                  >
                    {value.text}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <button
              
                onClick={Nextquestion}
                className={`w-full py-3 px-6 bg-green-600 text-white text-lg font-bold rounded-md shadow-md 
                hover:bg-green-700 transition-transform transform hover:scale-105 `}
              >
                سوال بعد
              </button>
              <p className='mt-5 text-sm text-gray-500'>سوال 1 از 10</p>
            </div>
          </div>
        </div>
      );
      
}

export default Questionnaire;
