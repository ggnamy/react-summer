import { useState } from "react";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (text.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setText("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = tasks.filter(t => !t.completed).length;
  const completed = tasks.filter(t => t.completed).length;

  return (
    <div className="container">
      <h1>✔ My To-Do List</h1>

      <div className="input-group">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="info">
        <span>{remaining} tasks remaining</span>
        <span>{completed} completed</span>
      </div>

      <Filter filter={filter} setFilter={setFilter} />

      <TodoList
        tasks={filteredTasks}  
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      <button className="clear" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;