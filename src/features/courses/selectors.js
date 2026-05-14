import { createSelector } from "@reduxjs/toolkit";
import { coursesApi } from "./courseApi";

const selectCoursesResult = coursesApi.endpoints.getCourses.select();
const selectCoursesData = createSelector(
  selectCoursesResult,
  (result) => result.data ?? []
);

export const makeSelectCoursesAboveCredits = (minCredits) =>
  createSelector(
    selectCoursesData,
    (courses) => courses.filter((c) => c.credits >= minCredits)
  );
