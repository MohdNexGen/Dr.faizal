import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const STUDENT_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyEy5PiQ_D4z_9JobE9DgzUQ2EBGK55-x_8KLA2upup0HW9jzGmFktY1tIiuYJuHZ552A/exec";

const courseOptions = {
  English: [
    {
      value: "Full Web Development",
      label: "Full Web Development - 3000 ETB",
      fee: 3000,
    },
  ],
  Arabic: [
    {
      value: "Arabic Web Development",
      label: "دورة تطوير الويب الكاملة - 3000 ETB",
      fee: 3000,
    },
  ],
  Somali: [
    {
      value: "Somali Web Development",
      label: "Koorsada Web Development-ka Buuxa - 3000 ETB",
      fee: 3000,
    },
  ],
};

function Registration({ language = "English", setPage }) {
  const selectedLanguage = language || "English";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    language: selectedLanguage,
    course: "",
    feeAmount: "",
    paymentStatus: "Pending",
  });

  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setForm((previous) => ({
      ...previous,
      language: selectedLanguage,
      course: "",
      feeAmount: "",
    }));
  }, [selectedLanguage]);

  function getStudents() {
    return JSON.parse(localStorage.getItem("students")) || [];
  }

  function generateStudentId() {
    const students = getStudents();
    const nextNumber = students.length + 1;
    return `DFS-2026-${String(nextNumber).padStart(4, "0")}`;
  }

  function handleLanguageChange(e) {
    setForm({
      ...form,
      language: e.target.value,
      course: "",
      feeAmount: "",
    });
  }

  function handleCourseChange(e) {
    const selectedCourse = e.target.value;

    const selected = courseOptions[form.language]?.find(
      (course) => course.value === selectedCourse
    );

    setForm({
      ...form,
      course: selectedCourse,
      feeAmount: selected ? selected.fee : "",
    });
  }

  async function sendToGoogleSheet(student) {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setMessage("");

    const newStudent = {
      studentId: generateStudentId(),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      language: form.language,
      course: form.course,
      feeAmount: form.feeAmount,
      paymentStatus: form.paymentStatus,
      registeredAt: new Date().toLocaleDateString(),
    };

    const templateParams = {
      student_id: newStudent.studentId,
      student_name: newStudent.fullName,
      student_email: newStudent.email,
      student_phone: newStudent.phone,
      student_language: newStudent.language,
      student_course: newStudent.course,
      fee_amount: `${newStudent.feeAmount} ETB`,
      payment_status: newStudent.paymentStatus,
      registered_at: newStudent.registeredAt,
    };

    try {
      const students = getStudents();
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));

      await sendToGoogleSheet(newStudent);

      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      await emailjs.send(
        SERVICE_ID,
        STUDENT_TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setMessage(
        `✅ Registered successfully. Student ID: ${newStudent.studentId}. Saved and emails sent.`
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        language: selectedLanguage,
        course: "",
        feeAmount: "",
        paymentStatus: "Pending",
      });

      setTimeout(() => setMessage(""), 6000);
    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        "❌ Student saved locally, but Google Sheet or email failed. Check Apps Script and EmailJS."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <section className="form-box">
        <h2>Student Registration</h2>

        <p className="form-note">
          Register students with unique ID, course fee, payment status, Google
          Sheet backup, and email confirmation.
        </p>

        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />

          <select value={form.language} onChange={handleLanguageChange} required>
            <option value="English">English</option>
            <option value="Arabic">العربية</option>
            <option value="Somali">Soomaali</option>
          </select>

          <select value={form.course} onChange={handleCourseChange} required>
            <option value="">Select Course</option>

            {(courseOptions[form.language] || []).map((course) => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={form.feeAmount ? `${form.feeAmount} ETB` : ""}
            placeholder="Course Fee"
            readOnly
          />

          <select
            value={form.paymentStatus}
            onChange={(e) =>
              setForm({ ...form, paymentStatus: e.target.value })
            }
            required
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>

          <button type="submit" disabled={sending}>
            {sending ? "Saving..." : "Register Student"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Registration;