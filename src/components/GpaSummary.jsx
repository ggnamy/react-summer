import { useSelector } from "react-redux";
import { selectStudentCount } from "../features/students/studentsSlice";
import { selectAverageGpa } from "../features/students/selectors";
import { selectGradeCount } from "../features/grades/gradesSlice";
import { selectAverageGrade } from "../features/grades/selectors";

function GpaSummary() {
  const studentCount = useSelector(selectStudentCount);
  const averageGpa = useSelector(selectAverageGpa);
  const gradeCount = useSelector(selectGradeCount);
  const averageGrade = useSelector(selectAverageGrade);

  return (
    <div className="gpa-summary">
      <div className="stat-card">
        <span className="stat-value">{studentCount}</span>
        <span className="stat-label">Total Students</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{averageGpa}</span>
        <span className="stat-label">Average GPA</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{gradeCount}</span>
        <span className="stat-label">Total Grades</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{averageGrade}</span>
        <span className="stat-label">Average Grade</span>
      </div>
    </div>
  );
}

export default GpaSummary;