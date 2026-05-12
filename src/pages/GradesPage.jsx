import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGrade, deleteGrade, updateGrade } from "../features/grades/gradesSlice";
import { selectAllGrades } from "../features/grades/gradesSlice";
import { selectAllStudents } from "../features/students/studentsSlice";
import { selectAllCourses } from "../features/courses/coursesSlice";

function GradesPage() {
  const grades = useSelector(selectAllGrades);
  const students = useSelector(selectAllStudents);
  const courses = useSelector(selectAllCourses);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ studentId: "", courseId: "", score: "" });
  const [isEditing, setIsEditing] = useState(null);

  const handleAction = (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.courseId || formData.score === "") {
        alert("⚠️ โปรดเลือกนักศึกษา วิชา และใส่คะแนนให้ครบ");
        return;
    }

    const student = students.find(s => String(s.id) === String(formData.studentId));
    const course = courses.find(c => String(c.id) === String(formData.courseId));

    const payload = {
      id: isEditing || Date.now(),
      studentName: student?.name || "Unknown",
      courseTitle: course?.title || "Unknown",
      score: Number(formData.score),
      grade: Number(formData.score) >= 80 ? "A" : Number(formData.score) >= 70 ? "B" : "C",
      studentId: formData.studentId,
      courseId: formData.courseId
    };

    if (isEditing) {
      dispatch(updateGrade(payload));
      setIsEditing(null);
    } else {
      dispatch(addGrade(payload));
    }
    setFormData({ studentId: "", courseId: "", score: "" });
  };

  return (
    <div className="fade-in">
      <div className="form-card">
        <h3 className="form-title">{isEditing ? "📝 Edit Grade Entry" : "🎯 Record Grade"}</h3>
        <form className="input-group" onSubmit={handleAction}>
          <select value={formData.studentId} onChange={e => setFormData({...formData, studentId: e.target.value})}>
            <option value="">Select Student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={formData.courseId} onChange={e => setFormData({...formData, courseId: e.target.value})}>
            <option value="">Select Course</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <input type="number" placeholder="Score" value={formData.score} onChange={e => setFormData({...formData, score: e.target.value})} />
          <button type="submit" className="btn-submit">{isEditing ? "Update" : "Save"}</button>
          {isEditing && <button type="button" className="btn-cancel" onClick={() => setIsEditing(null)}>Cancel</button>}
        </form>
      </div>

      <div className="table-wrapper">
        <table>
          <thead><tr><th>Student</th><th>Course</th><th>Score</th><th>Grade</th><th>Actions</th></tr></thead>
          <tbody>
            {grades.map(g => (
              <tr key={g.id}>
                <td><strong>{g.studentName}</strong></td>
                <td>{g.courseTitle}</td>
                <td>{g.score}</td>
                <td><span className="badge-major">{g.grade}</span></td>
                <td className="action-btns">
                  <button className="btn-edit-sm" onClick={() => {
                    setIsEditing(g.id);
                    setFormData({ studentId: g.studentId, courseId: g.courseId, score: g.score });
                  }}>Edit</button>
                  <button className="btn-delete-sm" onClick={() => dispatch(deleteGrade(g.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GradesPage;
