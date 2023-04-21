import React from "react";

export default function Statistics() {
  const user = localStorage.getItem("auth");
  const quizzes = JSON.parse(localStorage.getItem("user_statistics"));

  const totalQuizzes = quizzes?.filter((item) => item.user == user);
  if (!totalQuizzes || totalQuizzes.length <= 0)
    return (
      <div className="w-[90%] mx-auto my-8 text-[#002333]">
        <div className="mt-8">
          <h5 className="text-xl md:text-2xl">No Quizzes Found</h5>
        </div>
      </div>
    );

  return (
    <div className="w-[90%] mx-auto my-8 text-[#002333]">
      <div className="mt-8">
        <h3 className="text-2xl md:text-4xl">Statistics</h3>
        <div className="mt-8">
          <table className="w-full text-center">
            <thead>
              <th className="p-2.5 border">Quiz No.</th>
              <th className="p-2.5 border">Quiz MArk</th>
            </thead>
            <tbody>
              {totalQuizzes.map((quiz, index) => (
                <tr key={index}>
                  <td className="p-2.5 border">Quiz {index + 1}</td>
                  <td className="p-2.5 border">{quiz.mark}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-end gap-6 items-center">
            <p className="text-xl">Total Score:</p>
            <p className="text-xl">
              {totalQuizzes.reduce((prev, cur) => prev + cur.mark, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
