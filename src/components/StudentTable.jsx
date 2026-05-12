import { useGetStudentsQuery, useDeleteStudentMutation } from "../features/students/studentApi";

function StudentTable() {
  const { data: students = [], isLoading, isError } = useGetStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      deleteStudent(id);
    }
  };

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load students.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Student ID</th><th>Major</th><th>GPA</th><th>Actions</th>
        </tr>
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
