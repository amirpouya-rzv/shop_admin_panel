import React, { useEffect, useState } from "react";
import LogIn from "./pages/auth/LogIn";
import Content from "./Content";
import Sidebar from "./layout/sidemenue/Sidemenu";
import { useLocation, useNavigate } from "react-router-dom";
import LoginAuth from "./layout/auth/LoginAuth";
import axios from "axios";
import Loader from "./component/loader/Loader";

const App = () => {
  const [islogin, setIsLogIn] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // برای هدایت کاربر
  const location = useLocation();

  useEffect(() => {
    const loginToken = JSON.parse(localStorage.getItem("loginToken"));

    if (loginToken) {
      setIsLoading(true);
      axios
        .get("http://ecomadminapi.azhadev.ir/api/auth/user", {
          headers: {
            Authorization: `Bearer ${loginToken.token}`,
          },
        })
        .then((res) => {
          setIsLogIn(res.status === 200 ? "trrue" : "false");
          setIsLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("loginToken");
          setIsLogIn(false);
          setIsLoading(false);
          navigate("/auth/login"); // هدایت به صفحه لاگین
        });
    } else {
      setIsLogIn(false);
      setIsLoading(false);
      navigate("/auth/login"); // هدایت به صفحه لاگین
    }
  }, [navigate]);

  // if (isloading) {
  //   return <div><Loader/></div>;
  // }

  return (
    <div className="font-serif">
      {location.pathname.includes("/auth/login") ? (
        <LoginAuth />
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-10">
            <Content />
          </div>
          <div className="col-span-2">
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
