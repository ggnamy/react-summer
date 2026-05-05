function GpaSummary({ students }) {
  const averageGpa =
    students.length > 0
      ? students.reduce((sum, student) => sum + student.gpa, 0) / students.length
      : 0;

  const topStudent =
    students.length > 0
      ? [...students].sort((a, b) => b.gpa - a.gpa)[0]
      : null;

  return (
    <section className="gpa-summary">
      <div>
        <span className="stat-label">Average GPA</span>
        <strong>{averageGpa.toFixed(2)}</strong>
        <p>ค่าเฉลี่ย GPA ของนักศึกษาทั้งหมด</p>
      </div>

      <div>
        <span className="stat-label">Top Student</span>
        <strong>{topStudent ? topStudent.name : "-"}</strong>
        <p>{topStudent ? `GPA ${topStudent.gpa.toFixed(2)}` : "ยังไม่มีข้อมูล"}</p>
      </div>
    </section>
  );
}

export default GpaSummary;