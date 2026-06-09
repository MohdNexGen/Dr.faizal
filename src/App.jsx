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
  const [language, setLanguage] = useState("english");
  const course = courses[language];

  return (
    <main className="app">
      <section className="card">
        <header className="hero">
          <p className="small-title">React JS ES6 Platform</p>
          <h1>Dr. Faizel Academy</h1>
          <p>
            Professional multilingual learning platform using reusable React
            components and mapping.
          </p>
        </header>

        <div className="language-buttons">
          {Object.keys(courses).map((key) => (
            <button
              key={key}
              onClick={() => setLanguage(key)}
              className={language === key ? "active" : ""}
            >
              {courses[key].label}
            </button>
          ))}
        </div>

        <section className="course">
          <h2>{course.title}</h2>
          <p>{course.desc}</p>

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