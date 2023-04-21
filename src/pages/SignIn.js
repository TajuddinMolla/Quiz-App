import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleUserName } from "../features/user/userSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const checkUser = (name) => {
    let users = JSON.parse(localStorage.getItem("users"));
    if (!users) {
      return false;
    }
    const user = users?.find((item) => item.username == name);
    if (user?.username) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userExist = checkUser(name);

    if (userExist) {
      setError(null);
      navigate("/quizzes");
      dispatch(handleUserName(name));
      localStorage.setItem("auth", name);
      return;
    }

    setError("User Does Not Exists");
  };

  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className=" max-w-[600px] w-full px-2.5 text-center">
        <h5 className="text-4xl font-bold">Sign In</h5>
        {error && (
          <p className="w-full py-2.5 px-2 rounded-md border mt-8 text-red-600 text-left">
            {error}
          </p>
        )}
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2.5 px-2 rounded-md border mt-4 focus:outline-0"
            type="text"
            required
            placeholder="Enter User Name"
          />
          <div className="mt-2 text-right text-xs underline">
            <Link to={"/sign-up"}>Create New Account</Link>
          </div>

          <button
            type="submit"
            className="w-full py-1.5 px-2 rounded-md border mt-4 capitalize bg-[#00ff84]"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
