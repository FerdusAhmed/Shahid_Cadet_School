import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'students'), where('approved', '==', true));
      const snap = await getDocs(q);
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setStudents(list);
    };
    fetch();
  }, []);

  // group by class
  const grouped = students.reduce((acc, s) => {
    const cls = s.selectedClass || 'Unknown';
    if (!acc[cls]) acc[cls] = [];
    acc[cls].push(s);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enrolled Students</h2>
      {students.length === 0 ? (
        <p>No approved students yet.</p>
      ) : (
        Object.keys(grouped).map(cls => (
          <div key={cls} className="mb-6">
            <h3 className="text-lg font-semibold">Class {cls}</h3>
            <table className="w-full table-auto border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Age</th>
                </tr>
              </thead>
              <tbody>
                {grouped[cls].map(s => (
                  <tr key={s.id}>
                    <td className="p-2 border">{s.name}</td>
                    <td className="p-2 border">{s.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default Students;