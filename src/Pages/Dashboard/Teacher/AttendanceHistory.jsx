import { useState } from "react";
import axios from "axios";

const AttendanceHistory = () => {

  const [date, setDate] = useState("");
  const [className, setClassName] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const handleSearch = async () => {

    if (!date) {
      alert("Please select a date");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/attendance", {
        params: { date, className }
      });

      setAttendanceData(res.data);

    } catch {
      alert("No attendance found ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Attendance History
        </h2>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Class Name"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg"
          />

          <button
            onClick={handleSearch}
            className="bg-black text-white px-6 rounded-lg"
          >
            Search
          </button>

        </div>

        {/* Result */}
        {attendanceData.length === 0 && (
          <p>No attendance found</p>
        )}

        {attendanceData.map((item, index) => (
          <div key={index} className="mb-6 border p-4 rounded-lg">

            <h3 className="font-bold mb-2">
              Class: {item.className} | Subject: {item.subject}
            </h3>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {item.students.map((student, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">{student.name}</td>
                    <td className={`p-2 font-semibold ${
                      student.status === "present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {student.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AttendanceHistory;