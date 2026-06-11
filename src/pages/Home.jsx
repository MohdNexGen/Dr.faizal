const homeText = {
  English: {
    title: "Najash Colledge",
    subtitle:
      "Professional multilingual school management system for students, courses, payments, and administration.",
    register: "Student Registration",
    courses: "Available Courses",
    payments: "Payments & Fees",
    dashboard: "School Dashboard",
  },
  Arabic: {
    title: "مدرسة د. فيصل",
    subtitle:
      "نظام مدرسي احترافي متعدد اللغات لإدارة الطلاب والدورات والمدفوعات والإدارة.",
    register: "تسجيل الطلاب",
    courses: "الدورات المتاحة",
    payments: "المدفوعات والرسوم",
    dashboard: "لوحة الإدارة",
  },
  Somali: {
    title: "Dugsiga Dr. Faizal",
    subtitle:
      "Nidaam dugsi oo luuqado badan ah oo lagu maamulo ardayda, koorsooyinka, lacagaha, iyo maamulka.",
    register: "Diiwaangelinta Ardayga",
    courses: "Koorsooyinka La Heli Karo",
    payments: "Lacagaha & Khidmadaha",
    dashboard: "Dashboard-ka Dugsiga",
  },
};

function Home({ setPage, language }) {
  const text = homeText[language];

  return (
    <main className="page-container">
      <section className="hero">
        <h1>{text.title}</h1>
        <p>{text.subtitle}</p>

        <div className="home-card-grid">
          <button className="home-card" onClick={() => setPage("register")}>
            <h3>👨‍🎓</h3>
            <p>{text.register}</p>
          </button>

          <button className="home-card" onClick={() => setPage("courses")}>
            <h3>💻</h3>
            <p>{text.courses}</p>
          </button>

          <button className="home-card" onClick={() => setPage("payments")}>
            <h3>💰</h3>
            <p>{text.payments}</p>
          </button>

          <button className="home-card" onClick={() => setPage("admin")}>
            <h3>📊</h3>
            <p>{text.dashboard}</p>
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;