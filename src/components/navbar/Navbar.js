import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../../features/user/userSlice";
import MobileMenu from "../../assets/images/Navigation.png";

export default function Navbar() {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.user);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isLoggedIn = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(logoutHandler());
  };
  return (
    <nav className="flex justify-between items-center  bg-white border-b border-[#e5e5e5]  px-[30px] h-[60px]">
      <div>
        <ul className="flex gap-8 items-center">
          <Link to={"/"} className="text-xl font-bold">
            Quiz App
          </Link>
          <Link className="text-lg hidden md:block" to={"/statistics"}>
            Statistics
          </Link>
        </ul>
      </div>
      <div className="hidden md:block">
        {isLoggedIn ? (
          <div className="cursor-pointer group relative">
            <div className="flex gap-2">
              <span className="material-icons-outlined" title="Account">
                account_circle{" "}
              </span>
              <p>{userName}</p>
            </div>
            <div
              className="opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:top-[30px] absolute top-0 right-0 min-w-[200px] bg-white p-2.5 text-right duration-300"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        ) : (
          <Link to={"/"}>
            <div className="flex gap-2">
              <span className="material-icons-outlined" title="Account">
                account_circle{" "}
              </span>
              <p>{"Sign In"}</p>
            </div>
          </Link>
        )}
      </div>
      {/* for mobile */}
      <div
        className="block md:hidden"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <img src={MobileMenu} width={30} height={30} />
      </div>
      {isNavOpen && (
        <div className="fixed top-[60px] right-0 left-0 bottom-0 bg-white px-3 pt-8 text-xl">
          {isLoggedIn && <h3 className="font-bold mb-4"> Hi, {userName}</h3>}

          <Link
            className="inline-block"
            to={"/statistics"}
            onClick={() => setIsNavOpen(false)}
          >
            Statistics
          </Link>
          {isLoggedIn ? (
            <p
              className="mt-4"
              onClick={() => {
                setIsNavOpen(false);
                handleLogout();
              }}
            >
              Logout
            </p>
          ) : (
            <Link to={"/"} className="mt-4 block" onClick={()=> setIsNavOpen(false)}>
                <p>{"Sign In"}</p>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
