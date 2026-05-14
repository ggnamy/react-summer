import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { studentsApi } from "../features/students/studentApi";
import { coursesApi } from "../features/courses/courseApi";
import gradesReducer from "../features/grades/gradesSlice";
import loggerMiddleware from "./middleware/logger";

export const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    grades: gradesReducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(studentsApi.middleware)
      .concat(coursesApi.middleware)
      .concat(loggerMiddleware),
});

setupListeners(store.dispatch);
