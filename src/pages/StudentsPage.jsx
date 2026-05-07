import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addStudent,
  deleteStudent,
  updateStudent
} from "../features/students/studentsSlice";

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

  const stats = {
    avg: students.length
      ? (
          students.reduce((a, b) => a + Number(b.gpa), 0) / students.length
        ).toFixed(2)
      : "0.00",
    high: students.length
      ? Math.max(...students.map((s) => Number(s.gpa))).toFixed(2)
      : "0.00"
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.studentId || !formData.gpa) return;

    if (isEditing) {
      dispatch(
        updateStudent({
          id: isEditing,
          ...formData,
          gpa: Number(formData.gpa)
        })
      );
      setIsEditing(null);
    } else {
      dispatch(
        addStudent({
          id: Date.now(),
          ...formData,
          gpa: Number(formData.gpa)
        })
      );
    }

    setFormData({
      name: "",
      studentId: "",
      major: "",
      gpa: ""
    });
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
    setFormData({
      name: "",
      studentId: "",
      major: "",
      gpa: ""
    });
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

      {/* Stats */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-purple">👩🏻‍🎓</div>
            <div className="stat-badge">Overview</div>
          </div>
          <span>Total Students</span>
          <h2>{students.length}</h2>
          <div className="stat-note">จำนวนนักศึกษาทั้งหมดในระบบ</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-pink">📈</div>
            <div className="stat-badge">Academic</div>
          </div>
          <span>Average GPA</span>
          <h2>{stats.avg}</h2>
          <div className="stat-note">ค่าเฉลี่ยผลการเรียนรวม</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-green">🏆</div>
            <div className="stat-badge">Top Score</div>
          </div>
          <span>Highest GPA</span>
          <h2>{stats.high}</h2>
          <div className="stat-note">คะแนนเฉลี่ยสูงสุดในระบบ</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon icon-blue">💫</div>
            <div className="stat-badge">System</div>
          </div>
          <span>System Status</span>
          <h2 style={{ fontSize: "1.2rem", marginTop: "12px" }}>Stable</h2>
          <div className="stat-note">ระบบพร้อมใช้งานปกติ</div>
        </div>
      </div>

      {/* Form */}
      <div className="form-card">
        <div className="form-title-row">
          <div>
            <p className="form-title">
              {isEditing ? "🪄 Edit Student Details" : "➕ Add New Student"}
            </p>
            <p className="form-subtitle">
              {isEditing
                ? "กำลังแก้ไขข้อมูลนักศึกษา กรุณาตรวจสอบก่อนอัปเดต"
                : "กรอกข้อมูลนักศึกษาใหม่ให้ครบถ้วนแล้วกดบันทึก"}
            </p>
          </div>

          <div className="form-status">
            {isEditing ? "✏️ Editing Mode" : "🌷 Create Mode"}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-field">
              <label>👤 Full Name</label>
              <input
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label>🆔 Student ID</label>
              <input
                placeholder="Enter student ID"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label>📚 Major</label>
              <input
                placeholder="Enter major"
                value={formData.major}
                onChange={(e) =>
                  setFormData({ ...formData, major: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label>⭐ GPA</label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter GPA"
                value={formData.gpa}
                onChange={(e) =>
                  setFormData({ ...formData, gpa: e.target.value })
                }
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {isEditing ? "💾 Update" : "🌸 Save"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancelEdit}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="table-card">
        <div className="table-header">
          <div className="table-title-group">
            <h3>📋 Student Records</h3>
            <p>รายการข้อมูลนักศึกษาทั้งหมดในระบบ</p>
          </div>

          <div className="table-pill">💖 {students.length} students listed</div>
        </div>

        {students.length === 0 ? (
          <div className="empty-state">
            <span className="emoji">૮ ˶ᵔ ᵕ ᵔ˶ ა</span>
            <h4>No student data yet</h4>
            <p>เริ่มเพิ่มข้อมูลนักศึกษาคนแรกได้เลยน้า ✨</p>
          </div>
        ) : (
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

                    <td>
                      <span className="major-pill">📘 {s.major || "N/A"}</span>
                    </td>

                    <td>
                      <span className="gpa-badge">
                        {Number(s.gpa).toFixed(2)}
                      </span>
                    </td>

                    <td>
                      <div className="action-group">
                        <button
                          className="btn-edit-sm"
                          onClick={() => handleEdit(s)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn-delete-sm"
                          onClick={() => dispatch(deleteStudent(s.id))}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentsPage;