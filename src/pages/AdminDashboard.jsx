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

    setMessage(`✅ Payment changed to ${newStatus} for ${studentId}.`);
    await loadStudents();

    setTimeout(() => setMessage(""), 3000);
  }

  const paidStudents = students.filter((s) => s.payment_status === "Paid");
  const pendingStudents = students.filter((s) => s.payment_status !== "Paid");

  const totalPaidFees = paidStudents.reduce(
    (sum, s) => sum + Number(s.fee || 0),
    0
  );

  const totalExpectedFees = students.reduce(
    (sum, s) => sum + Number(s.fee || 0),
    0
  );

  const filteredStudents = students.filter((student) => {
    const text = `${student.student_id || ""} ${student.name || ""} ${
      student.email || ""
    } ${student.phone || ""} ${student.language || ""} ${
      student.course || ""
    } ${student.payment_status || ""}`.toLowerCase();

    return text.includes(search.toLowerCase());
  });

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="page-card">
        <h1>Admin Dashboard</h1>
        <p>Manage students, phone numbers, courses, fees, and payment status.</p>

        {message && <p className="success-message">{message}</p>}

        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{students.length}</p>
          </div>

          <div className="stat-card">
            <h3>Paid Students</h3>
            <p style={paidText}>{paidStudents.length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Students</h3>
            <p style={pendingText}>{pendingStudents.length}</p>
          </div>

          <div className="stat-card">
            <h3>Paid Fees</h3>
            <p>{totalPaidFees} ETB</p>
          </div>

          <div className="stat-card">
            <h3>Expected Fees</h3>
            <p>{totalExpectedFees} ETB</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by ID, name, email, phone, language, course, payment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        {loading ? (
          <h2>Loading students...</h2>
        ) : filteredStudents.length === 0 ? (
          <h2>No students found.</h2>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={th}>Student ID</th>
                  <th style={th}>Name</th>
                  <th style={th}>Phone</th>
                  <th style={th}>Email</th>
                  <th style={th}>Language</th>
                  <th style={th}>Course</th>
                  <th style={th}>Fee</th>
                  <th style={th}>Payment</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => {
                  const isPaid = student.payment_status === "Paid";

                  return (
                    <tr key={student.id || student.student_id}>
                      <td style={td}>{student.student_id || "N/A"}</td>
                      <td style={td}>{student.name || "N/A"}</td>
                      <td style={phoneTd}>
                        <a href={`tel:${student.phone}`} style={phoneLink}>
                          {student.phone || "N/A"}
                        </a>
                      </td>
                      <td style={td}>{student.email || "N/A"}</td>
                      <td style={td}>{student.language || "N/A"}</td>
                      <td style={td}>{student.course || "N/A"}</td>
                      <td style={td}>{student.fee || 0} ETB</td>

                      <td style={td}>
                        <span style={isPaid ? paidBadge : pendingBadge}>
                          {isPaid ? "Paid" : "Pending"}
                        </span>
                      </td>

                      <td style={td}>
                        {isPaid ? (
                          <button
                            style={orangeBtn}
                            onClick={() =>
                              updatePaymentStatus(
                                student.student_id,
                                "Pending"
                              )
                            }
                          >
                            Mark Pending
                          </button>
                        ) : (
                          <button
                            style={greenBtn}
                            onClick={() =>
                              updatePaymentStatus(student.student_id, "Paid")
                            }
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
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

const searchInput = {
  width: "100%",
  margin: "25px 0",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "#fff",
  fontSize: "16px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const th = {
  padding: "12px",
  border: "1px solid #334155",
  background: "#1e293b",
  color: "#fff",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const td = {
  padding: "12px",
  border: "1px solid #334155",
  color: "#fff",
  textAlign: "left",
  whiteSpace: "nowrap",
};

const phoneTd = {
  ...td,
  fontWeight: "800",
};

const phoneLink = {
  color: "#60a5fa",
  textDecoration: "none",
};

const paidBadge = {
  display: "inline-block",
  padding: "7px 15px",
  borderRadius: "20px",
  background: "#16a34a",
  color: "#fff",
  fontWeight: "800",
};

const pendingBadge = {
  display: "inline-block",
  padding: "7px 15px",
  borderRadius: "20px",
  background: "#f97316",
  color: "#fff",
  fontWeight: "800",
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

const orangeBtn = {
  padding: "9px 14px",
  borderRadius: "10px",
  border: "none",
  background: "#f97316",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const paidText = {
  color: "#22c55e",
  fontWeight: "900",
};

const pendingText = {
  color: "#fb923c",
  fontWeight: "900",
};

export default AdminDashboard;