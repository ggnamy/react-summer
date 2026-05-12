import { createSelector } from "@reduxjs/toolkit";
import { studentsApi } from "./studentApi";
import { coursesApi } from "../courses/courseApi";
import { selectAllGrades } from "../grades/gradesSlice";

const selectStudentsResult = studentsApi.endpoints.getStudents.select();
const selectStudentsData = createSelector(
  selectStudentsResult,
  (result) => result.data ?? []
);

const selectCoursesResult = coursesApi.endpoints.getCourses.select();
const selectCoursesData = createSelector(
  selectCoursesResult,
  (result) => result.data ?? []
);

export const selectAverageGpa = createSelector(selectStudentsData, (students) => {
  if (!students.length) return "—";
  return (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2);
});

export const selectHighAchievers = createSelector(
  selectStudentsData,
  (students) => students.filter((s) => s.gpa >= 3.5)
);

export const selectGpaDistribution = createSelector(selectStudentsData, (students) => ({
  high: students.filter((s) => s.gpa >= 3.5).length,
  medium: students.filter((s) => s.gpa >= 2.5 && s.gpa < 3.5).length,
  low: students.filter((s) => s.gpa < 2.5).length,
}));

export const selectAllGradesWithNames = createSelector(
  selectStudentsData,
  selectCoursesData,
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
