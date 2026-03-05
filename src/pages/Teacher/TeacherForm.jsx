import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';

const TeacherForm = () => {
  const [form, setForm] = useState({ name: '', subject: '', email: '' });
  const [status, setStatus] = useState(null);
  const [approvedTeachers, setApprovedTeachers] = useState([]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

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
    if (!form.name || !form.email) {
      setStatus('Name and email are required');
      return;
    }
    try {
      await addDoc(collection(db, 'teachers'), {
        ...form,
        approved: false,
        createdAt: Timestamp.now(),
      });
      setStatus('Teacher info submitted for review');
      setForm({ name: '', subject: '', email: '' });
      fetchTeachers();
    } catch (err) {
      console.error(err);
      setStatus('Error submitting');
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTeachers();
    };
    load();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Teacher Registration</h1>
        {status && <p className="mb-4 text-red-500">{status}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Approved Teachers</h2>
        {approvedTeachers.length === 0 ? (
          <p className="text-gray-500">No teachers approved yet.</p>
        ) : (
          <ul className="list-disc ml-6">
            {approvedTeachers.map(t => (
              <li key={t.id}>
                {t.name} - {t.subject || 'N/A'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeacherForm;