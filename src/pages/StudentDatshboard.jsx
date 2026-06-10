import { useState } from "react";

const quizQuestions = [
  {
    question: "What does HTML stand for?",
    correct: "HyperText Markup Language",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyper Transfer Main Language",
    ],
  },
  {
    question: "Which language is used for styling web pages?",
    correct: "CSS",
    options: ["HTML", "CSS", "JavaScript"],
  },
  {
    question: "Which language adds interactivity to websites?",
    correct: "JavaScript",
    options: ["CSS", "HTML", "JavaScript"],
  },
];

function StudentDashboard({ setPage }) {
  const [studentId, setStudentId] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [latestScore, setLatestScore] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const normalize = (value) => String(value || "").trim().toLowerCase();
  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
  }

  const students = getStudents();

  const getName = (s) => s.fullName || s.name || "Unknown Student";
  const getId = (s) => s.studentId || s.id || "";
  const getPhone = (s) => s.phone || "";
  const getFee = (s) => s.feeAmount || s.fee || "3000";
  const getPaymentStatus = (s) => s.paymentStatus || s.status || "Pending";

  const getProgress = () => 0;

  const getBestScore = () => {
    if (latestScore !== null) return latestScore;
    return 0;
  };

  const isPassed = () => latestScore !== null && latestScore >= 70;

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const fillStudent = (s) => {
    setStudentId(getId(s));
    setStudentPhone(getPhone(s));
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const foundStudent = students.find(
      (s) =>
        normalize(getId(s)) === normalize(studentId) &&
        onlyNumbers(getPhone(s)) === onlyNumbers(studentPhone)
    );

    if (!foundStudent) {
      setStudent(null);
      showError("Student not found. Please check Student ID and phone number.");
      return;
    }

    setStudent(foundStudent);
    setAnswers({});
    setLatestScore(null);
    setShowCertificate(false);
    setError("");
  };

  const handleAnswer = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const submitQuiz = () => {
    let correct = 0;

    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.correct) correct++;
    });

    const score = Math.round((correct / quizQuestions.length) * 100);
    setLatestScore(score);
    setShowCertificate(false);
  };

  const handleLogout = () => {
    setStudent(null);
    setStudentId("");
    setStudentPhone("");
    setAnswers({});
    setLatestScore(null);
    setShowCertificate(false);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <section className="page-section">
      <button className="back-btn no-print" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      {!student ? (
        <div className="page-card">
          <h1>Student Portal</h1>
          <p>Login using the Student ID and phone number used during registration.</p>

          <div style={testBox}>
            <h3 style={{ textAlign: "center" }}>Registered Student List</h3>

            {students.length === 0 ? (
              <p style={{ textAlign: "center", color: "#cbd5e1" }}>
                No students found yet. Register a student first.
              </p>
            ) : (
              students.map((s, index) => (
                <button
                  key={`${getId(s)}-${index}`}
                  onClick={() => fillStudent(s)}
                  style={testBtn}
                >
                  <strong>{getId(s)}</strong> — {getName(s)} — {getPhone(s)}
                  <br />
                  <small>
                    {s.language || "English"} | {s.course || "No course"} |{" "}
                    {getFee(s)} ETB | {getPaymentStatus(s)}
                  </small>
                </button>
              ))
            )}
          </div>

          <form onSubmit={handleLogin} style={formStyle}>
            <label>Student ID</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Example: DFS-2026-0001"
              style={inputStyle}
              required
            />

            <label>Phone Number</label>
            <input
              value={studentPhone}
              onChange={(e) => setStudentPhone(e.target.value)}
              placeholder="Enter phone number"
              style={inputStyle}
              required
            />

            {error && <p style={errorStyle}>{error}</p>}

            <button style={blueButton}>Login</button>
          </form>
        </div>
      ) : (
        <div className="page-card">
          <div className="no-print">
            <h1>Welcome, {getName(student)}</h1>
            <p>Student dashboard with quiz and certificate system.</p>

            <div style={gridStyle}>
              <div className="stat-card">
                <h2>🆔</h2>
                <h3>Student ID</h3>
                <p style={blueText}>{getId(student)}</p>
              </div>

              <div className="stat-card">
                <h2>📚</h2>
                <h3>Course</h3>
                <p>{student.course}</p>
              </div>

              <div className="stat-card">
                <h2>💰</h2>
                <h3>Course Fee</h3>
                <p>{getFee(student)} ETB</p>
              </div>

              <div className="stat-card">
                <h2>💳</h2>
                <h3>Payment</h3>
                <p>{getPaymentStatus(student)}</p>
              </div>

              <div className="stat-card">
                <h2>📝</h2>
                <h3>Quiz Score</h3>
                <p style={blueText}>{getBestScore()}%</p>
              </div>

              <div className="stat-card">
                <h2>🎓</h2>
                <h3>Certificate Status</h3>
                <p
                  style={{
                    ...badgeStyle,
                    background: isPassed() ? "#16a34a" : "#f97316",
                  }}
                >
                  {isPassed() ? "Certificate Ready" : "Quiz Required"}
                </p>
              </div>
            </div>

            <div style={quizBox}>
              <h2 style={{ textAlign: "center" }}>Quick Quiz</h2>

              {quizQuestions.map((q, index) => (
                <div key={index} style={{ marginBottom: "22px" }}>
                  <h3>
                    {index + 1}. {q.question}
                  </h3>

                  {q.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(index, option)}
                      style={{
                        ...answerBtn,
                        background:
                          answers[index] === option ? "#2563eb" : "#0f172a",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ))}

              <button onClick={submitQuiz} style={blueButton}>
                Submit Quiz
              </button>

              {latestScore !== null && (
                <h2 style={{ textAlign: "center" }}>
                  Latest Score: {latestScore}% —{" "}
                  {latestScore >= 70 ? "Passed ✅" : "Failed ❌"}
                </h2>
              )}
            </div>

            {isPassed() && (
              <div style={certificateBox}>
                <h2>🎓 Certificate Ready</h2>
                <p>
                  Congratulations <strong>{getName(student)}</strong>. You are
                  eligible for your Dr. Faizal School certificate.
                </p>

                <button
                  onClick={() => setShowCertificate(true)}
                  style={greenButton}
                >
                  View Certificate
                </button>
              </div>
            )}
          </div>

          {showCertificate && (
            <div style={certificatePreview} className="certificate-print">
              <h1>Certificate of Completion</h1>
              <p>This certificate is proudly presented to</p>
              <h2>{getName(student)}</h2>
              <p>For successfully completing</p>
              <h3>{student.course}</h3>
              <p>Student ID: {getId(student)}</p>
              <p>Quiz Score: {getBestScore()}%</p>
              <p>Dr. Faizal School</p>
              <small>English | العربية | Soomaali</small>

              <br />
              <br />

              <button
                onClick={printCertificate}
                style={blueButton}
                className="no-print"
              >
                Download / Print Certificate
              </button>
            </div>
          )}

          <button onClick={handleLogout} style={redButton} className="no-print">
            Logout
          </button>
        </div>
      )}
    </section>
  );
}

const testBox = {
  maxWidth: "900px",
  margin: "30px auto",
  padding: "22px",
  borderRadius: "20px",
  background: "#1e293b",
  border: "1px solid #334155",
};

const testBtn = {
  width: "100%",
  marginBottom: "12px",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  cursor: "pointer",
  textAlign: "left",
  fontSize: "16px",
};

const formStyle = {
  maxWidth: "520px",
  margin: "35px auto 0",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  textAlign: "left",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  fontSize: "17px",
};

const gridStyle = {
  marginTop: "35px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "22px",
};

const quizBox = {
  marginTop: "40px",
  padding: "25px",
  borderRadius: "20px",
  background: "#1e293b",
  border: "1px solid #334155",
  textAlign: "left",
};

const answerBtn = {
  display: "block",
  width: "100%",
  marginTop: "10px",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #334155",
  color: "#fff",
  cursor: "pointer",
  textAlign: "left",
};

const certificateBox = {
  marginTop: "35px",
  padding: "25px",
  borderRadius: "20px",
  background: "#064e3b",
  border: "1px solid #22c55e",
};

const certificatePreview = {
  margin: "35px auto",
  padding: "45px",
  maxWidth: "780px",
  borderRadius: "20px",
  background: "#f8fafc",
  color: "#0f172a",
  border: "6px double #2563eb",
  textAlign: "center",
};

const blueButton = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const greenButton = {
  padding: "14px 28px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const redButton = {
  marginTop: "35px",
  padding: "12px 30px",
  borderRadius: "12px",
  border: "none",
  background: "#ef4444",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const blueText = { color: "#60a5fa", fontWeight: "800" };

const badgeStyle = {
  display: "inline-block",
  padding: "8px 18px",
  borderRadius: "20px",
  color: "#fff",
  fontWeight: "800",
};

const errorStyle = {
  color: "#ff6b6b",
  textAlign: "center",
  fontWeight: "700",
};

export default StudentDashboard;