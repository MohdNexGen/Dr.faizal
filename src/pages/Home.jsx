const homeText = {
  English: {
    title: "Najash College",
    subtitle:
      "Professional multilingual school management system for students, courses, payments, certificates, and administration.",
    register: "Student Registration",
    courses: "Available Courses",
    payments: "Payments & Fees",
    dashboard: "School Dashboard",
  },
  Arabic: {
    title: "كلية النجاشي",
    subtitle:
      "نظام إدارة مدرسي احترافي متعدد اللغات لإدارة الطلاب والدورات والمدفوعات والشهادات والإدارة.",
    register: "تسجيل الطلاب",
    courses: "الدورات المتاحة",
    payments: "المدفوعات والرسوم",
    dashboard: "لوحة إدارة المدرسة",
  },
  Somali: {
    title: "Kulliyadda Najash",
    subtitle:
      "Nidaam dugsi oo xirfad leh, luuqado badanna taageera, laguna maamulo ardayda, koorsooyinka, lacagaha, shahaadooyinka, iyo maamulka.",
    register: "Diiwaangelinta Ardayga",
    courses: "Koorsooyinka La Heli Karo",
    payments: "Lacagaha & Khidmadaha",
    dashboard: "Maamulka Dugsiga",
  },
};

function Home({ setPage, language }) {
  const text = homeText[language] || homeText.English;

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