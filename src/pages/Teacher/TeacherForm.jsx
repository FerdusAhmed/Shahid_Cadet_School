import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/firebase.config';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { Upload, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const TeacherForm = () => {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState('');
  const [approvedTeachers, setApprovedTeachers] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const fetchTeachers = async () => {
    const q = collection(db, 'teachers');
    const snap = await getDocs(q);
    const list = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(t => t.approved);
    setApprovedTeachers(list);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus(null);
    setStatusType('');
    
    if (!form.name || !form.email || !form.qualification) {
      setStatus('Name, email, and qualification are required');
      setStatusType('error');
      return;
    }
    
    try {
      await addDoc(collection(db, 'teachers'), {
        name: form.name,
        subject: form.subject,
        email: form.email,
        phone: form.phone,
        qualification: form.qualification,
        experience: form.experience,
        photoFileName: form.photo?.name || null,
        approved: false,
        createdAt: Timestamp.now(),
      });
      setStatusType('success');
      setStatus('✓ Teacher info submitted for review and approval!');
      setForm({ name: '', subject: '', email: '', phone: '', qualification: '', experience: '', photo: null });
      setPhotoPreview(null);
      fetchTeachers();
    } catch (err) {
      console.error(err);
      setStatusType('error');
      setStatus('Error submitting. Please try again.');
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTeachers();
    };
    load();
  }, []);

  return (
    <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-4">
        <Link to="/teachers" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
          <ArrowLeft size={20} />
          <span className="font-bold">Back to Teachers</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Teacher Registration</h1>
        <p className="text-gray-600">Complete your profile to apply as a teacher</p>
      </div>

      {/* Status Message */}
      {status && (
        <div className={`p-6 rounded-2xl border-l-4 flex gap-4 ${
          statusType === 'success'
            ? 'bg-green-50 border-green-500 text-green-700'
            : 'bg-red-50 border-red-500 text-red-700'
        }`}>
          {statusType === 'success' ? (
            <CheckCircle size={24} className="shrink-0 mt-1" />
          ) : (
            <AlertCircle size={24} className="shrink-0 mt-1" />
          )}
          <p className="font-bold text-lg">{status}</p>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 mb-6">Teacher Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Photo Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-4">Photo *</label>
              <div className="flex gap-6">
                <div className="relative">
                  <label htmlFor="photo-upload" className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="text-center">
                        <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                        <span className="text-xs text-gray-500">Upload Photo</span>
                      </div>
                    )}
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="e.g., Mathematics, English"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Qualification *</label>
              <input
                type="text"
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="e.g., M.Sc Physics, B.A English"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-bold text-gray-700 mb-2">Years of Experience</label>
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                placeholder="e.g., 5 years"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg"
        >
          Submit for Approval
        </button>
      </form>

      {/* Approved Teachers */}
      {approvedTeachers.length > 0 && (
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-slate-800 mb-6">Approved Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedTeachers.map(t => (
              <div key={t.id} className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {t.name.charAt(0)}
                </div>
                <h3 className="text-lg font-black text-slate-800">{t.name}</h3>
                <p className="text-sm font-bold text-blue-600 mb-3">{t.subject}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Qualification:</strong> {t.qualification}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Experience:</strong> {t.experience || 'N/A'}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Email:</strong> {t.email}</p>
                {t.phone && <p className="text-xs text-gray-600"><strong>Phone:</strong> {t.phone}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherForm;