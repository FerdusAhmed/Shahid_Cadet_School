import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { UserCheck, Save, Briefcase, Users, BookOpen } from "lucide-react";
import StudentProfiles from "./StudentProfiles";
import { db } from '../../firebase/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const classOptions = [
    'Play', 'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
];

const TeacherPanel = () => {
    const user = useContext(AuthContext)?.user;
    
    const [selectedClass, setSelectedClass] = useState("1");
    const [attendance, setAttendance] = useState({});
    const [students, setStudents] = useState([]);
    const [teacherInfo, setTeacherInfo] = useState(null);

    // Get the current teacher's assigned class (find which class they teach)
    useEffect(() => {
        const fetchTeacherData = async () => {
            if (!user?.email) return;
            
            try {
                // Find teacher by email
                const teachersRef = collection(db, 'teachers');
                const q = query(teachersRef, where('email', '==', user.email), where('approved', '==', true));
                const snapshot = await getDocs(q);
                
                if (!snapshot.empty) {
                    const teacherData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
                    setTeacherInfo(teacherData);
                    
                    // For now, assign class based on subject or just use a default
                    // In a real app, you'd have a teacher-class assignment table
                    setSelectedClass(teacherData.assignedClass || "1");
                }
            } catch (err) {
                console.error('Error fetching teacher data:', err);
            }
        };
        
        fetchTeacherData();
    }, [user]);

    // Fetch students for selected class
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const q = query(
                    collection(db, 'admissions'),
                    where('selectedClass', '==', selectedClass),
                    where('approved', '==', true)
                );
                const snapshot = await getDocs(q);
                const studentList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setStudents(studentList);
                
                // Initialize attendance state
                const attendanceState = {};
                studentList.forEach(student => {
                    attendanceState[student.id] = false; // Default to absent
                });
                setAttendance(attendanceState);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };
        
        fetchStudents();
    }, [selectedClass]);

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
                            {teacherInfo?.name || user?.displayName || "Teacher"}
                        </h1>
                        <div className="flex items-center gap-2 mt-2 text-blue-600 font-bold">
                            <Briefcase size={18} /> {teacherInfo?.subject || "Subject Teacher"}
                        </div>
                        <p className="text-gray-500 mt-1">
                            {teacherInfo?.qualification && `Qualification: ${teacherInfo.qualification}`}
                        </p>
                        {teacherInfo && (
                            <div className="mt-2 text-sm text-gray-600">
                                <p><strong>Email:</strong> {teacherInfo.email}</p>
                                {teacherInfo.phone && <p><strong>Phone:</strong> {teacherInfo.phone}</p>}
                                {teacherInfo.experience && <p><strong>Experience:</strong> {teacherInfo.experience}</p>}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-6">
                        <div className="text-center">
                            <p className="text-4xl font-black text-blue-600">{students.length}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Students in Class</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl font-black text-green-600">
                                {Object.values(attendance).filter(Boolean).length}
                            </p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Present Today</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Class Selection */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-blue-600" /> Select Class to Manage
                </h2>
                <div className="flex flex-wrap gap-3">
                    {classOptions.map(cls => (
                        <button
                            key={cls}
                            onClick={() => setSelectedClass(cls)}
                            className={`p-4 rounded-xl font-bold transition-all text-center ${
                                selectedClass === cls
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-gray-100 text-slate-700 hover:bg-blue-50'
                            }`}
                        >
                            <div className="text-lg">Class {cls}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Class Teacher Info */}
            {currentClassTeacher && (
                <div className="bg-linear-to-r from-blue-50 to-blue-100 p-8 rounded-3xl border-l-4 border-blue-600">
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

                {students.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No approved students in this class</p>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                                    <tr>
                                        <th className="p-4">Student ID</th>
                                        <th className="p-4">Student Name</th>
                                        <th className="p-4">Age</th>
                                        <th className="p-4">Parent Contact</th>
                                        <th className="p-4 text-center">Present</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {students.map((student) => (
                                        <tr key={student.id} className="hover:bg-blue-50/50 transition">
                                            <td className="p-4 font-bold text-blue-600">{student.id}</td>
                                            <td className="p-4 font-medium text-slate-700">{student.studentName}</td>
                                            <td className="p-4 text-gray-600">{student.age || 'N/A'} years</td>
                                            <td className="p-4 text-gray-600">{student.whatsappNumber || student.parentEmail}</td>
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

                        <div className="mt-6 flex justify-between items-center">
                            <div className="text-sm text-gray-600">
                                <strong>Present:</strong> {Object.values(attendance).filter(Boolean).length} / {students.length}
                            </div>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg"
                            >
                                <Save size={18} className="inline mr-2" />
                                Save Attendance
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Class Routine */}
            {assignedClass && (
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <BookOpen size={24} className="text-blue-600" /> Class {assignedClass} Routine
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
                                <tr>
                                    <th className="p-4">Time</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Teacher</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {(classRoutines[assignedClass] || []).map((slot, index) => (
                                    <tr key={index} className="hover:bg-blue-50/50 transition">
                                        <td className="p-4 font-bold text-blue-600">{slot.time}</td>
                                        <td className="p-4 font-medium text-slate-700">{slot.subject}</td>
                                        <td className="p-4 text-gray-600">{slot.teacher}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Student Profiles Component */}
            <StudentProfiles assignedClass={selectedClass} />
        </div>
    );
};

export default TeacherPanel;