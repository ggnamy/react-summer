import { createSelector } from "@reduxjs/toolkit";
import { selectAllCourses } from "./coursesSlice";

// ── Primitive selectors (scalars — no memoization needed)
export const selectCoursesStatus = (state) => state.courses.status;
export const selectCoursesError = (state) => state.courses.error;

// ── Derived selectors (memoized)
export const makeSelectCoursesAboveCredits = (minCredits) =>
  createSelector(
    selectAllCourses,
    (courses) => courses.filter((c) => c.credits >= minCredits)
  );
