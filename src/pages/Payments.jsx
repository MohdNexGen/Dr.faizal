import { useState } from "react";
import { supabase } from "../lib/supabase";

const paymentText = {
  English: {
    back: "← Back to Home",
    title: "Payments & Fees",
    intro:
      "Students can check payment status and prepare an online payment reference. Chapa payment will be connected when API keys are ready.",
    courseFee: "Course Fee",
    courseNote: "Full Web Development Program",
    status: "Payment Status",
    statusValue: "Pending / Paid",
    statusNote: "Automatically updates after online payment is connected",
    reference: "Payment Reference",
    referenceValue: "Auto Generated",
    referenceNote: "Each student payment gets a unique reference",
    online: "Online Payment",
    onlineValue: "Chapa Ready",
    onlineNote: "API keys will activate real online payment",
    prepTitle: "Pay Now Preparation",
    prepNote:
      "Enter Student ID and phone number. The system will create a unique payment reference for this student.",
    studentId: "Student ID: DFS-2026-0020",
    phone: "Registered phone number",
    checking: "Checking...",
    find: "Find Student",
    notFound: "❌ Student not found. Check Student ID.",
    phoneError: "❌ Phone number does not match this Student ID.",
    found: "✅ Student found.",
    failed: "❌ Failed to prepare payment.",
    ready:
      "✅ Payment reference created. Chapa online payment will be connected when API keys are ready.",
    course: "Course",
    fee: "Fee",
    paymentStatus: "Status",
    method: "Payment Method",
    paymentReference: "Payment Reference",
    manual: "Manual",
    notCreated: "Not created yet",
    paid: "✓ Payment already confirmed.",
    preparing: "Preparing...",
    payNow: "Pay Now",
    note:
      "Note: This creates the payment reference now. Real online checkout will open here after Chapa API keys are connected.",
    register: "Register Now",
  },

  Arabic: {
    back: "← العودة إلى الرئيسية",
    title: "المدفوعات والرسوم",
    intro:
      "يمكن للطلاب التحقق من حالة الدفع وإنشاء رقم مرجعي للدفع. سيتم ربط Chapa عند توفر مفاتيح API.",
    courseFee: "رسوم الدورة",
    courseNote: "برنامج تطوير الويب الكامل",
    status: "حالة الدفع",
    statusValue: "قيد الانتظار / مدفوع",
    statusNote: "سيتم التحديث تلقائياً بعد ربط الدفع الإلكتروني",
    reference: "مرجع الدفع",
    referenceValue: "يتم إنشاؤه تلقائياً",
    referenceNote: "كل طالب يحصل على مرجع دفع خاص",
    online: "الدفع الإلكتروني",
    onlineValue: "جاهز لـ Chapa",
    onlineNote: "مفاتيح API ستفعل الدفع الإلكتروني الحقيقي",
    prepTitle: "تجهيز الدفع الآن",
    prepNote:
      "أدخل رقم الطالب ورقم الهاتف. سيقوم النظام بإنشاء مرجع دفع خاص لهذا الطالب.",
    studentId: "رقم الطالب: DFS-2026-0020",
    phone: "رقم الهاتف المسجل",
    checking: "جارٍ التحقق...",
    find: "البحث عن الطالب",
    notFound: "❌ لم يتم العثور على الطالب. تحقق من رقم الطالب.",
    phoneError: "❌ رقم الهاتف لا يطابق رقم الطالب.",
    found: "✅ تم العثور على الطالب.",
    failed: "❌ فشل تجهيز الدفع.",
    ready:
      "✅ تم إنشاء مرجع الدفع. سيتم ربط الدفع الإلكتروني عبر Chapa عند توفر مفاتيح API.",
    course: "الدورة",
    fee: "الرسوم",
    paymentStatus: "الحالة",
    method: "طريقة الدفع",
    paymentReference: "مرجع الدفع",
    manual: "يدوي",
    notCreated: "لم يتم إنشاؤه بعد",
    paid: "✓ تم تأكيد الدفع مسبقاً.",
    preparing: "جارٍ التجهيز...",
    payNow: "ادفع الآن",
    note:
      "ملاحظة: هذا ينشئ مرجع الدفع الآن. سيتم فتح الدفع الإلكتروني الحقيقي هنا بعد ربط Chapa.",
    register: "سجل الآن",
  },

  Somali: {
    back: "← Ku noqo Bogga Hore",
    title: "Lacagaha & Khidmadaha",
    intro:
      "Ardaydu waxay hubin karaan xaaladda lacag-bixinta waxayna samayn karaan payment reference. Chapa waxaa lagu xiri doonaa marka API keys diyaar noqdaan.",
    courseFee: "Qiimaha Koorsada",
    courseNote: "Barnaamijka Full Web Development",
    status: "Xaaladda Lacag-bixinta",
    statusValue: "Sugaya / La Bixiyay",
    statusNote: "Si toos ah ayuu isu beddeli doonaa marka online payment la xiro",
    reference: "Payment Reference",
    referenceValue: "Si toos ah ayaa loo sameeyaa",
    referenceNote: "Arday kasta wuxuu helayaa reference gaar ah",
    online: "Online Payment",
    onlineValue: "Chapa Ready",
    onlineNote: "API keys ayaa dhaqaajin doona payment-ka dhabta ah",
    prepTitle: "Diyaarinta Pay Now",
    prepNote:
      "Geli Student ID iyo telefoonka. Nidaamku wuxuu samayn doonaa payment reference gaar ah.",
    studentId: "Student ID: DFS-2026-0020",
    phone: "Telefoonka la diiwaangeliyay",
    checking: "Waa la hubinayaa...",
    find: "Raadi Ardayga",
    notFound: "❌ Arday lama helin. Hubi Student ID.",
    phoneError: "❌ Telefoonku ma waafaqsana Student ID-ga.",
    found: "✅ Ardayga waa la helay.",
    failed: "❌ Payment preparation wuu fashilmay.",
    ready:
      "✅ Payment reference waa la sameeyay. Chapa online payment waa la xiri doonaa marka API keys diyaar yihiin.",
    course: "Koorsada",
    fee: "Qiimaha",
    paymentStatus: "Xaaladda",
    method: "Habka Lacag-bixinta",
    paymentReference: "Payment Reference",
    manual: "Manual",
    notCreated: "Weli lama samayn",
    paid: "✓ Lacag-bixinta hore ayaa loo xaqiijiyay.",
    preparing: "Waa la diyaarinayaa...",
    payNow: "Bixi Hadda",
    note:
      "Fiiro gaar ah: Tani waxay samaynaysaa payment reference. Checkout-ka dhabta ah wuxuu furmi doonaa marka Chapa API keys la xiro.",
    register: "Is Diiwaangeli",
  },
};

function Payments({ setPage, language = "English" }) {
  const text = paymentText[language] || paymentText.English;
  const courseFee = 3000;

  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onlyNumbers = (value) => String(value || "").replace(/\D/g, "");

  function createPaymentReference(studentIdValue) {
    return `DFS-PAY-${studentIdValue}-${Date.now()}`;
  }

  async function findStudent(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setStudent(null);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("student_id", studentId.trim())
      .single();

    if (error || !data) {
      setMessage(text.notFound);
      setLoading(false);
      return;
    }

    if (onlyNumbers(data.phone) !== onlyNumbers(phone)) {
      setMessage(text.phoneError);
      setLoading(false);
      return;
    }

    setStudent(data);
    setMessage(text.found);
    setLoading(false);
  }

  async function preparePayment() {
    if (!student) return;

    setLoading(true);
    setMessage("");

    const reference =
      student.payment_reference || createPaymentReference(student.student_id);

    const { data, error } = await supabase
      .from("students")
      .update({
        payment_reference: reference,
        payment_method: "Chapa Pending",
      })
      .eq("student_id", student.student_id)
      .select()
      .single();

    if (error) {
      console.error("Payment preparation error:", error);
      setMessage(text.failed);
      setLoading(false);
      return;
    }

    setStudent(data);
    setMessage(text.ready);
    setLoading(false);
  }

  const paymentOptions = [
    {
      title: text.courseFee,
      value: `${courseFee} ETB`,
      note: text.courseNote,
      icon: "💰",
    },
    {
      title: text.status,
      value: text.statusValue,
      note: text.statusNote,
      icon: "📌",
    },
    {
      title: text.reference,
      value: text.referenceValue,
      note: text.referenceNote,
      icon: "🔐",
    },
    {
      title: text.online,
      value: text.onlineValue,
      note: text.onlineNote,
      icon: "🏦",
    },
  ];

  return (
    <section className="page-section">
      <button className="back-btn" onClick={() => setPage("home")}>
        {text.back}
      </button>

      <div className="page-card">
        <h1>{text.title}</h1>
        <p>{text.intro}</p>

        <div style={gridStyle}>
          {paymentOptions.map((item, index) => (
            <div className="stat-card" key={index}>
              <h2 style={{ fontSize: "42px", marginBottom: "10px" }}>
                {item.icon}
              </h2>
              <h3>{item.title}</h3>
              <p style={bigBlueText}>{item.value}</p>
              <small style={{ color: "#cbd5e1" }}>{item.note}</small>
            </div>
          ))}
        </div>

        <div style={boxStyle}>
          <h2>{text.prepTitle}</h2>
          <p>{text.prepNote}</p>

          <form onSubmit={findStudent} style={formStyle}>
            <input
              type="text"
              placeholder={text.studentId}
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              style={inputStyle}
            />

            <input
              type="tel"
              placeholder={text.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={inputStyle}
            />

            <button type="submit" disabled={loading} style={blueButton}>
              {loading ? text.checking : text.find}
            </button>
          </form>

          {message && <p className="success-message">{message}</p>}

          {student && (
            <div style={studentBox}>
              <h2>{student.name}</h2>
              <p>
                <strong>Student ID:</strong> {student.student_id}
              </p>
              <p>
                <strong>{text.course}:</strong> {student.course}
              </p>
              <p>
                <strong>{text.fee}:</strong> {student.fee} ETB
              </p>
              <p>
                <strong>{text.paymentStatus}:</strong>{" "}
                <span
                  className={
                    student.payment_status === "Paid"
                      ? "status-paid"
                      : "status-pending"
                  }
                >
                  {student.payment_status}
                </span>
              </p>
              <p>
                <strong>{text.method}:</strong>{" "}
                {student.payment_method || text.manual}
              </p>
              <p>
                <strong>{text.paymentReference}:</strong>{" "}
                {student.payment_reference || text.notCreated}
              </p>

              {student.payment_status === "Paid" ? (
                <p style={paidText}>{text.paid}</p>
              ) : (
                <button
                  onClick={preparePayment}
                  disabled={loading}
                  style={greenButton}
                >
                  {loading ? text.preparing : text.payNow}
                </button>
              )}

              <p style={noteText}>{text.note}</p>
            </div>
          )}
        </div>

        <button onClick={() => setPage("register")} style={registerButton}>
          {text.register}
        </button>
      </div>
    </section>
  );
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "20px",
  marginTop: "35px",
};

const bigBlueText = {
  color: "#60a5fa",
  fontWeight: "800",
  fontSize: "24px",
  margin: "10px 0",
};

const boxStyle = {
  marginTop: "35px",
  padding: "25px",
  borderRadius: "18px",
  background: "#0f172a",
  border: "1px solid #334155",
};

const formStyle = {
  maxWidth: "520px",
  margin: "25px auto",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#020617",
  color: "#fff",
  fontSize: "16px",
};

const studentBox = {
  maxWidth: "650px",
  margin: "25px auto 0",
  padding: "22px",
  borderRadius: "18px",
  background: "#1e293b",
  border: "1px solid #334155",
  textAlign: "left",
};

const blueButton = {
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  fontWeight: "700",
  cursor: "pointer",
};

const greenButton = {
  marginTop: "15px",
  padding: "14px 28px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  fontWeight: "800",
  cursor: "pointer",
};

const registerButton = {
  marginTop: "30px",
  padding: "14px 30px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "#ffffff",
  fontSize: "18px",
  fontWeight: "700",
  cursor: "pointer",
};

const paidText = {
  color: "#22c55e",
  fontWeight: "900",
  fontSize: "18px",
};

const noteText = {
  marginTop: "16px",
  color: "#cbd5e1",
  fontSize: "14px",
};

export default Payments;