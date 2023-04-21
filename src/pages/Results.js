import React from "react";
import SuccessImage from "../assets/images/success.png";
import { useSelector } from "react-redux";

export default function Results() {
  const { score, number_of_question } = useSelector((state) => state.quizzes);
  return (
    <div className="w-[90%] mx-auto my-8 text-[#002333]">
      <div className="md:flex justify-between items-center">
        <div className="md:w-[50%] text-center">
          <p className="text-2xl font-semibold">
            Your score is <br /> {score} out of {number_of_question}
          </p>
        </div>

        <div className="md:h-[400px] flex justify-center items-center">
          <img src={SuccessImage} alt="Success" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
