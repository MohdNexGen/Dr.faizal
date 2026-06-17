import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "../lib/supabase";

const SCHOOL_NAME = "Najash College";
const CERTIFICATE_LANGUAGES = "English | Arabic | Soomaali";

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

  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  const getName = (s) => s.name || s.full_name || s.fullName || "Unknown Student";
  const getId = (s) => s.student_id || s.studentId || s.id || "";
  const getFee = (s) => s.fee || s.fee_amount || s.feeAmount || "3000";
  const getPaymentStatus = (s) =>
    s.payment_status || s.paymentStatus || s.status || "Pending";
  const getPaymentMethod = (s) =>
    s.payment_method || s.paymentMethod || "Manual";
  const getPaymentReference = (s) =>
    s.payment_reference || s.paymentReference || "Not available";

  const isPaymentPaid = (s) =>
    String(getPaymentStatus(s)).toLowerCase().includes("paid");

  const getBestScore = () => {
    if (latestScore !== null) return latestScore;
    return 0;
  };

  const isPassed = () => latestScore !== null && latestScore >= 70;

  const getToday = () =>
    new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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

    pdf.addImage(imgData, "PNG", 8, 8, pageWidth - 16, pageHeight - 16);
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
            <p>Student dashboard with payment record, quiz and certificate system.</p>

            <div style={gridStyle}>
              <div className="stat-card">
                <h2>🆔</h2>
                <h3>Student ID</h3>
                <p style={blueText}>{getId(student)}</p>
              </div>

              <div className="stat-card">
                <h2>👤</h2>
                <h3>Name</h3>
                <p>{getName(student)}</p>
              </div>

              <div className="stat-card">
                <h2>📚</h2>
                <h3>Course</h3>
                <p>{student.course}</p>
              </div>

              <div className="stat-card">
                <h2>💰</h2>
                <h3>Fee</h3>
                <p>{getFee(student)} ETB</p>
              </div>

              <div className="stat-card">
                <h2>✅</h2>
                <h3>Payment Status</h3>
                <p
                  style={{
                    ...badgeStyle,
                    background: isPaymentPaid(student) ? "#16a34a" : "#f97316",
                  }}
                >
                  {getPaymentStatus(student)}
                </p>
              </div>

              <div className="stat-card">
                <h2>💳</h2>
                <h3>Payment Method</h3>
                <p>{getPaymentMethod(student)}</p>
              </div>

              <div className="stat-card">
                <h2>🔖</h2>
                <h3>Payment Reference</h3>
                <p style={smallText}>{getPaymentReference(student)}</p>
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
                  eligible for your {SCHOOL_NAME} certificate.
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
              <div style={certificateBorder}>
                <div style={crestStyle}>N</div>
                <p style={estStyle}>EST. 2026</p>

                <h1 style={certificateTitleStyle}>CERTIFICATE</h1>
                <h2 style={certificateSubTitleStyle}>OF COMPLETION</h2>

                <p style={certificateTextStyle}>
                  This certificate is proudly presented to
                </p>

                <h2 style={certificateNameStyle}>{getName(student)}</h2>

                <p style={certificateTextStyle}>For successfully completing</p>
                <h3 style={certificateCourseStyle}>{student.course}</h3>

                <div style={certificateInfoRow}>
                  <div style={certificateInfoItem}>
                    <strong>Student ID:</strong>
                    <br />
                    {getId(student)}
                  </div>

                  <div style={certificateInfoItem}>
                    <strong>Quiz Score:</strong>
                    <br />
                    {getBestScore()}%
                  </div>

                  <div style={certificateInfoItem}>
                    <strong>Date:</strong>
                    <br />
                    {getToday()}
                  </div>
                </div>

                <div style={certificateBottom}>
                  <div style={sealStyle}>
                    <div style={sealInnerStyle}>
                      NAJASH
                      <br />
                      COLLEGE
                      <br />
                      ★ ★ ★
                    </div>
                  </div>

                  <div>
                    <p style={certificateSchoolStyle}>{SCHOOL_NAME}</p>
                    <small style={certificateSmallStyle}>
                      {CERTIFICATE_LANGUAGES}
                    </small>
                  </div>

                  <div style={signatureBox}>
                    <p style={signatureText}>Najash College</p>
                    <div style={signatureLine}></div>
                    <small style={certificateSmallStyle}>
                      Authorized Signature
                    </small>
                  </div>
                </div>

                <button
                  id="certificate-download-btn"
                  onClick={downloadCertificate}
                  style={blueButton}
                  className="no-print"
                >
                  Download Certificate
                </button>
              </div>
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
  padding: "18px",
  maxWidth: "1050px",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg, #1e1b4b 0%, #2563eb 18%, #fdf2f8 45%, #dbeafe 70%, #fef3c7 100%)",
  color: "#0f172a",
  border: "4px solid #d4af37",
  boxShadow: "0 0 45px rgba(212,175,55,0.45)",
  textAlign: "center",
};

