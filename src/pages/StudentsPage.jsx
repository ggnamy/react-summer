import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStudents,
  addStudentAsync,
  deleteStudentAsync,
  updateStudentAsync
} from "../features/students/studentsThunks";

function StudentsPage() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    gpa: ""
  });

  const [isEditing, setIsEditing] = useState(null);

  // โหลดข้อมูลจาก API เมื่อเปิดหน้า
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  // คำนวณสถิติ
  const stats = {
    avg: students.length
      ? (students.reduce((a, b) => a + Number(b.gpa), 0) / students.length).toFixed(2)
      : "0.00",
    high: students.length
      ? Math.max(...students.map((s) => Number(s.gpa))).toFixed(2)
      : "0.00"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.studentId || !formData.gpa) return;

    if (isEditing) {
      dispatch(updateStudentAsync({ id: isEditing, ...formData, gpa: Number(formData.gpa) }));
      setIsEditing(null);
    } else {
      dispatch(addStudentAsync({ ...formData, gpa: Number(formData.gpa) }));
    }

    setFormData({ name: "", studentId: "", major: "", gpa: "" });
  };

  const handleEdit = (student) => {
    setIsEditing(student.id);
    setFormData({
      name: student.name,
      studentId: student.studentId,
      major: student.major,
      gpa: student.gpa
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setFormData({ name: "", studentId: "", major: "", gpa: "" });
  };

  return (
    <div className="students-page fade-in">
      {/* Hero Section */}
      <div className="page-hero">
        <div className="hero-badge">🎀 Kawaii Student Dashboard</div>
        <h1 className="hero-title">
          Student <span className="gradient-text">Management</span> ✨
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-purple">👩🏻‍🎓</div>
            <div className="stat-badge">Overview</div>
          </div>
          <span>Total Students</span>
          <h2>{students.length}</h2>
          <div className="stat-note">นักศึกษาในระบบ</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-pink">📈</div>
            <div className="stat-badge">Academic</div>
          </div>
          <span>Average GPA</span>
          <h2>{stats.avg}</h2>
          <div className="stat-note">เกรดเฉลี่ยรวม</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-green">🏆</div>
            <div className="stat-badge">Top Score</div>
          </div>
          <span>Highest GPA</span>
          <h2>{stats.high}</h2>
          <div className="stat-note">คะแนนสูงสุด</div>
        </div>
      </div>

      {/* Form Card */}
      <div className="form-card">
        <div className="form-title-row">
          <div>
            <p className="form-title">{isEditing ? "🪄 Edit Student" : "➕ Add Student"}</p>
          </div>
          <div className="form-status">{isEditing ? "✏️ Edit Mode" : "🌷 Create Mode"}</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <label>👤 Full Name</label>
              <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="input-field">
              <label>🆔 Student ID</label>
              <input value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} />
            </div>
            <div className="input-field">
              <label>📚 Major</label>
              <input value={formData.major} onChange={(e) => setFormData({ ...formData, major: e.target.value })} />
            </div>
            <div className="input-field">
              <label>⭐ GPA</label>
              <input type="number" step="0.01" value={formData.gpa} onChange={(e) => setFormData({ ...formData, gpa: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-submit">{isEditing ? "💾 Update" : "🌸 Save"}</button>
              {isEditing && (
                <button type="button" className="btn-cancel" onClick={handleCancelEdit}>❌ Cancel</button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="table-card">
        <div className="table-header">
          <h3>📋 Student Records</h3>
          <div className="table-pill">💖 {students.length} students</div>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>ID</th>
                <th>MAJOR</th>
                <th>GPA</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="student-name">
                      <div className="student-avatar">🎓</div>
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td className="student-id">{s.studentId}</td>
                  <td><span className="major-pill">📘 {s.major}</span></td>
                  <td><span className="gpa-badge">{Number(s.gpa).toFixed(2)}</span></td>
                  <td>
                    <div className="action-group">
                      <button className="btn-edit-sm" onClick={() => handleEdit(s)}>✏️ Edit</button>
                      <button className="btn-delete-sm" onClick={() => dispatch(deleteStudentAsync(s.id))}>🗑 Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StudentsPage;