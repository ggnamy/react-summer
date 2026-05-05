export const selectAllStudents = (state) => state.students.list;

export const selectStudentCount = (state) => state.students.list.length;

export const selectAverageGpa = (state) => {
  const students = state.students.list;

  if (students.length === 0) {
    return 0;
  }

  const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);

  return totalGpa / students.length;
};