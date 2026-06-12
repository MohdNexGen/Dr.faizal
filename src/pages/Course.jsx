const courseData = {
  English: {
    back: "← Back to Home",
    heading: "Available Courses",
    badge: "English Program",
    title: "Full Web Development",
    description:
      "Learn HTML, CSS, JavaScript, React, Node.js, Supabase, GitHub, Vercel deployment, and real client projects.",
    duration: "Duration: 1 Month",
    feeLabel: "Fee",
    fee: "3000 ETB",
    topicsTitle: "What you will learn",
    topics: [
      "HTML website structure",
      "CSS professional styling",
      "JavaScript interactivity",
      "React components",
      "Supabase database",
      "Real project deployment",
    ],
    register: "Register Now",
  },
  Arabic: {
    back: "← العودة إلى الرئيسية",
    heading: "الدورات المتاحة",
    badge: "البرنامج العربي",
    title: "دورة تطوير الويب الكاملة",
    description:
      "تعلّم HTML و CSS و JavaScript و React و Node.js و Supabase و GitHub ونشر المواقع على Vercel مع مشاريع عملية حقيقية.",
    duration: "المدة: شهر واحد",
    feeLabel: "الرسوم",
    fee: "3000 ETB",
    topicsTitle: "ماذا ستتعلم",
    topics: [
      "بناء هيكل الموقع باستخدام HTML",
      "تنسيق احترافي باستخدام CSS",
      "إضافة التفاعل باستخدام JavaScript",
      "بناء المكونات باستخدام React",
      "استخدام قاعدة بيانات Supabase",
      "نشر مشروع حقيقي على الإنترنت",
    ],
    register: "سجل الآن",
  },
  Somali: {
    back: "← Ku noqo Bogga Hore",
    heading: "Koorsooyinka La Heli Karo",
    badge: "Barnaamijka Soomaaliga",
    title: "Koorsada Web Development-ka Buuxa",
    description:
      "Baro HTML, CSS, JavaScript, React, Node.js, Supabase, GitHub, Vercel deployment, iyo mashruucyo dhab ah.",
    duration: "Mudada: 1 Bil",
    feeLabel: "Qiimaha",
    fee: "3000 ETB",
    topicsTitle: "Waxaad baran doontaa",
    topics: [
      "Qaab-dhismeedka website-ka HTML",
      "Qurxinta professional-ka ah ee CSS",
      "Dhaqdhaqaaqa website-ka JavaScript",
      "React components",
      "Supabase database",
      "Sida mashruuc dhab ah online loogu geliyo",
    ],
    register: "Is Diiwaangeli",
  },
};

function Course({ setPage, language }) {
  const data = courseData[language] || courseData.English;

  return (
    <main className="page-container">
      <button className="back-btn" onClick={() => setPage("home")}>
        {data.back}
      </button>

      <h1>{data.heading}</h1>

      <div className="course-grid">
        <div className="card">
          <span className="language-badge">{data.badge}</span>

          <h2>{data.title}</h2>
          <p>{data.description}</p>

          <p>
            <strong>{data.duration}</strong>
          </p>

          <p>
            <strong>
              {data.feeLabel}: {data.fee}
            </strong>
          </p>

          <h3>{data.topicsTitle}</h3>

          <ul style={topicListStyle}>
            {data.topics.map((topic) => (
              <li key={topic}>✅ {topic}</li>
            ))}
          </ul>

          <button className="primary-btn" onClick={() => setPage("register")}>
            {data.register}
          </button>
        </div>
      </div>
    </main>
  );
}

const topicListStyle = {
  textAlign: "left",
  maxWidth: "520px",
  margin: "20px auto",
  lineHeight: "1.9",
};

export default Course;