import { useState } from "react";
import { useAddStudentMutation } from "../features/students/studentApi";

const EMPTY_FORM = { name: "", studentId: "", major: "", gpa: "" };

function AddStudentForm() {
  const [addStudent, { isLoading }] = useAddStudentMutation();
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent({ ...form, gpa: parseFloat(form.gpa) || 0 }).unwrap();
    setForm(EMPTY_FORM);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="studentId" value={form.studentId} onChange={handleChange} placeholder="Student ID" required />
      <input name="major" value={form.major} onChange={handleChange} placeholder="Major" />
      <input name="gpa" value={form.gpa} onChange={handleChange} placeholder="GPA (0.0–4.0)" type="number" step="0.01" min="0" max="4" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving…" : "+ Add Student"}
      </button>
    </form>
  );
}

export default AddStudentForm;
