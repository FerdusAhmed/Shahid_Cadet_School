import { useState, useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { UserCheck, Save, Briefcase, Users, BookOpen } from "lucide-react";

const classOptions = [
    'Play', 'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
];

// Class teachers mapping - each class has one assigned teacher
const classTeachersMap = {
    "Play": { id: "ct-01", name: "Mr. Amin Khan", email: "amin.khan@scsc.edu.bd", phone: "+880 17 4444 0002" },
    "Nursery": { id: "ct-02", name: "Mrs. Sofia Rahman", email: "sofia.r@scsc.edu.bd", phone: "+880 17 4444 0003" },
    "1": { id: "ct-03", name: "Mr. Raved Hassan", email: "raved@scsc.edu.bd", phone: "+880 17 4444 0004" },
    "2": { id: "ct-04", name: "Mrs. Laila Ahmed", email: "laila@scsc.edu.bd", phone: "+880 17 4444 0005" },
    "3": { id: "ct-05", name: "Mr. Karim Ahmed", email: "karim@scsc.edu.bd", phone: "+880 17 4444 0006" },
    "4": { id: "ct-06", name: "Mrs. Amina Begum", email: "amina@scsc.edu.bd", phone: "+880 17 4444 0007" },
    "5": { id: "ct-07", name: "Mr. Rayed Hassan", email: "rayed@scsc.edu.bd", phone: "+880 17 4444 0008" },
    "6": { id: "ct-08", name: "Ms. Sara Ahmed", email: "sara@scsc.edu.bd", phone: "+880 17 4444 0009" },
    "7": { id: "ct-09", name: "Mr. Bilal Khan", email: "bilal@scsc.edu.bd", phone: "+880 17 4444 0010" },
    "8": { id: "ct-10", name: "Mrs. Zara Rahman", email: "zara@scsc.edu.bd", phone: "+880 17 4444 0011" },
    "9": { id: "ct-11", name: "Mr. Hassan Ali", email: "hassan@scsc.edu.bd", phone: "+880 17 4444 0012" },
    "10": { id: "ct-12", name: "Ms. Sofia Khan", email: "sofia@scsc.edu.bd", phone: "+880 17 4444 0013" },
};

const studentsByClass = {
    "Play": [
        { id: "p-01", name: "Ali Hassan", age: 4 },
        { id: "p-02", name: "Zara Khan", age: 4 },
    ],
    "Nursery": [
        { id: "n-01", name: "Ferdus Ahmed", age: 5 },
        { id: "n-02", name: "Karim Ullah", age: 5 },
    ],
    "1": [
        { id: "1-01", name: "Rayed Hassan", age: 6 },
        { id: "1-02", name: "Sofia Rahman", age: 6 },
        { id: "1-03", name: "Amin Khan", age: 6 },
    ],
    "2": [
        { id: "2-01", name: "Noor Jahan", age: 7 },
        { id: "2-02", name: "Hassan Ali", age: 7 },
    ],
    "3": [
        { id: "3-01", name: "Sara Ahmed", age: 8 },
        { id: "3-02", name: "Bilal Khan", age: 8 },
    ],
};

const TeacherPanel = () => {
    const user = useContext(AuthContext)?.user;
    
    const [selectedClass, setSelectedClass] = useState("1");
    const [attendance, setAttendance] = useState({});

    // Get the current teacher's assigned class (find which class they teach)
    const currentTeacher = Object.entries(classTeachersMap).find(([_, teacher]) =>
        teacher.name === user?.displayName || teacher.email.includes((user?.email || '').split('@')[0])
    );
    
    const assignedClass = currentTeacher ? currentTeacher[0] : null;
    const currentClassTeacher = classTeachersMap[selectedClass];
    const currentStudents = studentsByClass[selectedClass] || [];

    const handleAttendanceChange = (studentId) => {
        setAttendance(prev => ({ ...prev, [studentId]: !prev[studentId] }));
    };

    const handleSave = () => {
        console.log(`Attendance saved for Class ${selectedClass}:`, attendance);
        alert(`Attendance for Class ${selectedClass} saved successfully!`);
        setAttendance({});
    };

    return (
        <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
            {/* Teacher Info Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                            {user?.displayName || "Teacher Name"}
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-blue-600 font-bold">
                            <Briefcase size={18} /> Class Teacher - {assignedClass || "Not Assigned"}
                        </div>
                        <p className="text-gray-500 mt-1">
                            {assignedClass ? `Teaching Class ${assignedClass}` : 'Waiting for assignment'}
                        </p>
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-black text-blue-600">{classOptions.length}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Classes</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-green-600">
                                {Object.values(studentsByClass).reduce((sum, arr) => sum + arr.length, 0)}
                            </p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Students</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Class Selection - Only show assigned class or all for admin */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-blue-600" /> Select Class for Attendance
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {classOptions.map(cls => (
                        <button
                            key={cls}
                            onClick={() => {
                                setSelectedClass(cls);
                                setAttendance({});
                            }}
                            className={`p-4 rounded-xl font-bold transition-all text-center ${
                                selectedClass === cls
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-gray-100 text-slate-700 hover:bg-blue-50'
                            }`}
                        >
                            <div className="text-lg">{cls}</div>
                            <div className="text-xs mt-1 opacity-75">
                                {studentsByClass[cls]?.length || 0} students
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Class Teacher Info */}
            {currentClassTeacher && (
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-3xl border-l-4 border-blue-600">
                    <h3 className="text-lg font-black text-blue-600 mb-4 flex items-center gap-2">
                        <Users size={20} /> Class Teacher Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Class Teacher</p>
                            <p className="text-xl font-bold text-slate-800 mt-1">{currentClassTeacher.name}</p>
                        </div>
                        <div className="space-y-2 text-sm text-slate-700">
                            <p><strong>Email:</strong> {currentClassTeacher.email}</p>
                            <p><strong>Phone:</strong> {currentClassTeacher.phone}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Attendance Marking */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <UserCheck size={24} className="text-blue-600" />
                    Mark Daily Attendance - Class {selectedClass}
                </h3>

                {currentStudents.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No students in this class</p>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                                    <tr>
                                        <th className="p-4">Student ID</th>
                                        <th className="p-4">Student Name</th>
                                        <th className="p-4">Age</th>
                                        <th className="p-4 text-center">Present</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {currentStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 font-bold text-blue-600">{student.id}</td>
                                            <td className="p-4 font-medium text-slate-700">{student.name}</td>
                                            <td className="p-4 text-gray-600">{student.age} years</td>
                                            <td className="p-4 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={!!attendance[student.id]}
                                                    onChange={() => handleAttendanceChange(student.id)}
                                                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Attendance Stats */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-sm font-bold text-blue-600">
                                Present: <span className="text-lg">{Object.values(attendance).filter(Boolean).length}</span> / <span>{currentStudents.length}</span>
                                ({Math.round((Object.values(attendance).filter(Boolean).length / currentStudents.length || 0) * 100)}%)
                            </p>
                        </div>

                        <button
                            onClick={handleSave}
                            className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <Save size={20} /> Save Attendance for Class {selectedClass}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeacherPanel;