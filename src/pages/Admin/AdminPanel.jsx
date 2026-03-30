import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase.config";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";

const AdminPanel = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [notice, setNotice] = useState("");
  const [teacherForm, setTeacherForm] = useState({ name: "", subject: "" });

  // Fetch students and teachers
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchTeachers = async () => {
      const querySnapshot = await getDocs(collection(db, "teachers"));
      setTeachers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudents();
    fetchTeachers();
  }, []);

  // Delete functions
  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    setStudents(students.filter(s => s.id !== id));
  };

  const deleteTeacher = async (id) => {
    await deleteDoc(doc(db, "teachers", id));
    setTeachers(teachers.filter(t => t.id !== id));
  };

  // Post notice
  const postNotice = async () => {
    if (!notice) return alert("Notice cannot be empty!");
    await addDoc(collection(db, "notices"), {
      title: "Admin Notice",
      description: notice,
      createdAt: new Date().toISOString(),
    });
    alert("Notice Posted!");
    setNotice("");
  };

  // Add teacher
  const addTeacher = async () => {
    if (!teacherForm.name || !teacherForm.subject) return alert("All fields required");
    await addDoc(collection(db, "teachers"), {
      name: teacherForm.name,
      subject: teacherForm.subject,
      joinedAt: new Date().toISOString(),
    });
    setTeachers([...teachers, teacherForm]);
    setTeacherForm({ name: "", subject: "" });
    alert("Teacher Added!");
  };

  return (
    <div className="p-8 space-y-10">

      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">Admin Management Panel</h1>

      {/* Post Notice */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Post New Notice</h2>
        <textarea
          value={notice}
          onChange={(e) => setNotice(e.target.value)}
          placeholder="Write notice here..."
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={postNotice}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Post Notice
        </button>
      </section>

      {/* Students List */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Enrolled Students</h2>
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-2">{student.fullName || student.name}</td>
                <td className="p-2">{student.class}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Teacher Management */}
      <section className="bg-white p-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Teacher Management</h2>

        {/* Add Teacher Form */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Teacher Name"
            value={teacherForm.name}
            onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Subject"
            value={teacherForm.subject}
            onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <button
            onClick={addTeacher}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Teacher
          </button>
        </div>

        {/* List Teachers */}
        <table className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{teacher.name}</td>
                <td className="p-2">{teacher.subject}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteTeacher(teacher.id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default AdminPanel;