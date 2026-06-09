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
    questions: [
      {
        q: "What does HTML stand for?",
        options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyper Transfer Main Language"],
        answer: "HyperText Markup Language",
      },
      {
        q: "Which language styles a web page?",
        options: ["HTML", "CSS", "React"],
        answer: "CSS",
      },
      {
        q: "Which method is used to map data into components?",
        options: ["filter()", "map()", "reduce()"],
        answer: "map()",
      },
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
    questions: [
      {
        q: "ما وظيفة HTML؟",
        options: ["بناء هيكل الصفحة", "تلوين الصفحة", "حفظ البيانات"],
        answer: "بناء هيكل الصفحة",
      },
      {
        q: "أي لغة تستخدم لتنسيق الموقع؟",
        options: ["CSS", "HTML", "Node.js"],
        answer: "CSS",
      },
      {
        q: "أي دالة تستخدم لعرض البيانات كمكونات؟",
        options: ["map()", "filter()", "reduce()"],
        answer: "map()",
      },
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
    questions: [
      {
        q: "HTML maxay qabataa?",
        options: ["Waxay dhistaa qaabka bogga", "Waxay qurxisaa bogga", "Waxay kaydisaa lacag"],
        answer: "Waxay dhistaa qaabka bogga",
      },
      {
        q: "Luuqaddee ayaa website-ka qurxisa?",
        options: ["CSS", "HTML", "React"],
        answer: "CSS",
      },
      {
        q: "React dhexdiisa xogta sidee loogu rogaa components?",
        options: ["map()", "filter()", "reduce()"],
        answer: "map()",
      },
    ],
  },
};

const features = [
  "Reusable React Components",
  "English, Arabic and Somali Courses",
  "Real Projects and Practice",
  "Multiple Choice Tests",
];

function App() {
  const [page, setPage] = useState("home");
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const course = page !== "home" ? courses[page] : null;

  function selectAnswer(questionIndex, option) {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  }

  function calculateScore() {
    return course.questions.filter(
      (question, index) => answers[index] === question.answer
    ).length;
  }

  function openCourse(language) {
    setPage(language);
    setAnswers({});
    setShowResult(false);
  }

  if (page === "home") {
    return (
      <main className="app">
        <section className="card">
          <header className="hero">
            <p className="small-title">REACT JS ES6 PLATFORM</p>
            <h1>Dr. Faizel Academy</h1>
            <p>
              Professional multilingual learning platform using reusable React
              components, mapping, lessons, and tests.
            </p>
          </header>

          <section className="ad-section">
            {features.map((feature) => (
              <div className="ad-card" key={feature}>
                <h3>{feature}</h3>
                <p>Professional learning system ready for schools and universities.</p>
              </div>
            ))}
          </section>

          <div className="language-buttons">
            <button onClick={() => openCourse("english")}>🇺🇸 English</button>
            <button onClick={() => openCourse("arabic")}>🇸🇦 العربية</button>
            <button onClick={() => openCourse("somali")}>🇸🇴 Somali</button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app">
      <section className="card">
        <header className="hero">
          <p className="small-title">REACT JS ES6 PLATFORM</p>
          <h1>{course.title}</h1>
          <p>{course.desc}</p>
        </header>

        <section className="course">
          <button className="back-btn" onClick={() => setPage("home")}>
            ← Back to Home
          </button>

          <h2>Course Lessons</h2>

          <div className="lessons">
            {course.lessons.map((lesson, index) => (
              <div className="lesson" key={lesson}>
                <span>{index + 1}</span>
                <h3>{lesson}</h3>
                <button>Resources</button>
              </div>
            ))}
          </div>

          <section className="test-box">
            <h2>Multiple Choice Test</h2>
            <p>
              Choose your answers. The result will appear only after you click
              the result button.
            </p>

            {course.questions.map((question, questionIndex) => (
              <div className="question-card" key={question.q}>
                <h3>
                  {questionIndex + 1}. {question.q}
                </h3>

                <div className="options">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      className={
                        answers[questionIndex] === option ? "selected-option" : ""
                      }
                      onClick={() => selectAnswer(questionIndex, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button className="result-btn" onClick={() => setShowResult(true)}>
              Show Result
            </button>

            {showResult && (
              <div className="result-box">
                <h2>
                  Result: {calculateScore()} / {course.questions.length}
                </h2>

                <p>
                  Answered: {Object.keys(answers).length} questions
                </p>

                <p>
                  Correct: {calculateScore()} | Wrong:{" "}
                  {course.questions.length - calculateScore()}
                </p>
              </div>
            )}
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;