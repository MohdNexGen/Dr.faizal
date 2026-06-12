import { useState } from "react";

import Home from "./pages/Home";
import Courses from "./pages/Course";
import Register from "./pages/Registration";
import StudentDashboard from "./pages/StudentDatshboard";
import AdminDashboard from "./pages/AdminDashboard";
import Payments from "./pages/Payments";
import CertificateVerification from "./pages/CertificateVerification";

const text = {
  English: {
    school: "Najash College",
    home: "Home",
    courses: "Courses",
    register: "Register",
    student: "Student Portal",
    verify: "Verify Certificate",
    admin: "Admin",
    payments: "Payments",
    rights: "© 2026 All Rights Reserved",
  },
  Arabic: {
    school: "كلية النجاشي",
    home: "الرئيسية",
    courses: "الدورات",
    register: "التسجيل",
    student: "بوابة الطالب",
    verify: "التحقق من الشهادة",
    admin: "الإدارة",
    payments: "المدفوعات",
    rights: "© 2026 جميع الحقوق محفوظة",
  },
  Somali: {
    school: "Kulliyadda Najash",
    home: "Bogga Hore",
    courses: "Koorsooyinka",
    register: "Isdiiwaangeli",
    student: "Bogga Ardayga",
    verify: "Hubi Shahaadada",
    admin: "Maamulka",
    payments: "Lacag-bixinta",
    rights: "© 2026 Xuquuqda oo dhan way xafidan tahay",
  },
};

function App() {
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("English");

  const t = text[language];
  const goHome = () => setPage("home");

  return (
    <div className="app" dir={language === "Arabic" ? "rtl" : "ltr"}>
      <nav className="navbar">
        <h2 className="logo" onClick={goHome}>
          {t.school}
        </h2>

        <div className="nav-buttons">
          <button onClick={() => setPage("home")}>{t.home}</button>
          <button onClick={() => setPage("courses")}>{t.courses}</button>
          <button onClick={() => setPage("register")}>{t.register}</button>
          <button onClick={() => setPage("student")}>{t.student}</button>
          <button onClick={() => setPage("verify")}>{t.verify}</button>
          <button onClick={() => setPage("admin")}>{t.admin}</button>
          <button onClick={() => setPage("payments")}>{t.payments}</button>
        </div>
      </nav>

      <div className="language-switcher">
        <button
          className={language === "English" ? "active-lang" : ""}
          onClick={() => setLanguage("English")}
        >
          English
        </button>

        <button
          className={language === "Arabic" ? "active-lang" : ""}
          onClick={() => setLanguage("Arabic")}
        >
          العربية
        </button>

        <button
          className={language === "Somali" ? "active-lang" : ""}
          onClick={() => setLanguage("Somali")}
        >
          Soomaali
        </button>
      </div>

      <main>
        {page === "home" && <Home setPage={setPage} language={language} />}
        {page === "courses" && <Courses setPage={setPage} language={language} />}
        {page === "register" && <Register setPage={setPage} language={language} />}
        {page === "student" && <StudentDashboard setPage={setPage} />}
        {page === "verify" && <CertificateVerification setPage={setPage} />}
        {page === "admin" && <AdminDashboard setPage={setPage} />}
        {page === "payments" && <Payments setPage={setPage} />}
      </main>

      <footer className="footer">
        <p>{t.school}</p>
        <p>English | العربية | Soomaali</p>
        <small>{t.rights}</small>
      </footer>
    </div>
  );
}

export default App;