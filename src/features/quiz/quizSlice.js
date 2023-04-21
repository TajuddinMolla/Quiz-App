import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    question_category: "",
    question_difficulty: "",
    question_type: "",
    number_of_question: 5,
    score: 0,
  },
  reducers: {
    handleCategoryChange: (state, action) => {
      state.question_category = action.payload;
    },
    handleDifficultyChange: (state, action) => {
      state.question_difficulty = action.payload;
    },
    handleTypeChange: (state, action) => {
      state.question_type = action.payload;
    },
    handleAmountChange: (state, action) => {
      state.number_of_question = action.payload;
    },
    handleScoreChange: (state, action) => {
      state.score = action.payload;
    },
  },
});

export const {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
  handleAmountChange,
  handleScoreChange,
} = quizSlice.actions;

export default quizSlice.reducer;
