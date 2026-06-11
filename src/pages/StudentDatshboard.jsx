import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "../lib/supabase";

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
  const [loading, setLoading] = useState(false);

  const normalize = (value) => String(value || "").trim().toLowerCase();
  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  const getName = (s) => s.name || s.fullName || "Unknown Student";
  const getId = (s) => s.student_id || s.studentId || s.id || "";
  const getPhone = (s) => s.phone || "";
  const getFee = (s) => s.fee || s.feeAmount || "3000";
  const getPaymentStatus = (s) =>
    s.payment_status || s.paymentStatus || s.status || "Pending";

  const getBestScore = () => {
    if (latestScore !== null) return latestScore;
    return 0;
  };

  const isPassed = () => latestScore !== null && latestScore >= 70;

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 4000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("student_id", studentId.trim())
        .single();

      if (error || !data) {
        setStudent(null);
        showError("Student not found. Please check Student ID.");
        return;
      }

      if (onlyNumbers(data.phone) !== onlyNumbers(studentPhone)) {
        setStudent(null);
        showError("Phone number does not match this Student ID.");
        return;
      }

      setStudent(data);
      setAnswers({});
      setLatestScore(null);
      setShowCertificate(false);
      setError("");
    } catch (err) {
      console.error("Student login error:", err);
      setStudent(null);
      showError("Login failed. Check Supabase connection.");
    } finally {
      setLoading(false);
    }
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

  const downloadCertificate = async () => {
    const certificate = document.getElementById("certificate-card");

    if (!certificate) {
      alert("Certificate not found");
      return;
    }

    const downloadButton = document.getElementById("certificate-download-btn");
    if (downloadButton) downloadButton.style.display = "none";

    const canvas = await html2canvas(certificate, {
      scale: 3,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    if (downloadButton) downloadButton.style.display = "inline-block";

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 10, 10, pageWidth - 20, pageHeight - 20);
    pdf.save(`${getName(student).replace(/\s+/g, "-")}-Certificate.pdf`);
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

            <button style={blueButton} disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </button>
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
            <div
              id="certificate-card"
              style={certificatePreview}
              className="certificate-print"
            >
              <h1 style={certificateTitleStyle}>Certificate of Completion</h1>
              <p style={certificateTextStyle}>
                This certificate is proudly presented to
              </p>
              <h2 style={certificateNameStyle}>{getName(student)}</h2>
              <p style={certificateTextStyle}>For successfully completing</p>
              <h3 style={certificateCourseStyle}>{student.course}</h3>
              <p style={certificateTextStyle}>Student ID: {getId(student)}</p>
              <p style={certificateTextStyle}>Quiz Score: {getBestScore()}%</p>
              <p style={certificateSchoolStyle}>Dr. Faizal School</p>
              <small style={certificateSmallStyle}>
                English | العربية | Soomaali
              </small>

              <br />
              <br />

              <button
                id="certificate-download-btn"
                onClick={downloadCertificate}
                style={blueButton}
                className="no-print"
              >
                Download Certificate
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
  padding: "55px",
  maxWidth: "850px",
  borderRadius: "20px",
  background: "#ffffff",
  color: "#111827",
  border: "6px double #2563eb",
  textAlign: "center",
};

const certificateTitleStyle = {
  color: "#111827",
  fontSize: "42px",
  fontWeight: "900",
  marginBottom: "22px",
};

const certificateNameStyle = {
  color: "#111827",
  fontSize: "38px",
  fontWeight: "900",
  margin: "14px 0",
};

const certificateCourseStyle = {
  color: "#111827",
  fontSize: "24px",
  fontWeight: "900",
};

const certificateTextStyle = {
  color: "#111827",
  fontSize: "18px",
  fontWeight: "600",
};

const certificateSchoolStyle = {
  color: "#111827",
  fontSize: "20px",
  fontWeight: "800",
};

const certificateSmallStyle = {
  color: "#111827",
  fontSize: "16px",
  fontWeight: "700",
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