const certificateBorder = {
  padding: "34px",
  border: "3px double #d4af37",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(219,234,254,0.92), rgba(250,245,255,0.95))",
};

const crestStyle = {
  width: "70px",
  height: "70px",
  margin: "0 auto",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
  color: "#d4af37",
  border: "4px solid #d4af37",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "38px",
  fontWeight: "900",
  fontFamily: "Georgia, serif",
};

const estStyle = {
  color: "#0f172a",
  fontWeight: "800",
  letterSpacing: "2px",
  margin: "8px 0 0",
};

const certificateTitleStyle = {
  color: "#0f172a",
  fontSize: "54px",
  fontWeight: "900",
  letterSpacing: "6px",
  margin: "12px 0 14px",
  fontFamily: "Georgia, serif",
};

const certificateSubTitleStyle = {
  color: "#b45309",
  fontSize: "26px",
  fontWeight: "900",
  letterSpacing: "5px",
  margin: "0 0 28px",
};

const certificateNameStyle = {
  color: "#0f172a",
  fontSize: "48px",
  fontWeight: "900",
  margin: "8px 0",
  fontFamily: "Georgia, serif",
  fontStyle: "italic",
};

const certificateCourseStyle = {
  color: "#0f172a",
  fontSize: "26px",
  fontWeight: "900",
  margin: "8px 0 18px",
};

const certificateTextStyle = {
  color: "#0f172a",
  fontSize: "18px",
  fontWeight: "700",
  margin: "8px 0",
};

const certificateInfoRow = {
  margin: "24px auto",
  display: "flex",
  justifyContent: "center",
  gap: "28px",
  flexWrap: "wrap",
};

const certificateInfoItem = {
  minWidth: "155px",
  padding: "10px 16px",
  borderLeft: "3px solid #d4af37",
  borderRight: "3px solid #d4af37",
  color: "#0f172a",
  fontWeight: "800",
};

const certificateBottom = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "18px",
  flexWrap: "wrap",
  marginTop: "18px",
};

const sealStyle = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #f59e0b, #fef3c7, #b45309)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "3px solid #92400e",
};

const sealInnerStyle = {
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  border: "2px dashed #0f172a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#0f172a",
  fontSize: "12px",
  fontWeight: "900",
  textTransform: "uppercase",
};

const certificateSchoolStyle = {
  color: "#0f172a",
  fontSize: "32px",
  fontWeight: "900",
  margin: "0 0 8px",
  fontFamily: "Georgia, serif",
};

const certificateSmallStyle = {
  color: "#0f172a",
  fontSize: "16px",
  fontWeight: "800",
};

const signatureBox = {
  minWidth: "190px",
  textAlign: "center",
};

const signatureText = {
  color: "#0f172a",
  fontSize: "24px",
  fontFamily: "cursive",
  margin: "0",
};

const signatureLine = {
  height: "2px",
  background: "#d4af37",
  margin: "4px auto 6px",
  width: "180px",
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

const smallText = {
  color: "#cbd5e1",
  fontSize: "14px",
  wordBreak: "break-word",
  fontWeight: "700",
};

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