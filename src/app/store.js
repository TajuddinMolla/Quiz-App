import { configureStore } from "@reduxjs/toolkit";
import quizSliceReducer from "../features/quiz/quizSlice";
import userSliceReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    quizzes: quizSliceReducer,
  },
});
