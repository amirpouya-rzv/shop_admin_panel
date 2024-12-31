
// import React from 'react';
// import { Toaster, toast } from 'react-hot-toast';

// const ToastComponent = () => {
//   const showToast = (type) => {
//     switch (type) {
//       case 'success':
//         toast.success('عملیات موفقیت‌آمیز بود!');
//         break;
//       case 'error':
//         toast.error('یک خطا رخ داده است.');
//         break;
//       case 'info':
//         toast('این یک پیام اطلاعاتی است.', {
//           icon: 'ℹ️',
//         });
//         break;
//       case 'custom':
//         toast.custom(<div style={{ background: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
//           این یک Toast سفارشی است!
//         </div>);
//         break;
//       default:
//         toast('پیام پیش‌فرض');
//     }
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '20px' }}>
//       <Toaster position="top-right" reverseOrder={false} />

//       <button onClick={() => showToast('success')} style={{ margin: '5px' }}>
//         نمایش پیام موفقیت
//       </button>

//       <button onClick={() => showToast('error')} style={{ margin: '5px' }}>
//         نمایش پیام خطا
//       </button>

//       <button onClick={() => showToast('info')} style={{ margin: '5px' }}>
//         نمایش پیام اطلاعاتی
//       </button>

//       <button onClick={() => showToast('custom')} style={{ margin: '5px' }}>
//         نمایش پیام سفارشی
//       </button>
//     </div>
//   );
// };

// export default ToastComponent;
