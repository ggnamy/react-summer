export const selectAllGrades = (state) => state.grades.list;

export const selectAllGradesWithNames = (state) => {
  const students = state.students.list; 
  const courses = state.courses.list;   
  const grades = state.grades.list;    

  return grades.map((grade) => {
    
    const student = students.find((s) => String(s.id) === String(grade.studentId));
    

    const course = courses.find((c) => String(c.id) === String(grade.courseId));
    
    return {
      ...grade,

      studentName: student ? student.name : "Unknown Student",
      
      courseTitle: course ? course.title : "Unknown Course",
      
      courseCode: course ? course.code : "N/A"
    };
  });
};