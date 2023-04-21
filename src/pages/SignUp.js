import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleUserName } from "../features/user/userSlice";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  function generateRandomUsername(userName) {
    const randomString = Math.random().toString(36).substring(2, 7);
    return `${userName}_${randomString}`;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length > 20) {
      setError("Name less Then 20 Characters");
      return;
    }
    setError(null);
    const username = generateRandomUsername(name);
    // Set Users
    let users = JSON.parse(localStorage.getItem("users"));
    if (users) {
      users.push({
        username,
      });
    } else {
      users = [
        {
          username,
        },
      ];
    }
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("auth", username);
    dispatch(handleUserName(username));
    navigate("/quizzes");
  };
  return (
    <div className="w-full h-[90vh] flex justify-center items-center">
      <div className=" max-w-[600px] w-full px-2.5 text-center">
        <h5 className="text-4xl font-bold">Sign Up</h5>
        {error && (
          <p className="w-full py-2.5 px-2 rounded-md border mt-8 text-red-600 text-left">
            {error}
          </p>
        )}
        <form className="mt-2" onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full py-2.5 px-2 rounded-md border mt-4 focus:outline-0"
            type="text"
            required
            placeholder="Enter User Name"
          />

          <button
            type="submit"
            className="w-full py-1.5 px-2 rounded-md border mt-4 capitalize bg-[#00ff84]"
          >
            Sign UP
          </button>
        </form>
      </div>
    </div>
  );
}
