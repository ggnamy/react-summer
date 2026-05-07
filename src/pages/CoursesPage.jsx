import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCourse, deleteCourse } from "../features/courses/coursesSlice";

function CoursesPage() {
  const courses = useSelector((state) => state.courses.list);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ code: "", title: "", credits: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.code.trim() || !formData.title.trim() || !formData.credits) {
        alert("⚠️ กรุณาระบุรหัสวิชา ชื่อวิชา และหน่วยกิตให้ครบถ้วน");
        return;
    }
    dispatch(addCourse({ id: Date.now(), ...formData, credits: Number(formData.credits) }));
    setFormData({ code: "", title: "", credits: "" });
  };

  return (
    <div>
      <div className="form-card">
        <h3 className="form-title">📚 Add New Course</h3>
        <form className="input-group" onSubmit={handleAdd}>
          <input placeholder="Course Code (e.g. CS101)" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
          <input placeholder="Course Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="number" placeholder="Credits" value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} />
          <button type="submit" className="btn-submit">Add Course</button>
        </form>
      </div>

      <div className="dashboard-grid">
        {courses.map(c => (
          <div key={c.id} className="stat-card">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <span className="badge-major" style={{marginBottom: '8px', display: 'inline-block'}}>{c.code}</span>
                    <h3 style={{fontSize: '1.1rem'}}>{c.title}</h3>
                    <p style={{color: '#64748b', fontSize: '0.9rem'}}>{c.credits} Credits</p>
                </div>
                <button className="btn-icon-delete" onClick={() => dispatch(deleteCourse(c.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;