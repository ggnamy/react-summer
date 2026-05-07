import { useSelector } from "react-redux";
import { selectStudentCount, selectAverageGpa } from "../features/students/selectors";

function GpaSummary() {
  const studentCount = useSelector(selectStudentCount);
  const averageGpa = useSelector(selectAverageGpa);

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
    </div>
  );
}

export default GpaSummary;