import { useEffect, useState } from "react";

const courseFees = {
  "Full Web Development": 3000,
  "Arabic Web Development": 3000,
  "Somali Web Development": 3000,
};

function AdminDashboard({ setPage }) {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);
  }, []);

  function saveStudents(updatedStudents) {
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
  }

  function openEdit(student) {
    setEditingStudent({ ...student });
  }

  function closeEdit() {
    setEditingStudent(null);
  }

  function updateEditField(field, value) {
    if (field === "course") {
      setEditingStudent({
        ...editingStudent,
        course: value,
        feeAmount: courseFees[value] || 0,
      });
      return;
    }

    setEditingStudent({
      ...editingStudent,
      [field]: value,
    });
  }

  function saveEdit() {
    const updatedStudents = students.map((student) => {
      if (student.studentId === editingStudent.studentId) {
        return editingStudent;
      }

      return student;
    });

    saveStudents(updatedStudents);
    closeEdit();
  }

  function deleteStudent(studentId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const updatedStudents = students.filter(
      (student) => student.studentId !== studentId
    );

    saveStudents(updatedStudents);
  }

  function clearStudents() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all registered students?"
    );

    if (!confirmDelete) return;

    saveStudents([]);
  }

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    return (
      student.studentId.toLowerCase().includes(keyword) ||
      student.fullName.toLowerCase().includes(keyword) ||
      student.phone.toLowerCase().includes(keyword)
    );
  });

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

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Search, edit, delete, and review student records.</p>
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
        <div className="table-header">
          <h2>Registered Students</h2>

          <input
            className="search-input"
            type="text"
            placeholder="Search by ID, name, or phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredStudents.length === 0 ? (
          <p className="empty-text">No students found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Language</th>
                <th>Course</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.fullName}</td>
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
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteStudent(student.studentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editingStudent && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Edit Student</h2>

            <label>Student ID</label>
            <input value={editingStudent.studentId} readOnly />

            <label>Full Name</label>
            <input
              value={editingStudent.fullName}
              onChange={(e) => updateEditField("fullName", e.target.value)}
            />

            <label>Email</label>
            <input
              value={editingStudent.email}
              onChange={(e) => updateEditField("email", e.target.value)}
            />

            <label>Phone</label>
            <input
              value={editingStudent.phone}
              onChange={(e) => updateEditField("phone", e.target.value)}
            />

            <label>Language</label>
            <select
              value={editingStudent.language}
              onChange={(e) => updateEditField("language", e.target.value)}
            >
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
              <option value="Somali">Somali</option>
            </select>

            <label>Course</label>
            <select
              value={editingStudent.course}
              onChange={(e) => updateEditField("course", e.target.value)}
            >
              <option value="Full Web Development">Full Web Development</option>
              <option value="Arabic Web Development">
                Arabic Web Development
              </option>
              <option value="Somali Web Development">
                Somali Web Development
              </option>
            </select>

            <label>Fee Amount</label>
            <input value={`${editingStudent.feeAmount} ETB`} readOnly />

            <label>Payment Status</label>
            <select
              value={editingStudent.paymentStatus}
              onChange={(e) =>
                updateEditField("paymentStatus", e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

            <div className="modal-actions">
              <button className="save-btn" onClick={saveEdit}>
                Save Changes
              </button>

              <button className="cancel-btn" onClick={closeEdit}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;