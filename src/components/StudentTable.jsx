import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../features/students/studentsSlice";
import { selectAllStudents } from "../features/students/selectors";

function StudentTable() {
  const students = useSelector(selectAllStudents);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Student ID</th><th>Major</th><th>GPA</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td>{student.gpa}</td>
            <td><button onClick={() => handleDelete(student.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;