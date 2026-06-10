function StudentDatshboard({ setPage }) {
  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <section className="card">
        <h1>Student Dashboard</h1>
        <p>
          Students will later use this page to view registration, course, and
          payment status.
        </p>
      </section>
    </main>
  );
}

export default StudentDatshboard;