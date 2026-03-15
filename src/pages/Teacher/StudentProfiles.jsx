import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { User, BookOpen, Award } from 'lucide-react';

const StudentProfiles = ({ assignedClass }) => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                if (!assignedClass) return;
                const q = query(
                    collection(db, 'admissions'),
                    where('selectedClass', '==', assignedClass),
                    where('approved', '==', true)
                );
                const snapshot = await getDocs(q);
                const studentList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setStudents(studentList);
            } catch (err) {
                console.error('Error fetching students:', err);
            }
        };
        fetchStudents();
    }, [assignedClass]);

    return (
        <div className="space-y-8">
            {/* Students List */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <User size={24} className="text-blue-600" /> Students in Class {assignedClass}
                </h2>

                {students.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No approved students in this class yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {students.map(student => (
                            <div
                                key={student.id}
                                onClick={() => setSelectedStudent(student)}
                                className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200 cursor-pointer hover:shadow-lg transition transform hover:scale-105"
                            >
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">
                                    {student.studentName.charAt(0)}
                                </div>
                                <h3 className="text-lg font-black text-slate-800">{student.studentName}</h3>
                                <p className="text-sm text-gray-600 mb-3">ID: {student.id}</p>
                                <div className="space-y-1 text-xs text-gray-600">
                                    <p><strong>DOB:</strong> {student.dateOfBirth}</p>
                                    <p><strong>Class:</strong> {student.selectedClass}</p>
                                    <p><strong>Status:</strong> <span className="text-green-600 font-bold">Approved</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detailed Student Profile */}
            {selectedStudent && (
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                            <User size={24} className="text-blue-600" /> {selectedStudent.studentName}'s Profile
                        </h2>
                        <button
                            onClick={() => setSelectedStudent(null)}
                            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Student Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <BookOpen size={20} className="text-blue-600" /> Student Information
                            </h3>
                            <div className="bg-blue-50 p-4 rounded-xl space-y-2 text-sm">
                                <p><strong>Student ID:</strong> {selectedStudent.id}</p>
                                <p><strong>Name:</strong> {selectedStudent.studentName}</p>
                                <p><strong>Date of Birth:</strong> {selectedStudent.dateOfBirth}</p>
                                <p><strong>Age:</strong> {selectedStudent.age} years</p>
                                <p><strong>Class:</strong> {selectedStudent.selectedClass}</p>
                                <p><strong>Address:</strong> {selectedStudent.address}</p>
                            </div>
                        </div>

                        {/* Parent Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <User size={20} className="text-green-600" /> Guardian Information
                            </h3>
                            <div className="bg-green-50 p-4 rounded-xl space-y-2 text-sm">
                                <p><strong>Father:</strong> {selectedStudent.fatherName}</p>
                                <p><strong>Father NID:</strong> {selectedStudent.fatherNID}</p>
                                <p><strong>Mother:</strong> {selectedStudent.motherName}</p>
                                <p><strong>Mother NID:</strong> {selectedStudent.motherNID}</p>
                                <p><strong>Email:</strong> {selectedStudent.parentEmail}</p>
                                <p><strong>WhatsApp:</strong> {selectedStudent.whatsappNumber}</p>
                                <p><strong>Emergency:</strong> {selectedStudent.emergencyNumber}</p>
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="md:col-span-2 space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Award size={20} className="text-purple-600" /> Academic & Attendance
                            </h3>
                            <div className="bg-purple-50 p-4 rounded-xl space-y-3 text-sm">
                                <p className="text-gray-700">
                                    <strong>Admission Status:</strong> <span className="text-green-600 font-bold">Approved</span>
                                </p>
                                <p className="text-gray-700">
                                    <strong>Admission Date:</strong> {selectedStudent.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                                </p>
                                <p className="text-gray-700 text-xs">
                                    You can update attendance, marks, and other academic records through the attendance marking section.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setSelectedStudent(null)}
                        className="mt-6 px-6 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition"
                    >
                        Close Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentProfiles;
