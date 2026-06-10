import { useState } from "react";

function StudentDashboard({ setPage }) {
  const [studentId, setStudentId] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");

  const getAllStudents = () => {
    const possibleKeys = [
      "students",
      "registeredStudents",
      "studentRecords",
      "drFaizalStudents",
      "registrations",
    ];

    let allStudents = [];

    possibleKeys.forEach((key) => {
      try {
        const data = JSON.parse(localStorage.getItem(key)) || [];

        if (Array.isArray(data)) {
          allStudents = [...allStudents, ...data];
        }
      } catch {
        // ignore invalid localStorage data
      }
    });

    return allStudents;
  };

  const normalize = (value) =>
    String(value || "")
      .trim()
      .toLowerCase();

  const onlyNumbers = (value) =>
    String(value || "")
      .replace(/\D/g, "")
      .trim();

  const getStudentId = (s) =>
    s.id || s.studentId || s.studentID || s.StudentID || s["Student ID"];

  const getStudentName = (s) =>
    s.name || s.studentName || s.fullName || s.Name || s["Student Name"];

  const getStudentPhone = (s) =>
    s.phone || s.studentPhone || s.phoneNumber || s.Phone || s["Phone Number"];

  const getStudentLanguage = (s) =>
    s.language || s.Language || s.studentLanguage || "Not selected";

  const getStudentCourse = (s) =>
    s.course || s.Course || s.selectedCourse || "Full Web Development";

  const getStudentFee = (s) => s.fee || s.Fee || s.courseFee || "3000";

  const getStudentStatus = (s) =>
    s.status || s.Status || s.paymentStatus || s["Payment Status"] || "Pending";

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const students = getAllStudents();

    const foundStudent = students.find((s) => {
      const savedId = normalize(getStudentId(s));
      const savedPhone = onlyNumbers(getStudentPhone(s));

      return (
        savedId === normalize(studentId) &&
        savedPhone === onlyNumbers(studentPhone)
      );
    });

    if (!foundStudent) {
      setStudent(null);
      setError(
        "Student not found. Please check your Student ID and phone number."
      );
      return;
    }

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
            Login with your Student ID and phone number to view your registration,
            course, and payment information.
          </p>

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
              placeholder="Enter your registered phone number"
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
                  margin: "5px 0",
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
          <h1>Welcome, {getStudentName(student)}</h1>

          <p>Your student profile and course information are shown below.</p>

          <div className="dashboard-grid">
            <div className="stat-card">
              <h3>Student ID</h3>
              <p>{getStudentId(student)}</p>
            </div>

            <div className="stat-card">
              <h3>Name</h3>
              <p>{getStudentName(student)}</p>
            </div>

            <div className="stat-card">
              <h3>Phone</h3>
              <p>{getStudentPhone(student)}</p>
            </div>

            <div className="stat-card">
              <h3>Language</h3>
              <p>{getStudentLanguage(student)}</p>
            </div>

            <div className="stat-card">
              <h3>Course</h3>
              <p>{getStudentCourse(student)}</p>
            </div>

            <div className="stat-card">
              <h3>Course Fee</h3>
              <p>{getStudentFee(student)} ETB</p>
            </div>

            <div className="stat-card">
              <h3>Payment Status</h3>
              <p
                className={
                  getStudentStatus(student) === "Paid"
                    ? "status-paid"
                    : "status-pending"
                }
              >
                {getStudentStatus(student)}
              </p>
            </div>

            <div className="stat-card">
              <h3>Certificate Status</h3>
              <p>Not Issued</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              marginTop: "30px",
              padding: "12px 28px",
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