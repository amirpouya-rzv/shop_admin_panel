import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "./pages/auth/LogIn";
import Content from "./Content";
import Sidebar from "./layout/sidemenue/Sidemenu";
import LoginAuth from "./layout/auth/LoginAuth";
import Loader from "./component/loader/Loader";

const App = (menubutton) => {
  const [islogin, setIsLogIn] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
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
          setIsLogIn(res.status === 200 ? true : false);
          setIsLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("loginToken");
          setIsLogIn(false);
          setIsLoading(false);
          navigate("/auth/login");
        });
    } else {
      setIsLogIn(false);
      setIsLoading(false);
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div className={`font-vazirmatn mb-10`}>
      {location.pathname.includes("/auth/login") ? (
        <LoginAuth />
      ) : (
        <div
          className="h-fit bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('')`,
            backgroundSize: "cover",
          }}
        >
          {/* محتوای داخل صفحه */}
          <div className="grid grid-cols-12 min-h-screen">
            <div className={`col-span-10 ${menubutton ? 'col-span-12' : 'col-span-10'}`}>
              <Content />
            </div>
            <div className={`col-span-2 ${menubutton ? 'col-span-0' : 'col-span-2'}`}>
              <Sidebar />
            </div>
          </div>
        </div>


      )}
    </div>
  );
};

export default App;
