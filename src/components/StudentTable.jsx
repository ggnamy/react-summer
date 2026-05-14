import { useGetStudentsQuery, useDeleteStudentMutation } from "../features/students/studentApi";

function StudentTable() {
  const {
    data: students = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetStudentsQuery(undefined, {
    pollingInterval: 30_000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = (id) => {
    if (window.confirm("Delete this student?")) {
      deleteStudent(id);
    }
  };

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>Failed to load students.</p>;

  return (
    <div>
      {isFetching && <span style={{ fontSize: 11, color: '#3A5BA0' }}>↻ Syncing…</span>}
      <button onClick={refetch}>↻ Refresh</button>
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
    </div>
  );
}

export default StudentTable;
