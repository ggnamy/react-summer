import { useState, useEffect } from "react"; // 1. เพิ่ม useEffect
import { useDispatch } from "react-redux";   // 2. เพิ่ม useDispatch
import { fetchStudents } from "./features/students/studentsThunks"; // 3. Import Thunk มาใช้
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import GradesPage from "./pages/GradesPage";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("students");
  const dispatch = useDispatch();

  // 4. ใช้ useEffect เพื่อสั่ง Load ข้อมูลนักศึกษาจาก API เมื่อ Component Mount (โหลดครั้งแรก)
  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  return (
    <div className="app-container">
      <header className="header-section">
        <h1>AcadeMate</h1>
        <div className="subtitle">Student Academic Performance Tracker — Session 4: Async Data</div>
      </header>

      {/* Navigation Bar */}
      <nav className="glass-nav">
        <button 
          className={`nav-item ${currentView === 'students' ? 'active' : ''}`} 
          onClick={() => setCurrentView('students')}
        >
          👤 Students
        </button>
        <button 
          className={`nav-item ${currentView === 'courses' ? 'active' : ''}`} 
          onClick={() => setCurrentView('courses')}
        >
          📚 Courses
        </button>
        <button 
          className={`nav-item ${currentView === 'grades' ? 'active' : ''}`} 
          onClick={() => setCurrentView('grades')}
        >
          🎯 Grade Records
        </button>
      </nav>

      <main className="content-area">
        {currentView === 'students' && <StudentsPage />}
        {currentView === 'courses' && <CoursesPage />}
        {currentView === 'grades' && <GradesPage />}
      </main>
    </div>
  );
}

export default App;