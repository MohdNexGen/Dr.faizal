import { useState } from "react";
import { supabase } from "../lib/supabase";

function Payments({ setPage }) {
  const courseFee = 3000;

  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  function createPaymentReference(studentIdValue) {
    return `DFS-PAY-${studentIdValue}-${Date.now()}`;
  }

  async function findStudent(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .single();

    if (error || !data) {
      setMessage("❌ Student not found. Check Student ID.");
      setLoading(false);
      return;
    }

    if (onlyNumbers(data.phone) !== onlyNumbers(phone)) {
      setMessage("❌ Phone number does not match this Student ID.");
      setLoading(false);
      return;
    }

    setStudent(data);
    setMessage("✅ Student found.");
    setLoading(false);
  }

  async function preparePayment() {
    if (!student) return;

    setLoading(true);
    setMessage("");

    const reference =
      student.payment_reference || createPaymentReference(student.student_id);

    const { data, error } = await supabase
      .from("students")
      .update({
        payment_reference: reference,
        payment_method: "Chapa Pending",
      })
      .eq("student_id", student.student_id)
      .select()
      .single();

    if (error) {
      console.error("Payment preparation error:", error);
      setMessage("❌ Failed to prepare payment.");
      setLoading(false);
      return;
    }

    setStudent(data);
    setMessage(
      "✅ Payment reference created. Chapa online payment will be connected when API keys are ready."
    );
    setLoading(false);
  }

  const paymentOptions = [
    {
      title: "Course Fee",
      value: `${courseFee} ETB`,
      note: "Full Web Development Program",
      icon: "💰",
    },
    {
      title: "Payment Status",
      value: "Pending / Paid",
      note: "Automatically updates after online payment is connected",
      icon: "📌",
    },
    {
      title: "Payment Reference",
      value: "Auto Generated",
      note: "Each student payment gets a unique reference",
      icon: "🔐",
    },
    {
      title: "Online Payment",
      value: "Chapa Ready",
      note: "API keys will activate real online payment",
      icon: "🏦",
    },
  ];

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="page-card">
        <h1>Payments & Fees</h1>
        <p>
          Students can check their payment status and prepare an online payment
          reference. Chapa payment will be connected when API keys are ready.
        </p>

        <div style={gridStyle}>
          {paymentOptions.map((item, index) => (
            <div className="stat-card" key={index}>
              <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>
                {item.icon}
              </h2>
              <h3>{item.title}</h3>
              <p style={bigBlueText}>{item.value}</p>
              <small style={{ color: "#cbd5e1" }}>{item.note}</small>
            </div>
          ))}
        </div>

        <div style={boxStyle}>
          <h2>Pay Now Preparation</h2>
          <p>
            Enter Student ID and phone number. The system will create a unique
            payment reference for this student.
          </p>

          <form onSubmit={findStudent} style={formStyle}>
            <input
              type="text"
              placeholder="Student ID: DFS-2026-0020"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="tel"
              placeholder="Registered phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={inputStyle}
            />

            <button type="submit" disabled={loading} style={blueButton}>
              {loading ? "Checking..." : "Find Student"}
            </button>
          </form>

          {message && <p className="success-message">{message}</p>}

          {student && (
            <div style={studentBox}>
              <h2>{student.name}</h2>
              <p>
                <strong>Student ID:</strong> {student.student_id}
              </p>
              <p>
                <strong>Course:</strong> {student.course}
              </p>
              <p>
                <strong>Fee:</strong> {student.fee} ETB
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    student.payment_status === "Paid"
                      ? "status-paid"
                      : "status-pending"
                  }
                >
                  {student.payment_status}
                </span>
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {student.payment_method || "Manual"}
              </p>
              <p>
                <strong>Payment Reference:</strong>{" "}
                {student.payment_reference || "Not created yet"}
              </p>

              {student.payment_status === "Paid" ? (
                <p style={paidText}>✓ Payment already confirmed.</p>
              ) : (
                <button
                  onClick={preparePayment}
                  disabled={loading}
                  style={greenButton}
                >
                  {loading ? "Preparing..." : "Pay Now"}
                </button>
              )}

              <p style={noteText}>
                Note: This creates the payment reference now. Real online
                checkout will open here after Chapa API keys are connected.
              </p>
            </div>
          )}
        </div>

        <button onClick={() => setPage("register")} style={registerButton}>
          Register Now
        </button>
      </div>
    </section>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "20px",
  marginTop: "35px",
};

const bigBlueText = {
  color: "#60a5fa",
  fontWeight: "800",
  fontSize: "24px",
  margin: "10px 0",
};

const boxStyle = {
  marginTop: "35px",
  padding: "25px",
  borderRadius: "18px",
  background: "#0f172a",
  border: "1px solid #334155",
};

const formStyle = {
  maxWidth: "520px",
  margin: "25px auto",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
  fontSize: "16px",
};

const studentBox = {
  maxWidth: "650px",
  margin: "25px auto 0",
  padding: "22px",
  borderRadius: "18px",
  background: "#1e293b",
  border: "1px solid #334155",
  textAlign: "left",
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
  marginTop: "15px",
  padding: "14px 28px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "800",
  cursor: "pointer",
};

const registerButton = {
  marginTop: "30px",
  padding: "14px 30px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
};

const paidText = {
  color: "#22c55e",
  fontWeight: "900",
  fontSize: "18px",
};

const noteText = {
  marginTop: "16px",
  color: "#cbd5e1",
  fontSize: "14px",
};

export default Payments;