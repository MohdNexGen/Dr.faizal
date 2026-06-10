import { useState } from "react";

import Home from "./pages/Home";
import Courses from "./pages/Course";
import Register from "./pages/Registration";
import StudentDashboard from "./pages/StudentDatshboard";
import AdminDashboard from "./pages/AdminDashboard";
import Payments from "./pages/Payments";

function App() {
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("English");

  const goHome = () => setPage("home");

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo" onClick={goHome}>
          Dr. Faizal School
        </h2>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("courses")}>Courses</button>
          <button onClick={() => setPage("register")}>Register</button>
          <button onClick={() => setPage("student")}>Student Portal</button>
          <button onClick={() => setPage("admin")}>Admin</button>
          <button onClick={() => setPage("payments")}>Payments</button>
        </div>
      </nav>

      <div className="language-switcher">
        <button
          className={language === "English" ? "active-lang" : ""}
          onClick={() => setLanguage("English")}
        >
          English
        </button>

        <button
          className={language === "Arabic" ? "active-lang" : ""}
          onClick={() => setLanguage("Arabic")}
        >
          العربية
        </button>

        <button
          className={language === "Somali" ? "active-lang" : ""}
          onClick={() => setLanguage("Somali")}
        >
          Soomaali
        </button>
      </div>

      <main>
        {page === "home" && <Home setPage={setPage} language={language} />}
        {page === "courses" && (
          <Courses setPage={setPage} language={language} />
        )}
        {page === "register" && (
          <Register setPage={setPage} language={language} />
        )}
        {page === "student" && <StudentDashboard setPage={setPage} />}
        {page === "admin" && <AdminDashboard setPage={setPage} />}
        {page === "payments" && <Payments setPage={setPage} />}
      </main>

      <footer className="footer">
        <p>Dr. Faizal School</p>
        <p>English | العربية | Soomaali</p>
        <small>© 2026 All Rights Reserved</small>
      </footer>
    </div>
  );
}

export default App;