import { useState } from "react";

function AddStudentForm({ onAddStudent }) {
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    major: "",
    gpa: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.studentId || !formData.major || !formData.gpa) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    onAddStudent(formData);

    setFormData({
      name: "",
      studentId: "",
      major: "",
      gpa: "",
    });
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Student name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="text"
        name="studentId"
        placeholder="Student ID"
        value={formData.studentId}
        onChange={handleChange}
      />

      <input
        type="text"
        name="major"
        placeholder="Major"
        value={formData.major}
        onChange={handleChange}
      />

      <input
        type="number"
        name="gpa"
        placeholder="GPA"
        step="0.01"
        min="0"
        max="4"
        value={formData.gpa}
        onChange={handleChange}
      />

      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;