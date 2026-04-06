import { useEffect, useState } from "react";
import axios from "axios";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/users/students/all")
      .then(res => {
        const formatted = res.data.map(student => ({
          studentId: student._id,
          name: student.name,
          status: "present"
        }));
        setStudents(formatted);
      });
  }, []);

  const handleStatusChange = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
  };

  const handleSubmit = async () => {
    if (!className || !subject || !date) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/attendance", {
        className,
        subject,
        date,
        teacherEmail: "teacher@gmail.com",
        students
      });

      alert("Attendance Saved Successfully ✅");
    } catch {
      alert("Attendance already taken for this date ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 text-black">

        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Take Attendance
        </h2>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Class Name"
            value={className}
            onChange={e => setClassName(e.target.value)}
            className="border p-3 rounded-lg outline-none text-black"
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="border p-3 rounded-lg outline-none text-black"
          />

          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border p-3 rounded-lg outline-none text-black"
          />
        </div>

        {/* Student Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-black">

            <thead>
              <tr className="bg-gray-200 text-black">
                <th className="p-3">#</th>
                <th className="p-3">Student Name</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={student.studentId} className="border-b">

                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-black">
                    {student.name}
                  </td>

                  <td className="p-3 text-center space-x-2">

                    <button
                      onClick={() => handleStatusChange(index, "present")}
                      className={`px-4 py-1 rounded-full text-white ${
                        student.status === "present"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      Present
                    </button>

                    <button
                      onClick={() => handleStatusChange(index, "absent")}
                      className={`px-4 py-1 rounded-full text-white ${
                        student.status === "absent"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      Absent
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black text-white px-8 py-3 rounded-xl shadow-md hover:bg-gray-800 transition"
          >
            {loading ? "Saving..." : "Submit Attendance"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Attendance;