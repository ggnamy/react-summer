import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../features/students/studentsSlice";

const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };

function AddStudentForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent({ id: Date.now(), ...form, gpa: parseFloat(form.gpa) || 0 }));
    setForm(EMPTY_FORM); // รีเซ็ตฟอร์มหลังส่งข้อมูล
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} required />
      <input name="major" placeholder="Major" value={form.major} onChange={handleChange} />
      <input name="gpa" placeholder="GPA (0.0–4.0)" value={form.gpa} onChange={handleChange} type="number" step="0.01" min="0" max="4" />
      <button type="submit">+ Add Student</button>
    </form>
  );
}

export default AddStudentForm;