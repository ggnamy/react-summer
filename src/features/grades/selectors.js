// src/features/grades/selectors.js

// Select the full list of grades from the store
export const selectAllGrades = (state) => state.grades.list;

// Select total count of grades
export const selectGradeCount = (state) => state.grades.list.length;

// Compute average score across all grades
export const selectAverageGrade = (state) => {
  const list = state.grades.list;
  if (list.length === 0) return "N/A"; // If no grades, return "N/A"
  const total = list.reduce((sum, grade) => sum + grade.score, 0);
  return (total / list.length).toFixed(2);
};

// Find a grade by id (useful for edit modal)
export const selectGradeById = (id) => (state) =>
  state.grades.list.find((grade) => grade.id === id);

// Count grades above a certain threshold (e.g., A+ or B+)
export const selectHighGrades = (state) =>
  state.grades.list.filter((grade) => grade.score >= 80);