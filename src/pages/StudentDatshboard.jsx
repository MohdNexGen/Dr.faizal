import { useState } from "react";

const testStudents = [
  {
    id: "DFS-2026-0001",
    name: "mohd3:45",
    phone: "6138845109",
    language: "English",
    course: "Full Web Development",
    fee: "3000",
    status: "Pending",
  },
  {
    id: "DFS-2026-0002",
    name: "Ahmed Ali",
    phone: "6135135109",
    language: "Arabic",
    course: "Arabic Web Development",
    fee: "3000",
    status: "Pending",
  },
  {
    id: "DFS-2026-0003",
    name: "mohd4:07",
    phone: "908659988",
    language: "Arabic",
    course: "Arabic Web Development",
    fee: "3000",
    status: "Paid",
  },
  {
    id: "DFS-2026-0004",
    name: "Abrar6:22",
    phone: "613123456",
    language: "Somali",
    course: "Somali Web Development",
    fee: "3000",
    status: "Paid",
  },
  {
    id: "DFS-2026-0005",
    name: "muti6:33",
    phone: "09123456",
    language: "Somali",
    course: "Somali Web Development",
    fee: "3000",
    status: "Pending",
  },
];

function StudentDashboard({ setPage }) {
  const [studentId, setStudentId] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const normalize = (value) => String(value || "").trim().toLowerCase();
  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const fillStudent = (s) => {
    setStudentId(s.id);
    setStudentPhone(s.phone);
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const foundStudent = testStudents.find(
      (s) =>
        normalize(s.id) === normalize(studentId) &&
        onlyNumbers(s.phone) === onlyNumbers(studentPhone)
    );

    if (!foundStudent) {
      setStudent(null);
      showError("Student not found. Please check Student ID and phone number.");
      return;
    }

    setError("");
    setStudent(foundStudent);
  };

  const handleLogout = () => {
    setStudent(null);
    setStudentId("");
    setStudentPhone("");
    setError("");
  };

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      {!student ? (
        <div className="page-card">
          <h1>Student Portal</h1>
          <p>
            Login with your Student ID and phone number to view your profile,
            course, and payment information.
          </p>

          <div
            style={{
              maxWidth: "700px",
              margin: "30px auto",
              padding: "22px",
              borderRadius: "20px",
              background: "#1e293b",
              border: "1px solid #334155",
            }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "18px" }}>
              Test Student List
            </h3>

            {testStudents.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => fillStudent(s)}
                style={{
                  width: "100%",
                  marginBottom: "10px",
                  padding: "13px",
                  borderRadius: "14px",
                  border: "1px solid #334155",
                  background: "#0f172a",
                  color: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "15px",
                  fontWeight: "600",
                }}
              >
                {s.id} — {s.name} — {s.phone}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleLogin}
            style={{
              maxWidth: "520px",
              margin: "35px auto 0",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              textAlign: "left",
            }}
          >
            <label style={{ fontSize: "18px", fontWeight: "700" }}>
              Student ID
            </label>

            <input
              type="text"
              placeholder="Example: DFS-2026-0001"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "17px",
                outline: "none",
              }}
            />

            <label style={{ fontSize: "18px", fontWeight: "700" }}>
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Enter registered phone number"
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid #334155",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "17px",
                outline: "none",
              }}
            />

            {error && (
              <p
                style={{
                  color: "#ff6b6b",
                  textAlign: "center",
                  fontWeight: "700",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "10px",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#2563eb",
                color: "#ffffff",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </form>
        </div>
      ) : (
        <div className="page-card">
          <h1>Welcome, {student.name}</h1>
          <p>Your student profile dashboard is shown below.</p>

          <div
            style={{
              marginTop: "35px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "22px",
            }}
          >
            <div className="stat-card">
              <h2>🆔</h2>
              <h3>Student ID</h3>
              <p style={{ color: "#60a5fa", fontWeight: "800" }}>
                {student.id}
              </p>
            </div>

            <div className="stat-card">
              <h2>👤</h2>
              <h3>Student Profile</h3>
              <p>{student.name}</p>
              <small>{student.phone}</small>
            </div>

            <div className="stat-card">
              <h2>🌐</h2>
              <h3>Language</h3>
              <p>{student.language}</p>
            </div>

            <div className="stat-card">
              <h2>📚</h2>
              <h3>Course</h3>
              <p>{student.course}</p>
            </div>

            <div className="stat-card">
              <h2>💰</h2>
              <h3>Course Fee</h3>
              <p style={{ color: "#60a5fa", fontWeight: "800" }}>
                {student.fee} ETB
              </p>
            </div>

            <div className="stat-card">
              <h2>📌</h2>
              <h3>Payment Status</h3>
              <p
                style={{
                  display: "inline-block",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  background: student.status === "Paid" ? "#16a34a" : "#f97316",
                  color: "#ffffff",
                  fontWeight: "800",
                }}
              >
                {student.status}
              </p>
            </div>

            <div className="stat-card">
              <h2>🎓</h2>
              <h3>Certificate Status</h3>
              <p>Not Issued</p>
            </div>

            <div className="stat-card">
              <h2>✅</h2>
              <h3>Account Status</h3>
              <p style={{ color: "#22c55e", fontWeight: "800" }}>Active</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "35px",
              padding: "12px 30px",
              borderRadius: "12px",
              border: "none",
              background: "#ef4444",
              color: "#ffffff",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

export default StudentDashboard;