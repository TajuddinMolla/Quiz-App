import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { handleScoreChange } from "../features/quiz/quizSlice";
import Loader from "../components/Loader";

export default function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const {
    question_category,
    question_difficulty,
    question_type,
    number_of_question,
  } = useSelector((state) => state.quizzes);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      let apiUrl = `/api.php?amount=${number_of_question}`;
      if (question_category) {
        apiUrl = apiUrl.concat(`&category=${question_category}`);
      }
      if (question_difficulty) {
        apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
      }
      if (question_type) {
        apiUrl = apiUrl.concat(`&type=${question_type}`);
      }
      const { data } = await axios.get(`${apiUrl}`);
      setQuestions(data.results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    if (questions.length) {
      const question = questions[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [questions, questionIndex]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  function handleAnswerSelected(answerIndex, e) {
    const newSelectedAnswer = [...selectedAnswer];
    newSelectedAnswer[questionIndex] = e.target.textContent;

    setSelectedAnswer(newSelectedAnswer);
    const newAnswers = [...answers];
    if (questions[questionIndex].correct_answer == e.target.textContent) {
      newAnswers[questionIndex] = true;
      setAnswers(newAnswers);
    }
  }

  function handleNextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handlePrevQuestion() {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  }

  function handleSkipQuestion() {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = null;
    setAnswers(newAnswers);
    handleNextQuestion();
  }

  function handleSubmitQuiz() {
    const mark = answers.filter((item) => item === true).length;
    dispatch(handleScoreChange(mark));
    setSelectedAnswer([]);

    //Set Total Quiz Mark
    let totalQuizzes = JSON.parse(localStorage.getItem("user_statistics"));
    const user = localStorage.getItem("auth");
    if (totalQuizzes) {
      totalQuizzes.push({
        user,
        mark,
      });
    } else {
      totalQuizzes = [
        {
          user,
          mark,
        },
      ];
    }
    localStorage.setItem("user_statistics", JSON.stringify(totalQuizzes));
    navigate("/results");
  }
  if (loading) return <Loader />;

  if (error)
    return <div className="w-[90%] mx-auto my-8 text-[#002333]">{error}</div>;

  return (
    <div className="w-[90%] mx-auto my-8 text-[#002333]">
      <div>
        <h3 className="text-xl md:text-3xl mb-4 pb-2 border-b border-[#e5e5e5]">
          {questions?.[0].question}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {options.map((item, index) => (
            <div
              key={index}
              className={`w-full h-[58px]  ${
                selectedAnswer[questionIndex] == item
                  ? "bg-[#00ff84]"
                  : "bg-[#e4e8ee]"
              } rounded cursor-pointer px-4 font-medium flex items-center`}
              onClick={(e) => handleAnswerSelected(index, e)}
            >
              {item}
            </div>
          ))}
        </div>

        <button className="underline mt-4" onClick={handleSkipQuestion}>
          Skip
        </button>
      </div>

      <div className="progressBar">
        <div className="backButton" onClick={handlePrevQuestion}>
          <span className="material-icons-outlined"> arrow_back </span>
        </div>
        <div className="rangeArea">
          <div className="rangeBody">
            <div
              className="progress"
              style={{
                width: `${(questionIndex + 1) * (100 / number_of_question)}%`,
              }}
            ></div>
          </div>
        </div>
        {questionIndex < questions.length - 1 ? (
          <button
            className="bg-[#00ff84] px-2 md:px-5 py-2 mr-2 flex justify-center items-center gap-2.5 text-[10px] md:text-[15px] font-medium uppercase rounded-lg"
            onClick={handleNextQuestion}
          >
            <span className="hidden md:inline-block">Next Question</span>
            <span className="material-icons-outlined"> arrow_forward </span>
          </button>
        ) : (
          <button
            className="bg-[#00ff84] px-5 py-2 flex justify-center items-center gap-2.5 text-[10px] md:text-[15px] font-medium uppercase rounded-lg"
            onClick={handleSubmitQuiz}
          >
            <span>Submit</span>
          </button>
        )}
      </div>
    </div>
  );
}
