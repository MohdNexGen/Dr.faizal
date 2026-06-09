function Registration() {
  return (
    <main className="page-container">
      <section className="form-box">
        <h2>Student Registration</h2>
        <p className="form-note">
          Register a student for Dr. Faizal School courses.
        </p>

        <form>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Phone Number" required />

          <select required>
            <option value="">Select Course</option>
            <option value="Full Web Development">Full Web Development - 3000 ETB</option>
            <option value="HTML Basics">HTML Basics - 1000 ETB</option>
            <option value="CSS Styling">CSS Styling - 1500 ETB</option>
            <option value="JavaScript">JavaScript - 2000 ETB</option>
            <option value="React Development">React Development - 2500 ETB</option>
          </select>

          <select required>
            <option value="">Payment Status</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          <button type="submit">Register Student</button>
        </form>
      </section>
    </main>
  );
}

export default Registration;