// src/features/students/selectors.js

// Select the full list of students from the store
export const selectAllStudents = (state) => state.students.list;

// Select total count of students
export const selectStudentCount = (state) => state.students.list.length;

// Find highest GPA
export const selectHighestGpa = (state) => {
  const students = state.students.list;
  return Math.max(...students.map((s) => s.gpa)).toFixed(2);
};

// Find lowest GPA
export const selectLowestGpa = (state) => {
  const students = state.students.list;
  return Math.min(...students.map((s) => s.gpa)).toFixed(2);
};

// Compute average GPA across all students
export const selectAverageGpa = (state) => {
  const list = state.students.list;
  if (list.length === 0) return "0.00";
  const total = list.reduce((sum, s) => sum + s.gpa, 0);
  return (total / list.length).toFixed(2);
};

// Find a single student by id (useful for edit modal)
export const selectStudentById = (id) => (state) =>
  state.students.list.find((s) => s.id === id);

// Count students above a GPA threshold
export const selectHighAchievers = (state) =>
  state.students.list.filter((s) => s.gpa >= 3.5);