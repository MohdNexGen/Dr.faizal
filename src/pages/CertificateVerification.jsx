import { useState } from "react";
import { supabase } from "../lib/supabase";

function CertificateVerification({ setPage }) {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function verifyCertificate(e) {
    e.preventDefault();
    setLoading(true);
    setStudent(null);
    setMessage("");

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .single();

    if (error || !data) {
      setMessage("❌ Certificate not found. Please check the Student ID.");
      setLoading(false);
      return;
    }

    setStudent(data);
    setMessage("✅ Certificate verified successfully.");
    setLoading(false);
  }

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="page-card">
        <h1>Certificate Verification</h1>
        <p>Enter Student ID to verify if the certificate is genuine.</p>

        <form onSubmit={verifyCertificate} style={formStyle}>
          <input
            type="text"
            placeholder="Example: DFS-2026-0020"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" style={blueButton} disabled={loading}>
            {loading ? "Checking..." : "Verify Certificate"}
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}

        {student && (
          <div className="dashboard-grid" style={{ marginTop: "30px" }}>
            <div className="stat-card">
              <h3>Status</h3>
              <p style={{ color: "#22c55e", fontWeight: "900" }}>
                Genuine Certificate
              </p>
            </div>

            <div className="stat-card">
              <h3>Student ID</h3>
              <p>{student.student_id}</p>
            </div>

            <div className="stat-card">
              <h3>Name</h3>
              <p>{student.name}</p>
            </div>

            <div className="stat-card">
              <h3>Course</h3>
              <p>{student.course}</p>
            </div>

            <div className="stat-card">
              <h3>Language</h3>
              <p>{student.language}</p>
            </div>

            <div className="stat-card">
              <h3>Payment</h3>
              <p
                className={
                  student.payment_status === "Paid"
                    ? "status-paid"
                    : "status-pending"
                }
              >
                {student.payment_status}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

const formStyle = {
  maxWidth: "520px",
  margin: "35px auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  fontSize: "17px",
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

export default CertificateVerification;