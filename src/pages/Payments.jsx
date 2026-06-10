function Payments({ setPage }) {
  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <section className="card">
        <h1>Payments & Fees</h1>
        <p>Course Fee: 3000 ETB</p>
        <p>Payment Status: Pending or Paid</p>
        <p>Payment integration will be added later.</p>
      </section>
    </main>
  );
}

export default Payments;