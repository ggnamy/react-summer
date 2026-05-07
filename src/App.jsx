import { useState } from "react";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import GradesPage from "./pages/GradesPage";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("students");

  return (
    <div className="app-container">
      <header className="header-section">
        <h1>AcadeMate</h1>
        <div className="subtitle">Student Academic Performance Tracker — Session 1 Prototype</div>
      </header>

      {/* Navigation Bar กลับมาแล้วครับ! */}
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