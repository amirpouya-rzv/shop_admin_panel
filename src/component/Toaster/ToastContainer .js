import React from 'react'
import { Zoom } from 'react-toastify/unstyled'

function ToastContainer () {
  return (
 <div>
     <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Zoom}/>
  ) </div>
}

export default ToastContainer 