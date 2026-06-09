import { useState } from "react";
import "./App.css";

const courses = {
  english: {
    label: "🇺🇸 English",
    title: "English Web Development Course",
    desc: "Learn HTML, CSS, JavaScript ES6, React JS, Node.js and real projects.",
    lessons: [
      "HTML Fundamentals",
      "CSS Professional Styling",
      "JavaScript ES6",
      "React Components",
      "Mapping Data to Components",
      "Reusable Components",
      "Node.js & Express",
      "Real Website Projects",
    ],
  },

  arabic: {
    label: "🇸🇦 العربية",
    title: "دورة تطوير الويب",
    desc: "تعلم HTML و CSS و JavaScript ES6 و React JS ومشاريع حقيقية.",
    lessons: [
      "أساسيات HTML",
      "تنسيق CSS",
      "JavaScript ES6",
      "مكونات React",
      "عرض البيانات باستخدام Map",
      "مكونات قابلة لإعادة الاستخدام",
      "Node.js و Express",
      "مشاريع مواقع حقيقية",
    ],
  },

  somali: {
    label: "🇸🇴 Somali",
    title: "Koorsada Horumarinta Webka",
    desc: "Baro HTML, CSS, JavaScript ES6, React JS iyo mashruucyo dhab ah.",
    lessons: [
      "Aasaaska HTML",
      "Naqshadaynta CSS",
      "JavaScript ES6",
      "React Components",
      "Mapping Data to Components",
      "Reusable Components",
      "Node.js & Express",
      "Mashruucyo Website Ah",
    ],
  },
};

function App() {
  const [page, setPage] = useState("home");

  if (page === "home") {
    return (
      <main className="app">
        <section className="card">
          <header className="hero">
            <p className="small-title">REACT JS ES6 PLATFORM</p>

            <h1>Dr. Faizel Academy</h1>

            <p>
              Professional multilingual learning platform using reusable
              React components and mapping.
            </p>
          </header>

          <div className="language-buttons">
            <button onClick={() => setPage("english")}>
              🇺🇸 English
            </button>

            <button onClick={() => setPage("arabic")}>
              🇸🇦 العربية
            </button>

            <button onClick={() => setPage("somali")}>
              🇸🇴 Somali
            </button>
          </div>
        </section>
      </main>
    );
  }

  const course = courses[page];

  return (
    <main className="app">
      <section className="card">

        <header className="hero">
          <p className="small-title">REACT JS ES6 PLATFORM</p>
          <h1>{course.title}</h1>
          <p>{course.desc}</p>
        </header>

        <section className="course">

          <button
            className="back-btn"
            onClick={() => setPage("home")}
          >
            ← Back to Home
          </button>

          <div className="lessons">
            {course.lessons.map((lesson, index) => (
              <div className="lesson" key={lesson}>
                <span>{index + 1}</span>

                <h3>{lesson}</h3>

                <button>Resources</button>
              </div>
            ))}
          </div>

        </section>

      </section>
    </main>
  );
}

export default App;