import React, { useState } from 'react';
import { Search, X, Award, Calendar, CreditCard, User, BookOpen, TrendingUp } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

const StudentDashboard = () => {
    const [searchForm, setSearchForm] = useState({
        studentName: '',
        dateOfBirth: '',
        studentId: '',
    });
    const [studentData, setStudentData] = useState(null);
    const [searchStatus, setSearchStatus] = useState('');
    const [searching, setSearching] = useState(false);

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchForm({ ...searchForm, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearching(true);
        setSearchStatus('');
        setStudentData(null);

        try {
            // Get all admissions
            const admissionsRef = collection(db, 'admissions');
            const snapshot = await getDocs(admissionsRef);
            const allAdmissions = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

            // Filter based on criteria
            let results = allAdmissions.filter(student => {
                const nameMatch = searchForm.studentName ?
                    student.studentName?.toLowerCase().includes(searchForm.studentName.toLowerCase()) : true;
                const dobMatch = searchForm.dateOfBirth ?
                    student.dateOfBirth === searchForm.dateOfBirth : true;
                const idMatch = searchForm.studentId ?
                    student.docId === searchForm.studentId : true;

                return nameMatch && dobMatch && idMatch;
            });

            if (results.length === 0) {
                setSearchStatus('No student found matching your criteria');
            } else if (results.length > 1) {
                setSearchStatus('Multiple students found. Please provide more specific information.');
            } else {
                const student = results[0];

                // Generate mock academic data
                const examResults = [
                    { subject: 'Mathematics', marks: Math.floor(Math.random() * 40) + 60, total: 100, grade: 'A' },
                    { subject: 'English', marks: Math.floor(Math.random() * 40) + 60, total: 100, grade: 'A' },
                    { subject: 'Science', marks: Math.floor(Math.random() * 40) + 60, total: 100, grade: 'A' },
                    { subject: 'Bangla', marks: Math.floor(Math.random() * 40) + 60, total: 100, grade: 'A' },
                    { subject: 'Social Studies', marks: Math.floor(Math.random() * 40) + 60, total: 100, grade: 'A' },
                ];

                const attendanceRecords = Array.from({ length: 30 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    const status = Math.random() > 0.1 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Late';
                    return {
                        date: date.toISOString().split('T')[0],
                        status,
                        subject: ['Mathematics', 'English', 'Science', 'Bangla', 'Social Studies'][Math.floor(Math.random() * 5)],
                    };
                });

                const paymentHistory = [
                    { id: 'PAY001', type: 'Admission Fee', amount: 5000, dueDate: '2024-01-15', paidDate: '2024-01-10', status: 'Paid', method: 'Bank Transfer' },
                    { id: 'PAY002', type: 'Monthly Tuition', amount: 3000, dueDate: '2024-02-01', paidDate: '2024-02-05', status: 'Paid', method: 'Online Payment' },
                    { id: 'PAY003', type: 'Monthly Tuition', amount: 3000, dueDate: '2024-03-01', paidDate: null, status: 'Pending', method: null },
                    { id: 'PAY004', type: 'Exam Fee', amount: 1500, dueDate: '2024-03-15', paidDate: '2024-03-12', status: 'Paid', method: 'Cash' },
                    { id: 'PAY005', type: 'Monthly Tuition', amount: 3000, dueDate: '2024-04-01', paidDate: null, status: 'Overdue', method: null },
                ];

                // Calculate statistics
                const totalMarks = examResults.reduce((sum, exam) => sum + exam.marks, 0);
                const percentage = Math.round((totalMarks / 500) * 100);
                const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'D';

                const presentDays = attendanceRecords.filter(r => r.status === 'Present').length;
                const absentDays = attendanceRecords.filter(r => r.status === 'Absent').length;
                const lateDays = attendanceRecords.filter(r => r.status === 'Late').length;
                const attendanceRate = Math.round((presentDays / attendanceRecords.length) * 100);

                const totalPaid = paymentHistory.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
                const totalPending = paymentHistory.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);
                const totalOverdue = paymentHistory.filter(p => p.status === 'Overdue').reduce((sum, p) => sum + p.amount, 0);

                setStudentData({
                    ...student,
                    academicData: {
                        examResults,
                        totalMarks,
                        percentage,
                        grade,
                        attendanceRecords,
                        presentDays,
                        absentDays,
                        lateDays,
                        attendanceRate,
                        paymentHistory,
                        totalPaid,
                        totalPending,
                        totalOverdue,
                    }
                });
                setSearchStatus('Student record found successfully!');
            }
        } catch (err) {
            console.error(err);
            setSearchStatus('Error searching for student records');
        } finally {
            setSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchForm({ studentName: '', dateOfBirth: '', studentId: '' });
        setStudentData(null);
        setSearchStatus('');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Present':
                return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
            case 'Absent':
                return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
            case 'Late':
                return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
            case 'Paid':
                return <div className="w-3 h-3 bg-green-500 rounded-full"></div>;
            case 'Pending':
                return <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>;
            case 'Overdue':
                return <div className="w-3 h-3 bg-red-500 rounded-full"></div>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl mb-8">
                <h1 className="text-3xl md:text-4xl font-black mb-2">My Academic Record</h1>
                <p className="text-blue-100">Access your complete academic information, attendance, and payment history</p>
            </div>

            {/* Search Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <Search className="text-blue-600" size={28} />
                    <h2 className="text-2xl font-black text-gray-800">Find Your Record</h2>
                </div>

                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Student Name *</label>
                            <input
                                type="text"
                                name="studentName"
                                value={searchForm.studentName}
                                onChange={handleSearchChange}
                                placeholder="Enter your full name"
                                className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={searchForm.dateOfBirth}
                                onChange={handleSearchChange}
                                className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Student ID (Optional)</label>
                            <input
                                type="text"
                                name="studentId"
                                value={searchForm.studentId}
                                onChange={handleSearchChange}
                                placeholder="Enter student ID if known"
                                className="w-full border-2 border-gray-300 p-4 rounded-xl focus:border-blue-500 focus:outline-none transition text-lg"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={searching}
                            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center gap-2"
                        >
                            {searching ? 'Searching...' : (
                                <>
                                    <Search size={20} />
                                    Search My Record
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="px-8 py-4 bg-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-400 transition flex items-center gap-2"
                        >
                            <X size={20} />
                            Clear
                        </button>
                    </div>
                </form>

                {searchStatus && (
                    <div className={`mt-6 p-4 rounded-xl font-bold text-center ${
                        searchStatus.includes('found successfully')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                    }`}>
                        {searchStatus}
                    </div>
                )}
            </div>

            {/* Student Dashboard */}
            {studentData && (
                <div className="space-y-8">
                    {/* Student Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                    <User size={32} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black">{studentData.studentName}</h2>
                                    <p className="text-blue-100 text-lg">Class {studentData.selectedClass} • ID: {studentData.docId}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-black">{studentData.academicData.percentage}%</div>
                                    <div className="text-sm text-blue-100">Overall Grade: {studentData.academicData.grade}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black">{studentData.academicData.attendanceRate}%</div>
                                    <div className="text-sm text-blue-100">Attendance</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black">৳{studentData.academicData.totalPaid.toLocaleString()}</div>
                                    <div className="text-sm text-blue-100">Total Paid</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Academic Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Exam Results Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="text-green-600" size={24} />
                                <h3 className="text-xl font-black text-gray-800">Exam Results</h3>
                            </div>
                            <div className="space-y-3">
                                {studentData.academicData.examResults.map((exam, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-gray-700">{exam.subject}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-green-600">{exam.marks}/100</span>
                                            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">{exam.grade}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between items-center font-black text-lg">
                                        <span>Total Score:</span>
                                        <span className="text-green-600">{studentData.academicData.totalMarks}/500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Attendance Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <Calendar className="text-blue-600" size={24} />
                                <h3 className="text-xl font-black text-gray-800">Attendance Record</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Present Days</span>
                                    <span className="font-bold text-green-600">{studentData.academicData.presentDays}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Absent Days</span>
                                    <span className="font-bold text-red-600">{studentData.academicData.absentDays}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Late Days</span>
                                    <span className="font-bold text-yellow-600">{studentData.academicData.lateDays}</span>
                                </div>
                                <div className="border-t pt-3 mt-3">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-blue-600">{studentData.academicData.attendanceRate}%</div>
                                        <div className="text-sm text-gray-600">Attendance Rate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment History Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3 mb-4">
                                <CreditCard className="text-purple-600" size={24} />
                                <h3 className="text-xl font-black text-gray-800">Payment History</h3>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700">Total Paid</span>
                                    <span className="font-bold text-green-600">৳{studentData.academicData.totalPaid.toLocaleString()}</span>
                                </div>
                                {studentData.academicData.totalPending > 0 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Pending</span>
                                        <span className="font-bold text-yellow-600">৳{studentData.academicData.totalPending.toLocaleString()}</span>
                                    </div>
                                )}
                                {studentData.academicData.totalOverdue > 0 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Overdue</span>
                                        <span className="font-bold text-red-600">৳{studentData.academicData.totalOverdue.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="border-t pt-3 mt-3">
                                    <div className="text-center">
                                        <div className="text-sm text-gray-600">Last Payment</div>
                                        <div className="font-bold text-purple-600">
                                            {studentData.academicData.paymentHistory.filter(p => p.status === 'Paid').pop()?.paidDate || 'N/A'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Records */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recent Attendance */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                <Calendar className="text-blue-600" size={20} />
                                Recent Attendance (Last 15 Days)
                            </h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {studentData.academicData.attendanceRecords.slice(0, 15).map((record, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            {getStatusIcon(record.status)}
                                            <div>
                                                <div className="font-semibold text-gray-800">{record.date}</div>
                                                <div className="text-sm text-gray-600">{record.subject}</div>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                            record.status === 'Present' ? 'bg-green-100 text-green-700' :
                                            record.status === 'Absent' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
                                <CreditCard className="text-purple-600" size={20} />
                                Payment Details
                            </h3>
                            <div className="space-y-3 max-h-80 overflow-y-auto">
                                {studentData.academicData.paymentHistory.map((payment, index) => (
                                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <div className="font-semibold text-gray-800">{payment.type}</div>
                                                <div className="text-sm text-gray-600">ID: {payment.id}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-purple-600">৳{payment.amount.toLocaleString()}</div>
                                                <div className="flex items-center gap-1">
                                                    {getStatusIcon(payment.status)}
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                        payment.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                        {payment.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Due: {payment.dueDate} {payment.paidDate && `• Paid: ${payment.paidDate}`}
                                            {payment.method && ` • ${payment.method}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;