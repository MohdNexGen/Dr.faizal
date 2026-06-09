const registrationText = {
  English: {
    title: "Student Registration",
    note: "Register students for Dr. Faizal School courses.",
    name: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    language: "Select Language",
    course: "Select Course",
    payment: "Payment Status",
    pending: "Pending",
    paid: "Paid",
    button: "Register Student",
  },
  Arabic: {
    title: "تسجيل الطلاب",
    note: "تسجيل الطلاب في دورات مدرسة د. فيصل.",
    name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    language: "اختر اللغة",
    course: "اختر الدورة",
    payment: "حالة الدفع",
    pending: "قيد الانتظار",
    paid: "مدفوع",
    button: "تسجيل الطالب",
  },
  Somali: {
    title: "Diiwaangelinta Ardayga",
    note: "Ku diiwaangeli ardayda koorsooyinka Dugsiga Dr. Faizal.",
    name: "Magaca Buuxa",
    email: "Email-ka",
    phone: "Lambarka Telefoonka",
    language: "Dooro Luuqadda",
    course: "Dooro Koorsada",
    payment: "Xaaladda Lacagta",
    pending: "Wali Lama Bixin",
    paid: "Waa La Bixiyay",
    button: "Diiwaangeli Ardayga",
  },
};

function Registration({ language }) {
  const text = registrationText[language];

  return (
    <main className="page-container">
      <section className="form-box">
        <h2>{text.title}</h2>
        <p className="form-note">{text.note}</p>

        <form>
          <input type="text" placeholder={text.name} required />
          <input type="email" placeholder={text.email} required />
          <input type="tel" placeholder={text.phone} required />

          <select defaultValue={language} required>
            <option value="English">English</option>
            <option value="Arabic">العربية</option>
            <option value="Somali">Soomaali</option>
          </select>

          <select required>
            <option value="">{text.course}</option>
            <option value="Full Web Development">
              Full Web Development - 3000 ETB
            </option>
            <option value="Arabic Web Development">
              دورة تطوير الويب الكاملة - 3000 ETB
            </option>
            <option value="Somali Web Development">
              Koorsada Web Development-ka Buuxa - 3000 ETB
            </option>
          </select>

          <select required>
            <option value="">{text.payment}</option>
            <option value="Pending">{text.pending}</option>
            <option value="Paid">{text.paid}</option>
          </select>

          <button type="submit">{text.button}</button>
        </form>
      </section>
    </main>
  );
}

export default Registration;