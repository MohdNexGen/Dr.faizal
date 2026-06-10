import { useEffect, useState } from "react";

function AdminDashboard({ setPage }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);
  }, []);

  const totalStudents = students.length;

  const paidStudents = students.filter(
    (student) => student.paymentStatus === "Paid"
  ).length;

  const pendingStudents = students.filter(
    (student) => student.paymentStatus === "Pending"
  ).length;

  const expectedRevenue = students.reduce(
    (sum, student) => sum + Number(student.feeAmount || 0),
    0
  );

  const paidRevenue = students
    .filter((student) => student.paymentStatus === "Paid")
    .reduce((sum, student) => sum + Number(student.feeAmount || 0), 0);

  const englishStudents = students.filter(
    (student) => student.language === "English"
  ).length;

  const arabicStudents = students.filter(
    (student) => student.language === "Arabic"
  ).length;

  const somaliStudents = students.filter(
    (student) => student.language === "Somali"
  ).length;

  function clearStudents() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all registered students?"
    );

    if (!confirmDelete) return;

    localStorage.removeItem("students");
    setStudents([]);
  }

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Student records, fees, payment status, and revenue summary.</p>
        </div>

        <button className="danger-btn" onClick={clearStudents}>
          Clear All Students
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>{totalStudents}</h3>
          <p>Total Students</p>
        </div>

        <div className="stat-box">
          <h3>{paidStudents}</h3>
          <p>Paid Students</p>
        </div>

        <div className="stat-box">
          <h3>{pendingStudents}</h3>
          <p>Pending Payments</p>
        </div>

        <div className="stat-box">
          <h3>{paidRevenue} ETB</h3>
          <p>Paid Revenue</p>
        </div>

        <div className="stat-box">
          <h3>{expectedRevenue} ETB</h3>
          <p>Expected Revenue</p>
        </div>
      </div>

      <div className="course-stats">
        <div className="mini-stat">English Students: {englishStudents}</div>
        <div className="mini-stat">Arabic Students: {arabicStudents}</div>
        <div className="mini-stat">Somali Students: {somaliStudents}</div>
      </div>

      <div className="table-box">
        <h2>Registered Students</h2>

        {students.length === 0 ? (
          <p className="empty-text">No students registered yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Language</th>
                <th>Course</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.fullName}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.language}</td>
                  <td>{student.course}</td>
                  <td>{student.feeAmount} ETB</td>
                  <td>
                    <span
                      className={
                        student.paymentStatus === "Paid"
                          ? "status-paid"
                          : "status-pending"
                      }
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td>{student.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default AdminDashboard;