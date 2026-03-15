import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Users, BookOpen, Award, Phone, Mail, MapPin, UserPlus } from 'lucide-react';

const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const q = query(collection(db, 'teachers'), where('approved', '==', true));
        const snapshot = await getDocs(q);
        const teachersList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTeachers(teachersList);
      } catch (err) {
        console.error('Error fetching teachers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teachers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl shadow-xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">Our Teaching Staff</h1>
            <p className="text-blue-100">Meet our qualified and experienced teachers</p>
          </div>
          <Link
            to="/teacher-registration"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition flex items-center gap-2"
          >
            <UserPlus size={20} />
            Join Our Team
          </Link>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {teachers.map(teacher => (
          <div
            key={teacher.id}
            onClick={() => setSelectedTeacher(teacher)}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 mx-auto">
              {teacher.name.charAt(0)}
            </div>
            <h3 className="text-xl font-black text-slate-800 text-center mb-2">{teacher.name}</h3>
            <p className="text-center text-blue-600 font-bold mb-3">{teacher.subject}</p>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Award size={16} />
                <span className="font-medium">Qualification:</span> {teacher.qualification}
              </p>
              {teacher.experience && (
                <p className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span className="font-medium">Experience:</span> {teacher.experience}
                </p>
              )}
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <span className="font-medium">Email:</span> {teacher.email}
              </p>
              {teacher.phone && (
                <p className="flex items-center gap-2">
                  <Phone size={16} />
                  <span className="font-medium">Phone:</span> {teacher.phone}
                </p>
              )}
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
              View Full Profile
            </button>
          </div>
        ))}
      </div>

      {/* Teacher Count */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center">
        <div className="text-4xl font-black text-blue-600 mb-2">{teachers.length}</div>
        <p className="text-gray-600 font-bold">Qualified Teachers</p>
      </div>

      {/* Detailed Teacher Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-slate-800">Teacher Profile</h2>
              <button
                onClick={() => setSelectedTeacher(null)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Picture & Basic Info */}
              <div className="text-center md:text-left">
                <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mb-4 mx-auto md:mx-0">
                  {selectedTeacher.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">{selectedTeacher.name}</h3>
                <p className="text-xl text-blue-600 font-bold mb-4">{selectedTeacher.subject} Teacher</p>
              </div>

              {/* Detailed Information */}
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                      <Award size={18} /> Qualification
                    </h4>
                    <p className="text-slate-700">{selectedTeacher.qualification}</p>
                  </div>

                  {selectedTeacher.experience && (
                    <div className="bg-green-50 p-4 rounded-xl">
                      <h4 className="font-bold text-green-600 mb-2 flex items-center gap-2">
                        <BookOpen size={18} /> Experience
                      </h4>
                      <p className="text-slate-700">{selectedTeacher.experience}</p>
                    </div>
                  )}

                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-bold text-purple-600 mb-2 flex items-center gap-2">
                      <Mail size={18} /> Email
                    </h4>
                    <p className="text-slate-700">{selectedTeacher.email}</p>
                  </div>

                  {selectedTeacher.phone && (
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <h4 className="font-bold text-orange-600 mb-2 flex items-center gap-2">
                        <Phone size={18} /> Phone
                      </h4>
                      <p className="text-slate-700">{selectedTeacher.phone}</p>
                    </div>
                  )}
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-600 mb-2">About Our Teacher</h4>
                  <p className="text-slate-700">
                    {selectedTeacher.name} is a qualified {selectedTeacher.subject.toLowerCase()} teacher at Shahid Cadet School.
                    {selectedTeacher.experience && ` With ${selectedTeacher.experience} of teaching experience,`}
                    they are committed to providing quality education to our students.
                  </p>
                </div>

                {/* Registration Date */}
                {selectedTeacher.createdAt && (
                  <div className="text-sm text-gray-500">
                    <strong>Joined:</strong> {selectedTeacher.createdAt.toDate().toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="flex-1 bg-gray-600 text-white py-3 rounded-xl font-bold hover:bg-gray-700 transition"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersList;