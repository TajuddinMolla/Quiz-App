import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleCategoryChange } from "../features/quiz/quizSlice";
import { handleDifficultyChange } from "../features/quiz/quizSlice";
import { handleTypeChange } from "../features/quiz/quizSlice";
import { handleAmountChange } from "../features/quiz/quizSlice";

export default function Quizzes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    question_category,
    question_difficulty,
    question_type,
    number_of_question,
  } = useSelector((state) => state.quizzes);
  const categoryOptions = [
    { id: "9", name: "General Knowledge" },
    { id: "10", name: "Entertainment: Books" },
    { id: "11", name: "Entertainment: Film" },
    { id: "12", name: "Entertainment: Music" },
    { id: "13", name: "Entertainment: Musicals & Theatres" },
    { id: "14", name: "Entertainment: Television" },
    { id: "15", name: "Entertainment: Video Games" },
    { id: "16", name: "Entertainment: Board Games" },
    { id: "17", name: "Science & Nature" },
    { id: "18", name: "Science: Computers" },
    { id: "19", name: "Science: Mathematics" },
    { id: "20", name: "Mythology" },
    { id: "21", name: "Sports" },
    { id: "22", name: "Geography" },
    { id: "23", name: "History" },
    { id: "24", name: "Politics" },
    { id: "25", name: "Art" },
    { id: "26", name: "Celebrities" },
    { id: "27", name: "Animals" },
    { id: "28", name: "Vehicles" },
    { id: "29", name: "Entertainment: Comics" },
    { id: "30", name: "Science: Gadgets" },
    { id: "31", name: "Entertainment: Japanese Anime & Manga" },
    { id: "32", name: "Entertainment: Cartoon & Animations" },
  ];
  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choise" },
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/questions");
  };

  const handleCategory = (event) => {
    dispatch(handleCategoryChange(event.target.value));
  };
  const handleDifficulty = (event) => {
    dispatch(handleDifficultyChange(event.target.value));
  };
  const handleType = (event) => {
    dispatch(handleTypeChange(event.target.value));
  };
  const handleNumberOfQuestions = (event) => {
    dispatch(handleAmountChange(event.target.value));
  };

  return (
    <div className="mt-8 max-w-[600px] w-full mx-auto text-center p-2.5">
      <h5 className="text-4xl font-bold">Quiz App</h5>
      <form className="mt-8" onSubmit={handleSubmit}>
        <select
          value={question_category}
          onChange={handleCategory}
          className="w-full py-2.5 px-2 rounded-md border focus:outline-0"
        >
          <option value="">Category</option>
          {categoryOptions.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          value={question_difficulty}
          onChange={handleDifficulty}
          className="w-full py-2.5 px-2 rounded-sm border mt-4 focus:outline-0"
        >
          <option value="">Difficulty</option>
          {difficultyOptions.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          value={question_type}
          onChange={handleType}
          className="w-full py-2.5 px-2 rounded-md border mt-4 focus:outline-0"
        >
          <option value="">Type</option>
          {typeOptions.map((item, index) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          value={number_of_question}
          onChange={handleNumberOfQuestions}
          className="w-full py-2.5 px-2 rounded-md border mt-4 focus:outline-0"
          type="number"
          placeholder="Number of Questions"
        />

        <button
          type="submit"
          className="w-full py-1.5 px-2 rounded-md border mt-4 capitalize bg-[#00ff84]"
        >
          Get Strated
        </button>
      </form>
    </div>
  );
}
