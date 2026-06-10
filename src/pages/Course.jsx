const courseData = {
  English: {
    heading: "Available Courses",
    title: "Full Web Development",
    description: "HTML, CSS, JavaScript, React, Node.js and real projects.",
    fee: "3000 ETB",
    register: "Register Now",
  },
  Arabic: {
    heading: "الدورات المتاحة",
    title: "دورة تطوير الويب الكاملة",
    description: "HTML و CSS و JavaScript و React و Node.js مع مشاريع عملية.",
    fee: "3000 ETB",
    register: "سجل الآن",
  },
  Somali: {
    heading: "Koorsooyinka La Heli Karo",
    title: "Koorsada Web Development-ka Buuxa",
    description: "HTML, CSS, JavaScript, React, Node.js iyo mashruucyo dhab ah.",
    fee: "3000 ETB",
    register: "Is Diiwaangeli",
  },
};

function Course({ setPage, language }) {
  const data = courseData[language];

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        ← Back to Home
      </button>

      <h1>{data.heading}</h1>

      <div className="course-grid">
        <div className="card">
          <span className="language-badge">{language}</span>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <strong>Fee: {data.fee}</strong>

          <button className="primary-btn" onClick={() => setPage("register")}>
            {data.register}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Course;