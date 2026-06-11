import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function AdminDashboard({ setPage }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadStudents() {
    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Load students error:", error);
      setMessage("❌ Failed to load students from Supabase.");
      setStudents([]);
    } else {
      setStudents(data || []);
      setMessage("");
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function updatePaymentStatus(studentId, newStatus) {
    const { error } = await supabase
      .from("students")
      .update({ payment_status: newStatus })
      .eq("student_id", studentId);

    if (error) {
      console.error("Payment update error:", error);
      setMessage("❌ Failed to update payment status.");
      return;
    }

    setMessage(`✅ Payment confirmed for ${studentId}.`);
    await loadStudents();

    setTimeout(() => setMessage(""), 3000);
  }

  const filteredStudents = students.filter((student) => {
    const text = `${student.student_id} ${student.name} ${student.email} ${student.phone} ${student.course} ${student.payment_status}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="page-card">
        <h1>Admin Dashboard</h1>
        <p>Manage students, courses, fees, and payment status from Supabase.</p>

        {message && <p className="success-message">{message}</p>}

        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div className="stat-card">
            <h3>Paid</h3>
            <p>{students.filter((s) => s.payment_status === "Paid").length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending</h3>
            <p>
              {students.filter((s) => s.payment_status !== "Paid").length}
            </p>
          </div>

          <div className="stat-card">
            <h3>Total Fees</h3>
            <p>
              {students.reduce((sum, s) => sum + Number(s.fee || 0), 0)} ETB
            </p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by ID, name, email, phone, course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            margin: "25px 0",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#fff",
            fontSize: "16px",
          }}
        />

        {loading ? (
          <h2>Loading students...</h2>
        ) : filteredStudents.length === 0 ? (
          <h2>No students found.</h2>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
              }}
            >
              <thead>
                <tr>
                  <th style={th}>Student ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Email</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Language</th>
                  <th style={th}>Course</th>
                  <th style={th}>Fee</th>
                  <th style={th}>Payment</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td style={td}>{student.student_id}</td>
                    <td style={td}>{student.name}</td>
                    <td style={td}>{student.email}</td>
                    <td style={td}>{student.phone}</td>
                    <td style={td}>{student.language}</td>
                    <td style={td}>{student.course}</td>
                    <td style={td}>{student.fee} ETB</td>

                    <td style={td}>
                      <span
                        className={
                          student.payment_status === "Paid"
                            ? "status-paid"
                            : "status-pending"
                        }
                      >
                        {student.payment_status === "Paid" ? "Paid" : "Pending"}
                      </span>
                    </td>

                    <td style={td}>
                      {student.payment_status === "Paid" ? (
                        <span style={confirmedText}>✓ Payment Confirmed</span>
                      ) : (
                        <button
                          style={greenBtn}
                          onClick={() =>
                            updatePaymentStatus(student.student_id, "Paid")
                          }
                        >
                          Confirm Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button onClick={loadStudents} style={blueBtn}>
          Refresh Students
        </button>
      </div>
    </section>
  );
}

const th = {
  padding: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff",
  textAlign: "left",
};

const td = {
  padding: "12px",
  border: "1px solid #334155",
  color: "#fff",
  textAlign: "left",
};

const blueBtn = {
  marginTop: "25px",
  padding: "12px 25px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const greenBtn = {
  padding: "9px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const confirmedText = {
  color: "#22c55e",
  fontWeight: "800",
};

export default AdminDashboard;