import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

const SERVICE_ID = "nexgen_gmail";
const ADMIN_TEMPLATE_ID = "template_zvfw3qd";
const STUDENT_TEMPLATE_ID = "template_rbz2rme";
const PUBLIC_KEY = "H5xDt1e48EHqf_U4U";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyEy5PiQ_D4z_9JobE9DgzUQ2EBGK55-x_8KLA2upup0HW9jzGmFktY1tIiuYJuHZ552A/exec";

const pageText = {
  English: {
    back: "← Back to Home",
    title: "Student Registration",
    note:
      "Register students with unique ID, course fee, payment status, Supabase database, Google Sheet backup, and email confirmation.",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    selectCourse: "Select Course",
    fee: "Course Fee",
    pending: "Pending",
    paid: "Paid",
    saving: "Saving...",
    button: "Register Student",
    success: "✅ Registered successfully. Student ID:",
    failed:
      "❌ Registration failed. Check Supabase table columns, API keys, Google Sheet, or EmailJS.",
  },
  Arabic: {
    back: "← العودة إلى الرئيسية",
    title: "تسجيل الطلاب",
    note:
      "سجّل الطلاب برقم تعريفي خاص، ورسوم الدورة، وحالة الدفع، مع حفظ البيانات في Supabase و Google Sheet وإرسال تأكيد بالبريد الإلكتروني.",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    selectCourse: "اختر الدورة",
    fee: "رسوم الدورة",
    pending: "قيد الانتظار",
    paid: "مدفوع",
    saving: "جارٍ الحفظ...",
    button: "تسجيل الطالب",
    success: "✅ تم التسجيل بنجاح. رقم الطالب:",
    failed:
      "❌ فشل التسجيل. تحقق من Supabase أو Google Sheet أو EmailJS.",
  },
  Somali: {
    back: "← Ku noqo Bogga Hore",
    title: "Diiwaangelinta Ardayga",
    note:
      "Diiwaangeli ardayda adigoo siinaya ID gaar ah, qiimaha koorsada, xaaladda lacag-bixinta, Supabase database, Google Sheet backup, iyo email xaqiijin ah.",
    fullName: "Magaca Buuxa",
    email: "Email-ka",
    phone: "Telefoonka",
    selectCourse: "Dooro Koorsada",
    fee: "Qiimaha Koorsada",
    pending: "Sugaya",
    paid: "La Bixiyay",
    saving: "Waa la keydinayaa...",
    button: "Diiwaangeli Ardayga",
    success: "✅ Si guul leh ayaa loo diiwaangeliyay. Student ID:",
    failed:
      "❌ Diiwaangelintu way fashilantay. Hubi Supabase, Google Sheet, ama EmailJS.",
  },
};

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
  const text = pageText[selectedLanguage] || pageText.English;

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

  async function generateStudentId() {
    const { count, error } = await supabase
      .from("students")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    const nextNumber = (count || 0) + 1;
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

  async function saveToSupabase(student) {
    const { error } = await supabase.from("students").insert([
      {
        student_id: student.studentId,
        name: student.fullName,
        email: student.email,
        phone: student.phone,
        language: student.language,
        course: student.course,
        fee: student.feeAmount,
        payment_status: student.paymentStatus,
        registration_date: student.registeredAt,
      },
    ]);

    if (error) throw error;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setMessage("");

    try {
      const studentId = await generateStudentId();

      const newStudent = {
        studentId,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        language: form.language,
        course: form.course,
        feeAmount: form.feeAmount,
        paymentStatus: form.paymentStatus,
        registeredAt: new Date().toISOString(),
      };

      const templateParams = {
        to_email: newStudent.email,
        student_id: newStudent.studentId,
        student_name: newStudent.fullName,
        student_email: newStudent.email,
        student_phone: newStudent.phone,
        student_language: newStudent.language,
        student_course: newStudent.course,
        fee_amount: `${newStudent.feeAmount} ETB`,
        payment_status: newStudent.paymentStatus,
        registered_at: new Date(newStudent.registeredAt).toLocaleDateString(),
      };

      await saveToSupabase(newStudent);
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

      setMessage(`${text.success} ${newStudent.studentId}`);

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
      setMessage(text.failed);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        {text.back}
      </button>

      <section className="form-box">
        <h2>{text.title}</h2>

        <p className="form-note">{text.note}</p>

        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={text.fullName}
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder={text.email}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="tel"
            placeholder={text.phone}
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
            <option value="">{text.selectCourse}</option>

            {(courseOptions[form.language] || []).map((course) => (
              <option key={course.value} value={course.value}>
                {course.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={form.feeAmount ? `${form.feeAmount} ETB` : ""}
            placeholder={text.fee}
            readOnly
          />

          <select
            value={form.paymentStatus}
            onChange={(e) =>
              setForm({ ...form, paymentStatus: e.target.value })
            }
            required
          >
            <option value="Pending">{text.pending}</option>
            <option value="Paid">{text.paid}</option>
          </select>

          <button type="submit" disabled={sending}>
            {sending ? text.saving : text.button}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Registration;