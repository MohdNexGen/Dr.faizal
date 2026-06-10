const STORAGE_KEY = "drFaizalStudents";

const starterStudents = [
  {
    id: "DFS-2026-0004",
    name: "Abrar6:22",
    email: "abrar@example.com",
    phone: "613123456",
    language: "Somali",
    course: "Somali Web Development",
    fee: "3000",
    status: "Paid",
    lessonsCompleted: 32,
    totalLessons: 40,
    currentModule: "React Components",
    studyHours: 48,
    quizScore: 90,
  },
];

export function getStudents() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterStudents));
    return starterStudents;
  }

  return JSON.parse(saved);
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function addStudent(student) {
  const students = getStudents();
  const nextNumber = students.length + 1;
  const id = `DFS-2026-${String(nextNumber).padStart(4, "0")}`;

  const newStudent = {
    id,
    name: student.name,
    email: student.email,
    phone: student.phone,
    language: student.language,
    course: student.course,
    fee: "3000",
    status: "Pending",
    lessonsCompleted: 0,
    totalLessons: 40,
    currentModule: "HTML Fundamentals",
    studyHours: 0,
    quizScore: 0,
  };

  saveStudents([...students, newStudent]);
  return newStudent;
}

export function updateStudent(updatedStudent) {
  const students = getStudents();

  const updated = students.map((s) =>
    s.id === updatedStudent.id ? updatedStudent : s
  );

  saveStudents(updated);
}