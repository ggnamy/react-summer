
export const selectAllGrades = (state) => state.grades.list;


export const selectGradeCount = (state) => state.grades.list.length;

export const selectAverageGrade = (state) => {
  const list = state.grades.list;
  if (list.length === 0) return "N/A"; 
  const total = list.reduce((sum, grade) => sum + grade.score, 0);
  return (total / list.length).toFixed(2);
};


export const selectGradeById = (id) => (state) =>
  state.grades.list.find((grade) => grade.id === id);

export const selectHighGrades = (state) =>
  state.grades.list.filter((grade) => grade.score >= 80);