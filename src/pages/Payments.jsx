function Payments({ setPage }) {
  const courseFee = 3000;

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
      note: "Admin can update student payment status",
      icon: "📌",
    },
    {
      title: "Accepted Method",
      value: "Manual Payment",
      note: "Bank, cash, or mobile payment can be confirmed by admin",
      icon: "🏦",
    },
    {
      title: "Receipt",
      value: "Coming Soon",
      note: "Receipt upload and payment gateway will be added later",
      icon: "🧾",
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
          Students can review course fee information. Online payment integration
          will be added later.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "20px",
            marginTop: "35px",
          }}
        >
          {paymentOptions.map((item, index) => (
            <div className="stat-card" key={index}>
              <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>
                {item.icon}
              </h2>
              <h3>{item.title}</h3>
              <p
                style={{
                  color: "#60a5fa",
                  fontWeight: "800",
                  fontSize: "24px",
                  margin: "10px 0",
                }}
              >
                {item.value}
              </p>
              <small style={{ color: "#cbd5e1" }}>{item.note}</small>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "35px",
            padding: "25px",
            borderRadius: "18px",
            background: "#0f172a",
            border: "1px solid #334155",
          }}
        >
          <h2>Payment Instructions</h2>
          <p>1. Register as a student.</p>
          <p>2. Contact the school to complete payment.</p>
          <p>3. Admin confirms payment from the dashboard.</p>
          <p>4. Student Portal will show Paid status after confirmation.</p>
        </div>

        <button
          onClick={() => setPage("register")}
          style={{
            marginTop: "30px",
            padding: "14px 30px",
            borderRadius: "12px",
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "18px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Register Now
        </button>
      </div>
    </section>
  );
}

export default Payments;