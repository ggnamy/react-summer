import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses, addCourseThunk, deleteCourseThunk } from "../features/courses/coursesThunks";

function CoursesPage() {
  const { list: courses, status } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ code: "", title: "", credits: "" });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.title || !formData.credits) {
        alert("⚠️ กรุณากรอกข้อมูลให้ครบ");
        return;
    }
    dispatch(addCourseThunk({ 
      code: formData.code, 
      title: formData.title, 
      credits: Number(formData.credits) 
    }));
    setFormData({ code: "", title: "", credits: "" });
  };

  return (
    <div className="fade-in">
      <div className="form-card">
        <h3 className="form-title">📚 Add New Course</h3>
        <form className="input-group" onSubmit={handleAdd}>
          <input placeholder="Code (e.g. CS101)" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
          <input placeholder="Course Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          <input type="number" placeholder="Credits" value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} />
          <button type="submit" className="btn-submit">Add Course</button>
        </form>
      </div>

      <div className="dashboard-grid">
        {status === 'loading' && <p>Loading...</p>}
        {courses.map(c => (
          <div key={c.id} className="stat-card">
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <span className="major-pill">{c.code}</span>
                    <h3 style={{marginTop: '10px'}}>{c.title}</h3>
                    <div className="stat-note">{c.credits} Credits</div>
                </div>
                <button className="btn-delete-sm" onClick={() => dispatch(deleteCourseThunk(c.id))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoursesPage;