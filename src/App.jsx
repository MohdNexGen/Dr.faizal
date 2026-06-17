import "./App.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate("/")}>
      ← Back to Home
    </button>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wave"></div>
      <h2>🏫 Najash College</h2>
      <p>Future Skills for Future Leaders</p>
      <p>Web Development • English • Arabic • Somali • Computer Skills</p>
      <p>© 2026 Najash College. All Rights Reserved.</p>
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>🏫 Najash College</h1>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/about">About</Link>
        <Link to="/admission">Admission</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <section className="hero">
        <h2>Future Skills for Future Leaders</h2>
        <p>
          Learn Web Development, English, Arabic, Somali and Computer Skills.
        </p>

        <div className="hero-buttons">
          <button onClick={() => navigate("/admission")}>Apply Now</button>
          <button onClick={() => navigate("/programs")}>View Programs</button>
        </div>
      </section>

      <section className="programs-section">
        <div className="card">
          <h3>💻 Web Development</h3>
          <p>HTML, CSS, JavaScript, React</p>
        </div>

        <div className="card">
          <h3>📚 English Language</h3>
          <p>Speaking, Writing and Grammar</p>
        </div>

        <div className="card">
          <h3>🌍 Arabic Language</h3>
          <p>Reading, Writing and Communication</p>
        </div>

        <div className="card">
          <h3>🖥️ Computer Skills</h3>
          <p>Microsoft Office & Technology</p>
        </div>
      </section>
    </div>
  );
}

function Admission() {
  const navigate = useNavigate();

  const SERVICE_ID = "nexgen_gmail";
  const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
 const STUDENT_TEMPLATE_ID = "template_rbz2rme";
  const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

  const [formData, setFormData] = useState({
    student_name: "",
    student_phone: "",
    student_email: "",
    student_course: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleRegister() {
    if (
      formData.student_name === "" ||
      formData.student_phone === "" ||
      formData.student_email === "" ||
      formData.student_course === ""
    ) {
      alert("⚠️ Please fill all fields.");
      return;
    }
const templateParams = {
  student_name: formData.student_name,
  
  student_email: formData.student_email,
  student_phone: formData.student_phone,
  student_course: formData.student_course,
  student_message: "New admission application",
  to_email: formData.student_email,
};

    emailjs

      .send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        return emailjs.send(
          SERVICE_ID,
          STUDENT_TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );
      })
      .then(() => {
        alert("✅ Registration submitted. Emails sent successfully.");

        setFormData({
          student_name: "",
          student_phone: "",
          student_email: "",
          student_course: "",
        });
      })
.catch((error) => {
  console.log("EMAILJS ERROR:", error);

  alert(
    "Status: " + error.status +
    "\nText: " + error.text
  );
});
  }

  return (
    <div className="page">
      <BackButton />

      <h1>🎓 Admission</h1>
      <p>Join Najash College and start your future today.</p>

      <div className="form-box">
        <input
          name="student_name"
          type="text"
          placeholder="Full Name"
          value={formData.student_name}
          onChange={handleChange}
        />

        <input
          name="student_phone"
          type="text"
          placeholder="Phone Number"
          value={formData.student_phone}
          onChange={handleChange}
        />

        <input
          name="student_email"
          type="email"
          placeholder="Email Address"
          value={formData.student_email}
          onChange={handleChange}
        />

        <select
          name="student_course"
          value={formData.student_course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          <option>Web Development</option>
          <option>English Language</option>
          <option>Arabic Language</option>
          <option>Somali Language</option>
          <option>Computer Skills</option>
        </select>

        <button onClick={handleRegister}>Register Now</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}

function Programs() {
  return (
    <div className="page">
      <BackButton />
      <h1>Programs</h1>
      <p>Our training programs will be listed here.</p>
    </div>
  );
}

function About() {
  return (
    <div className="page">
      <BackButton />
      <h1>About Najash College</h1>
      <p>Empowering students with future-ready skills.</p>
    </div>
  );
}

function Contact() {
  return (
    <div className="page">
      <BackButton />
      <h1>Contact Us</h1>
      <p>Email, phone, and location details.</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <BackButton />
      <h1>Student Dashboard</h1>
      <p>Student portal and learning progress.</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/about" element={<About />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      <Footer />
    </>
  );
}