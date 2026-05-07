// src/features/courses/selectors.js

// Select the full list of courses from the store
export const selectAllCourses = (state) => state.courses.list;

// Select total count of courses
export const selectCourseCount = (state) => state.courses.list.length;

// Select course by its ID (useful for edit modal or detail page)
export const selectCourseById = (id) => (state) => {
  return state.courses.list.find((course) => course.id === id);
};

// Select courses above a certain credit threshold (e.g., 3 credits or more)
export const selectCoursesAboveCredits = (state, minCredits) =>
  state.courses.list.filter((course) => course.credits >= minCredits);