function AdminDashboard() {
  return (
    <main className="page-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-stats">
        <div className="stat-box">
          <h3>125</h3>
          <p>Total Students</p>
        </div>

        <div className="stat-box">
          <h3>6</h3>
          <p>Courses</p>
        </div>

        <div className="stat-box">
          <h3>18</h3>
          <p>Pending Payments</p>
        </div>

        <div className="stat-box">
          <h3>375,000 ETB</h3>
          <p>Total Revenue</p>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;