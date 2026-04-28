function TodoItem({ task, toggleTask, deleteTask }) {
  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />

      <span className={task.completed ? "done" : ""}>
        {task.text}
      </span>

      <button onClick={() => deleteTask(task.id)}>✕</button>
    </div>
  );
}

export default TodoItem;