import { useState } from "react";
import {
  useGetCoursesQuery,
  useAddCourseMutation,
  useDeleteCourseMutation,
} from "../features/courses/courseApi";

function CoursesPage() {
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery();
  const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [formData, setFormData] = useState({ code: "", title: "", credits: "" });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.credits) {
      alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    await addCourse({ code: formData.code, title: formData.title, credits: Number(formData.credits) });
    setFormData({ code: "", title: "", credits: "" });
  };

  if (isLoading) return <div className="spinner">Loading…</div>;
  if (isError) return <div className="error-banner"><p>Failed to load courses.</p></div>;

  return (
    <div className="fade-in">
      <div className="form-card">
        <h3 className="form-title">📚 Add New Course</h3>
        <form className="input-group" onSubmit={handleAdd}>
          <input placeholder="Code (e.g. CS101)" value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} />
          <input placeholder="Course Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
          <input type="number" placeholder="Credits" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: e.target.value })} />
          <button type="submit" className="btn-submit" disabled={isAdding}>
            {isAdding ? "Adding…" : "Add Course"}
          </button>
        </form>
      </div>

      <div className="dashboard-grid">
        {courses.map((c) => (
          <div key={c.id} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <span className="major-pill">{c.code}</span>
                <h3 style={{ marginTop: "10px" }}>{c.title}</h3>
                <div className="stat-note">{c.credits} Credits</div>
              </div>
              <button className="btn-delete-sm" onClick={() => deleteCourse(c.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;
