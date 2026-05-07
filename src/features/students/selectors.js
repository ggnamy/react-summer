// src/features/students/selectors.js
export const selectAllStudents = (state) => state.students.list;
export const selectStudentCount = (state) => state.students.list.length;
export const selectAverageGpa = (state) => {
  const list = state.students.list;
  if (list.length === 0) return 0;
  const total = list.reduce((sum, s) => sum + s.gpa, 0);
  return (total / list.length).toFixed(2);
};