function StudentTable({ students, onDeleteStudent }) {
  return (
    <div className="table-wrapper">
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Major</th>
            <th>GPA</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-cell">
                ไม่มีข้อมูลนักศึกษา
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.studentId}</td>
                <td>{student.major}</td>
                <td>{student.gpa.toFixed(2)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;