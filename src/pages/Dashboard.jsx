import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent, deleteStudent, updateStudent } from "../features/students/studentsSlice";

function StudentsPage() {
  const students = useSelector((state) => state.students.list);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({ name: "", studentId: "", major: "", gpa: "" });

  const handleAction = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateStudent({ id: isEditing, ...formData, gpa: Number(formData.gpa) }));
      setIsEditing(null);
    } else {
      dispatch(addStudent({ id: Date.now(), ...formData, gpa: Number(formData.gpa) }));
    }
    setFormData({ name: "", studentId: "", major: "", gpa: "" });
  };

  const startEdit = (s) => {
    setIsEditing(s.id);
    setFormData({ name: s.name, studentId: s.studentId, major: s.major, gpa: s.gpa });
  };

  const avgGpa = students.length > 0 
    ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2) 
    : "0.00";

  return (
    <div className="fade-in">
      {/* Mini Dashboard Section */}
      <div className="dashboard-grid">
        <div className="stat-card">
          <p className="eyebrow">Total Students</p>
          <strong>{students.length}</strong>
          <span>People enrolled</span>
        </div>
        <div className="stat-card">
          <p className="eyebrow">Average GPA</p>
          <strong>{avgGpa}</strong>
          <span>Academic performance</span>
        </div>
      </div>

      <div className="section-heading" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <h2>{isEditing ? "📝 Edit Student" : "🎓 Student Management"}</h2>
        <span className="badge">{students.length} Total</span>
      </div>

      {/* Form Section */}
      <form className="glass-form" onSubmit={handleAction}>
        <input placeholder="Name" value={formData.name} required onChange={e => setFormData({...formData, name: e.target.value})} />
        <input placeholder="Student ID" value={formData.studentId} required onChange={e => setFormData({...formData, studentId: e.target.value})} />
        <input placeholder="Major" value={formData.major} required onChange={e => setFormData({...formData, major: e.target.value})} />
        <input type="number" step="0.01" placeholder="GPA" value={formData.gpa} required onChange={e => setFormData({...formData, gpa: e.target.value})} />
        <button type="submit" className="btn-add">{isEditing ? "Update" : "Add Student"}</button>
      </form>

      {/* Table Section */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Student ID</th><th>Major</th><th>GPA</th><th style={{textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td><strong>{s.name}</strong></td>
                <td>{s.studentId}</td>
                <td><span className="badge" style={{background: '#e0e7ff', color: '#4338ca'}}>{s.major}</span></td>
                <td>{s.gpa.toFixed(2)}</td>
                <td style={{textAlign: 'center'}}>
                  <button className="btn-edit" onClick={() => startEdit(s)}>Edit</button>
                  <button className="btn-delete" onClick={() => dispatch(deleteStudent(s.id))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsPage;