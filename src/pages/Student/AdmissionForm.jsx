import React, { useState } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

const classOptions = [
   'Play', 'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
];

const ageOptions = Array.from({ length: 15 }, (_, i) => i + 3); // Ages 3-17

const AdmissionForm = () => {
  const [form, setForm] = useState({
    // Student Info
    studentName: '',
    dateOfBirth: '',
    age: '',
    selectedClass: '',
    studentPhoto: null,
    address: '',
    
    // Parent Info
    fatherName: '',
    fatherNID: '',
    motherName: '',
    motherNID: '',
    parentEmail: '',
    
    // Contact Info
    whatsappNumber: '',
    emergencyNumber: '',
    emergencyContactName: '',
    
    // Documents
    paymentSlip: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState(''); // 'success', 'error'

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, [fieldName]: file });
      
      // Preview for photo
      if (fieldName === 'studentPhoto') {
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validation
    if (!form.studentName || !form.selectedClass || !form.dateOfBirth) {
      setStatus('Please fill in all required fields (marked with *)');
      setStatusType('error');
      return;
    }

    if (!form.fatherName || !form.motherName) {
      setStatus('Parent information is required');
      setStatusType('error');
      return;
    }

    if (!form.whatsappNumber || !form.emergencyNumber) {
      setStatus('Contact numbers are required');
      setStatusType('error');
      return;
    }

    if (!form.paymentSlip) {
      setStatus('Payment slip is required');
      setStatusType('error');
      return;
    }

    try {
      // In a real app, you'd upload files to Firebase Storage
      // For now, we'll just save the form data
      await addDoc(collection(db, 'admissions'), {
        studentName: form.studentName,
        dateOfBirth: form.dateOfBirth,
        age: Number(form.age) || null,
        selectedClass: form.selectedClass,
        address: form.address,
        fatherName: form.fatherName,
        fatherNID: form.fatherNID,
        motherName: form.motherName,
        motherNID: form.motherNID,
        parentEmail: form.parentEmail,
        whatsappNumber: form.whatsappNumber,
        emergencyNumber: form.emergencyNumber,
        emergencyContactName: form.emergencyContactName,
        // File names would be stored; actual files go to Storage
        photoFileName: form.studentPhoto?.name || null,
        paymentSlipFileName: form.paymentSlip?.name || null,
        approved: false,
        createdAt: Timestamp.now(),
      });

      setStatusType('success');
      setStatus('✓ Admission form submitted successfully! We will review it and contact you soon.');
      
      // Reset form
      setForm({
        studentName: '', dateOfBirth: '', age: '', selectedClass: '', studentPhoto: null,
        address: '', fatherName: '', fatherNID: '', motherName: '', motherNID: '',
        parentEmail: '', whatsappNumber: '', emergencyNumber: '', emergencyContactName: '',
        paymentSlip: null,
      });
      setPhotoPreview(null);
    } catch (err) {
      console.error(err);
      setStatusType('error');
      setStatus('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Admission Form</h1>
        <p className="text-gray-600">Shahid Cadet School - Complete all fields marked with <span className="text-red-500 font-bold">*</span></p>
      </div>

      {/* Status Message */}
      {status && (
        <div className={`p-6 rounded-2xl border-l-4 flex gap-4 ${
          statusType === 'success' 
            ? 'bg-green-50 border-green-500 text-green-700' 
            : 'bg-red-50 border-red-500 text-red-700'
        }`}>
          {statusType === 'success' ? (
            <CheckCircle size={24} className="flex-shrink-0 mt-1" />
          ) : (
            <AlertCircle size={24} className="flex-shrink-0 mt-1" />
          )}
          <p className="font-bold text-lg">{status}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Student Information */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 mb-6">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
              <select
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              >
                <option value="">Select age</option>
                {ageOptions.map(age => (
                  <option key={age} value={age}>{age} years</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Class *</label>
              <select
                name="selectedClass"
                value={form.selectedClass}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              >
                <option value="">Select class</option>
                {classOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full residential address"
                rows="3"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-3">Student Photo</label>
              <div className="flex gap-4 items-start">
                {photoPreview && (
                  <img src={photoPreview} alt="Student" className="w-32 h-40 object-cover rounded-xl border-2 border-blue-300" />
                )}
                <label className="flex-1 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 transition">
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  <p className="text-sm font-bold text-gray-700">Click to upload photo</p>
                  <p className="text-xs text-gray-500">JPG or PNG, max 5MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'studentPhoto')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Parent/Guardian Information */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 mb-6">Parent/Guardian Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Father's Name *</label>
              <input
                type="text"
                name="fatherName"
                value={form.fatherName}
                onChange={handleChange}
                placeholder="Father's full name"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Father's NID</label>
              <input
                type="text"
                name="fatherNID"
                value={form.fatherNID}
                onChange={handleChange}
                placeholder="National ID number"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mother's Name *</label>
              <input
                type="text"
                name="motherName"
                value={form.motherName}
                onChange={handleChange}
                placeholder="Mother's full name"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mother's NID</label>
              <input
                type="text"
                name="motherNID"
                value={form.motherNID}
                onChange={handleChange}
                placeholder="National ID number"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Parent Email</label>
              <input
                type="email"
                name="parentEmail"
                value={form.parentEmail}
                onChange={handleChange}
                placeholder="parent@example.com"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact Information */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number *</label>
              <input
                type="tel"
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                placeholder="+880 XXXX XXXXXX"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Number *</label>
              <input
                type="tel"
                name="emergencyNumber"
                value={form.emergencyNumber}
                onChange={handleChange}
                placeholder="+880 XXXX XXXXXX"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContactName"
                value={form.emergencyContactName}
                onChange={handleChange}
                placeholder="Name of emergency contact person"
                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Documents */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-black text-blue-600 mb-6">Required Documents</h2>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Payment Slip *</label>
            <p className="text-sm text-gray-600 mb-4">Upload proof of payment for admission fees</p>
            <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition block">
              <Upload className="mx-auto mb-2 text-gray-400" size={40} />
              <p className="text-sm font-bold text-gray-700">
                {form.paymentSlip ? `✓ ${form.paymentSlip.name}` : 'Click to upload payment slip'}
              </p>
              <p className="text-xs text-gray-500">PDF, JPG or PNG, max 10MB</p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, 'paymentSlip')}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition"
          >
            Submit Admission Form
          </button>
          <button
            type="reset"
            onClick={() => {
              setForm({
                studentName: '', dateOfBirth: '', age: '', selectedClass: '', studentPhoto: null,
                address: '', fatherName: '', fatherNID: '', motherName: '', motherNID: '',
                parentEmail: '', whatsappNumber: '', emergencyNumber: '', emergencyContactName: '',
                paymentSlip: null,
              });
              setPhotoPreview(null);
            }}
            className="px-8 py-4 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
