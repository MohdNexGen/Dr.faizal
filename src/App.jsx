import { useState } from "react";

import Home from "./pages/Home";
import Courses from "./pages/Course";
import Register from "./pages/Registration";
import StudentDashboard from "./pages/StudentDatshboard";
import AdminDashboard from "./pages/AdminDashboard";
import Payments from "./pages/Payments";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <nav className="navbar">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("courses")}>Courses</button>
        <button onClick={() => setPage("register")}>Register</button>
        <button onClick={() => setPage("student")}>Student</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => setPage("payments")}>Payments</button>
      </nav>

      {page === "home" && <Home />}
      {page === "courses" && <Courses />}
      {page === "register" && <Register />}
      {page === "student" && <StudentDashboard />}
      {page === "admin" && <AdminDashboard />}
      {page === "payments" && <Payments />}
    </div>
  );
}

export default App;