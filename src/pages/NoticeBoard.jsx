import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const NoticeBoard = () => {
    const [notices, setNotices] = useState([]);

    const fetchNotices = async () => {
        const snap = await getDocs(collection(db, 'notices'));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return b.createdAt.toDate() - a.createdAt.toDate();
            }
            return 0;
        });
        setNotices(list);
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    return (
        <div className="p-6 md:p-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-black mb-6">Notice Board</h1>
            {notices.length === 0 ? (
                <p className="text-gray-500">No announcements yet.</p>
            ) : (
                <ul className="space-y-6">
                    {notices.map(n => (
                        <li key={n.id} className="bg-white p-6 rounded-2xl shadow">
                            <p className="text-gray-800">{n.text}</p>
                            <p className="text-xs text-gray-500 mt-2">{n.createdAt?.toDate().toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NoticeBoard;
