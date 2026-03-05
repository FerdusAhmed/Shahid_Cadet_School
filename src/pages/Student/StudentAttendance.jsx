import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Search, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const StudentAttendance = () => {
  const [searchForm, setSearchForm] = useState({
    studentName: '',
    dateOfBirth: '',
    studentId: '',
  });
  const [attendance, setAttendance] = useState([]);
  const [status, setStatus] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm({ ...searchForm, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearching(true);
    setStatus('');

    try {
      // Get all admissions
      const admissionsRef = collection(db, 'admissions');
      const snapshot = await getDocs(admissionsRef);
      const allAdmissions = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

      // Filter based on criteria
      let studentAttendance = allAdmissions.filter(student => {
        const nameMatch = searchForm.studentName ?
          student.studentName?.toLowerCase().includes(searchForm.studentName.toLowerCase()) : true;
        const dobMatch = searchForm.dateOfBirth ?
          student.dateOfBirth === searchForm.dateOfBirth : true;
        const idMatch = searchForm.studentId ?
          student.docId === searchForm.studentId : true;

        return nameMatch && dobMatch && idMatch;
      });

      if (studentAttendance.length === 0) {
        setStatus('No student found matching your criteria');
        setAttendance([]);
      } else {
        // Mock attendance data (in real app, this would come from an attendance collection)
        const mockAttendance = studentAttendance.map(student => ({
          ...student,
          attendanceRecords: Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const status = Math.random() > 0.1 ? 'Present' : Math.random() > 0.5 ? 'Absent' : 'Late';
            return {
              date: date.toISOString().split('T')[0],
              status,
              subject: ['Mathematics', 'English', 'Science', 'Bangla', 'Social Studies'][Math.floor(Math.random() * 5)],
            };
          }),
        }));

        // Calculate attendance statistics
        mockAttendance.forEach(student => {
          const totalDays = student.attendanceRecords.length;
          const presentDays = student.attendanceRecords.filter(record => record.status === 'Present').length;
          const absentDays = student.attendanceRecords.filter(record => record.status === 'Absent').length;
          const lateDays = student.attendanceRecords.filter(record => record.status === 'Late').length;

          student.attendanceStats = {
            totalDays,
            presentDays,
            absentDays,
            lateDays,
            attendancePercentage: Math.round((presentDays / totalDays) * 100),
          };
        });

        setAttendance(mockAttendance);
        setStatus(`Found attendance records for ${mockAttendance.length} student(s)`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Error searching for student attendance');
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchForm({ studentName: '', dateOfBirth: '', studentId: '' });
    setAttendance([]);
    setStatus('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'Absent':
        return <XCircle className="text-red-600" size={16} />;
      case 'Late':
        return <Clock className="text-yellow-600" size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl md:text-4xl font-black mb-2">Student Attendance</h1>
        <p className="text-blue-100">View individual student attendance records</p>
      </div>

      {/* Search Form */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
          <Search size={28} className="text-blue-600" />
          Search Student Attendance
        </h2>

        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={searchForm.studentName}
                onChange={handleSearchChange}
                placeholder="Enter student name"
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition"
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
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition"
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
                placeholder="Enter student ID"
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={searching}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {searching ? 'Searching...' : 'Search Attendance'}
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </form>

        {status && (
          <div className={`mt-4 p-4 rounded-lg font-bold ${
            status.includes('Found') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}>
            {status}
          </div>
        )}
      </div>

      {/* Attendance Display */}
      {attendance.map((student) => (
        <div key={student.docId} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {/* Student Header */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-lg font-black text-gray-800">{student.studentName}</h3>
                <p className="text-gray-600">Class: {student.selectedClass}</p>
                <p className="text-gray-600">ID: {student.docId}</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-600">{student.attendanceStats.attendancePercentage}%</div>
                <p className="text-gray-600">Attendance Rate</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-blue-600">{student.attendanceStats.presentDays}</div>
                <p className="text-gray-600">Present Days</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-red-600">{student.attendanceStats.absentDays}</div>
                <p className="text-gray-600">Absent Days</p>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="space-y-4">
            <h4 className="text-xl font-black text-gray-800 mb-4">Recent Attendance Records</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {student.attendanceRecords.slice(0, 15).map((record, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{record.date}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{record.subject}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentAttendance;