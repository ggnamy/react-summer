import { createSelector } from "@reduxjs/toolkit";
import { selectAllStudents } from "./studentsSlice";
import { selectAllCourses } from "../courses/coursesSlice";
import { selectAllGrades } from "../grades/gradesSlice";

// ── Primitive selectors (scalars — no memoization needed)
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

// ── Derived selectors (memoized — compute arrays or objects)
export const selectAverageGpa = createSelector(
  selectAllStudents,
  (students) => {
    if (!students.length) return "—";
    return (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectAllStudents,
  (students) => students.filter((s) => s.gpa >= 3.5)
);

export const selectGpaDistribution = createSelector(
  selectAllStudents,
  (students) => ({
    high: students.filter((s) => s.gpa >= 3.5).length,
    medium: students.filter((s) => s.gpa >= 2.5 && s.gpa < 3.5).length,
    low: students.filter((s) => s.gpa < 2.5).length,
  })
);

// ── Cross-slice selector (joins grades with student and course names)
export const selectAllGradesWithNames = createSelector(
  selectAllStudents,
  selectAllCourses,
  selectAllGrades,
  (students, courses, grades) =>
    grades.map((grade) => {
      const student = students.find((s) => String(s.id) === String(grade.studentId));
      const course = courses.find((c) => String(c.id) === String(grade.courseId));
      return {
        ...grade,
        studentName: student ? student.name : "Unknown Student",
        courseTitle: course ? course.title : "Unknown Course",
        courseCode: course ? course.code : "N/A",
      };
    })
);
