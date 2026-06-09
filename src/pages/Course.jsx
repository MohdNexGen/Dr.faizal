const courseData = {
  English: {
    heading: "Courses",
    stats: ["Total Courses: 1", "Language: English", "Duration: 1 Month"],
    course: {
      title: "Full Web Development",
      description: "HTML, CSS, JavaScript, React, Node.js and real projects.",
      fee: "3000 ETB",
    },
    register: "Register Now",
  },
  Arabic: {
    heading: "الدورات",
    stats: ["إجمالي الدورات: 1", "اللغة: العربية", "المدة: شهر واحد"],
    course: {
      title: "دورة تطوير الويب الكاملة",
      description: "HTML و CSS و JavaScript و React و Node.js مع مشاريع عملية.",
      fee: "3000 ETB",
    },
    register: "سجل الآن",
  },
  Somali: {
    heading: "Koorsooyinka",
    stats: ["Koorsooyinka: 1", "Luuqadda: Soomaali", "Muddada: 1 Bil"],
    course: {
      title: "Koorsada Web Development-ka Buuxa",
      description: "HTML, CSS, JavaScript, React, Node.js iyo mashruucyo dhab ah.",
      fee: "3000 ETB",
    },
    register: "Is Diiwaangeli",
  },
};

function Course({ setPage, language }) {
  const data = courseData[language];

  return (
    <main className="page-container">
      <h1>{data.heading}</h1>

      <div className="course-stats">
        {data.stats.map((item, index) => (
          <div className="mini-stat" key={index}>
            {item}
          </div>
        ))}
      </div>

      <div className="course-grid">
        <div className="card">
          <span className="language-badge">{language}</span>
          <h2>{data.course.title}</h2>
          <p>{data.course.description}</p>
          <strong>Fee: {data.course.fee}</strong>

          <button className="primary-btn" onClick={() => setPage("register")}>
            {data.register}
          </button>
        </div>
      </div>
    </main>
  );
}

export default Course;