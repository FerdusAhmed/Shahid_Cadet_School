import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Trash2, Megaphone, MapPin, Send, UserPlus, UserMinus, Users, BookOpen, Plus, Edit } from "lucide-react";
import { db } from '../../firebase/firebase.config';
import { collection, addDoc, getDocs, Timestamp, updateDoc, doc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const classOptions = [
   'Play', 'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
];

const AdminPanel = () => {
    const user = useContext(AuthContext)?.user;
    const [noticeText, setNoticeText] = useState('');
    const [notices, setNotices] = useState([]);
    const [pendingAdmissions, setPendingAdmissions] = useState([]);
    const [approvedStudents, setApprovedStudents] = useState([]);
    const [pendingTeachers, setPendingTeachers] = useState([]);
    const [approvedTeachers, setApprovedTeachers] = useState([]);
    const [selectedClass, setSelectedClass] = useState('All');
    const [showAddStudentForm, setShowAddStudentForm] = useState(false);
    const [showAddTeacherForm, setShowAddTeacherForm] = useState(false);
    const [newStudent, setNewStudent] = useState({
        studentName: '', dateOfBirth: '', selectedClass: '', address: '',
        fatherName: '', motherName: '', parentEmail: '', whatsappNumber: ''
    });
    const [newTeacher, setNewTeacher] = useState({
        name: '', email: '', subject: '', phone: '', qualification: '', experience: ''
    });

    const fetchNotices = async () => {
        const snap = await getDocs(collection(db, 'notices'));
        const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // sort by newest first if timestamp available
        list.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return b.createdAt.toDate() - a.createdAt.toDate();
            }
            return 0;
        });
        setNotices(list);
    };

    const fetchPending = async () => {
        const admSnap = await getDocs(collection(db, 'admissions'));
        const allAdmissions = admSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPendingAdmissions(allAdmissions.filter(a => !a.approved));
        setApprovedStudents(allAdmissions.filter(a => a.approved));
        
        const teachSnap = await getDocs(collection(db, 'teachers'));
        const allTeachers = teachSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setPendingTeachers(allTeachers.filter(t => !t.approved));
        setApprovedTeachers(allTeachers.filter(t => t.approved));
    };

    const approveAdmission = async (adm) => {
        try {
            // Use student ID (document ID) as password
            const studentId = adm.id;
            const userCredential = await createUserWithEmailAndPassword(auth, adm.parentEmail, studentId);
            // Set role in users collection
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email: adm.parentEmail,
                role: 'student',
                studentId: studentId,
                studentName: adm.studentName,
                studentClass: adm.selectedClass,
                createdAt: new Date(),
            });
            // Update admission as approved
            await updateDoc(doc(db, 'admissions', adm.id), { approved: true });
            fetchPending();
        } catch (err) {
            console.error('Error approving admission:', err);
        }
    };

    const approveTeacher = async (id) => {
        await updateDoc(doc(db, 'teachers', id), { approved: true });
        fetchPending();
    };

    const publish = async () => {
        if (!noticeText.trim()) return;
        await addDoc(collection(db, 'notices'), {
            text: noticeText,
            createdAt: Timestamp.now(),
            author: user?.email || 'admin',
        });
        setNoticeText('');
        fetchNotices();
    };

    const deleteAdmission = async (id) => {
        try {
            await deleteDoc(doc(db, 'admissions', id));
            fetchPending();
        } catch (err) {
            console.error('Error deleting admission:', err);
        }
    };

    const deleteTeacher = async (id) => {
        try {
            await deleteDoc(doc(db, 'teachers', id));
            fetchPending();
        } catch (err) {
            console.error('Error deleting teacher:', err);
        }
    };

    const addStudentManually = async () => {
        if (!newStudent.studentName || !newStudent.selectedClass || !newStudent.parentEmail) {
            alert('Please fill in all required fields');
            return;
        }
        try {
            const studentId = `manual-${Date.now()}`;
            const userCredential = await createUserWithEmailAndPassword(auth, newStudent.parentEmail, studentId);
            
            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email: newStudent.parentEmail,
                role: 'student',
                studentId: studentId,
                studentName: newStudent.studentName,
                studentClass: newStudent.selectedClass,
                createdAt: new Date(),
            });
            
            await addDoc(collection(db, 'admissions'), {
                ...newStudent,
                approved: true,
                createdAt: Timestamp.now(),
            });
            
            setNewStudent({
                studentName: '', dateOfBirth: '', selectedClass: '', address: '',
                fatherName: '', motherName: '', parentEmail: '', whatsappNumber: ''
            });
            setShowAddStudentForm(false);
            fetchPending();
        } catch (err) {
            console.error('Error adding student:', err);
            alert('Error adding student: ' + err.message);
        }
    };

    const addTeacherManually = async () => {
        if (!newTeacher.name || !newTeacher.email || !newTeacher.subject) {
            alert('Please fill in all required fields');
            return;
        }
        try {
            await addDoc(collection(db, 'teachers'), {
                ...newTeacher,
                approved: true,
                createdAt: Timestamp.now(),
            });
            
            setNewTeacher({
                name: '', email: '', subject: '', phone: '', qualification: '', experience: ''
            });
            setShowAddTeacherForm(false);
            fetchPending();
        } catch (err) {
            console.error('Error adding teacher:', err);
            alert('Error adding teacher: ' + err.message);
        }
    };

    const deleteApprovedStudent = async (id) => {
        try {
            await deleteDoc(doc(db, 'admissions', id));
            fetchPending();
        } catch (err) {
            console.error('Error deleting student:', err);
        }
    };

    const deleteApprovedTeacher = async (id) => {
        try {
            await deleteDoc(doc(db, 'teachers', id));
            fetchPending();
        } catch (err) {
            console.error('Error deleting teacher:', err);
        }
    };

    useEffect(() => {
        const load = async () => {
            await fetchNotices();
            await fetchPending();
        };
        load();
    }, []);

    return (
        <div className="p-6 lg:p-10 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Portal</h1>
                    <p className="text-blue-600 font-bold text-xs flex items-center gap-1 uppercase tracking-widest mt-1">
                        <MapPin size={14}/> Sylhet Campus
                    </p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowAddStudentForm(true)}
                        className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition active:scale-95 flex items-center gap-2"
                    >
                        <UserPlus size={18} /> Add Student
                    </button>
                    <button 
                        onClick={() => setShowAddTeacherForm(true)}
                        className="w-full md:w-auto bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-xl transition active:scale-95 flex items-center gap-2"
                    >
                        <Plus size={18} /> Add Teacher
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-8 border-blue-600">
                    <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-700"><Megaphone size={20} className="text-blue-600"/> Post Notice</h3>
                    <textarea
                        value={noticeText}
                        onChange={e => setNoticeText(e.target.value)}
                        placeholder="Announcement text..."
                        className="w-full border-2 border-gray-100 bg-gray-50 p-4 rounded-2xl h-40 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"
                    ></textarea>
                    <button
                        onClick={publish}
                        className="mt-4 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition"
                    >
                        <Send size={18}/> Publish
                    </button>
                </div>

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-6 bg-gray-50/50 border-b font-black text-xs text-gray-400 tracking-widest uppercase flex justify-between items-center">
                        <span>Pending Admissions</span>
                        <select 
                            value={selectedClass} 
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="All">All Classes</option>
                            {classOptions.map(cls => (
                                <option key={cls} value={cls}>Class {cls}</option>
                            ))}
                        </select>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">Status</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pendingAdmissions
                                .filter(adm => selectedClass === 'All' || adm.selectedClass === selectedClass)
                                .sort((a, b) => {
                                    if (a.selectedClass !== b.selectedClass) {
                                        return a.selectedClass.localeCompare(b.selectedClass);
                                    }
                                    return a.studentName.localeCompare(b.studentName);
                                })
                                .map(adm => (
                                <tr key={adm.id} className="hover:bg-blue-50/20 transition">
                                    <td className="p-4 font-bold text-blue-600">{adm.id}</td>
                                    <td className="p-4 font-bold text-slate-700">{adm.studentName}</td>
                                    <td className="p-4">{adm.selectedClass}</td>
                                    <td className="p-4">{adm.approved ? 'Approved' : 'Waiting'}</td>
                                    <td className="p-4 text-right space-x-2 flex justify-end">
                                        {!adm.approved && (
                                            <>
                                                <button onClick={() => approveAdmission(adm)} className="text-green-500 hover:text-green-700 font-bold">
                                                    Approve
                                                </button>
                                                <button onClick={() => deleteAdmission(adm.id)} className="text-red-500 hover:text-red-700 font-bold">
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                        {adm.approved && (
                                            <button onClick={() => deleteAdmission(adm.id)} className="text-red-500 hover:text-red-700 font-bold">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Teacher requests */}
                {pendingTeachers.length > 0 && (
                    <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mt-8">
                        <div className="p-6 bg-gray-50/50 border-b font-black text-xs text-gray-400 tracking-widest uppercase">Teacher Approvals</div>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Subject</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {pendingTeachers.map(t => (
                                    <tr key={t.id} className="hover:bg-blue-50/20 transition">
                                        <td className="p-4 font-bold text-slate-700">{t.name}</td>
                                        <td className="p-4">{t.email}</td>
                                        <td className="p-4">{t.subject || 'N/A'}</td>
                                        <td className="p-4">{t.approved ? 'Approved' : 'Waiting'}</td>
                                        <td className="p-4 text-right space-x-2 flex justify-end">
                                            {!t.approved && (
                                                <>
                                                    <button onClick={() => approveTeacher(t.id)} className="text-green-500 hover:text-green-700 font-bold">
                                                        Approve
                                                    </button>
                                                    <button onClick={() => deleteTeacher(t.id)} className="text-red-500 hover:text-red-700 font-bold">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                            {t.approved && (
                                                <button onClick={() => deleteTeacher(t.id)} className="text-red-500 hover:text-red-700 font-bold">
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Approved Students Section */}
            {approvedStudents.length > 0 && (
                <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mt-8">
                    <div className="p-6 bg-gray-50/50 border-b font-black text-xs text-gray-400 tracking-widest uppercase flex justify-between items-center">
                        <span>Approved Students ({approvedStudents.length})</span>
                        <select 
                            value={selectedClass} 
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                            <option value="All">All Classes</option>
                            {classOptions.map(cls => (
                                <option key={cls} value={cls}>Class {cls}</option>
                            ))}
                        </select>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Class</th>
                                <th className="p-4">Parent Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {approvedStudents
                                .filter(student => selectedClass === 'All' || student.selectedClass === selectedClass)
                                .sort((a, b) => {
                                    if (a.selectedClass !== b.selectedClass) {
                                        return a.selectedClass.localeCompare(b.selectedClass);
                                    }
                                    return a.studentName.localeCompare(b.studentName);
                                })
                                .map(student => (
                                <tr key={student.id} className="hover:bg-green-50/20 transition">
                                    <td className="p-4 font-bold text-green-600">{student.id}</td>
                                    <td className="p-4 font-bold text-slate-700">{student.studentName}</td>
                                    <td className="p-4">{student.selectedClass}</td>
                                    <td className="p-4">{student.parentEmail}</td>
                                    <td className="p-4">{student.whatsappNumber}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => deleteApprovedStudent(student.id)} className="text-red-500 hover:text-red-700 font-bold">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Approved Teachers Section */}
            {approvedTeachers.length > 0 && (
                <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mt-8">
                    <div className="p-6 bg-gray-50/50 border-b font-black text-xs text-gray-400 tracking-widest uppercase">
                        Approved Teachers ({approvedTeachers.length})
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Qualification</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Experience</th>
                                <th className="p-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {approvedTeachers
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map(teacher => (
                                <tr key={teacher.id} className="hover:bg-purple-50/20 transition">
                                    <td className="p-4 font-bold text-slate-700">{teacher.name}</td>
                                    <td className="p-4">{teacher.email}</td>
                                    <td className="p-4">{teacher.subject}</td>
                                    <td className="p-4">{teacher.qualification}</td>
                                    <td className="p-4">{teacher.phone}</td>
                                    <td className="p-4">{teacher.experience}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => deleteApprovedTeacher(teacher.id)} className="text-red-500 hover:text-red-700 font-bold">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Student Modal */}
            {showAddStudentForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black text-slate-800 mb-6">Add New Student</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Student Name *"
                                value={newStudent.studentName}
                                onChange={(e) => setNewStudent({...newStudent, studentName: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="date"
                                placeholder="Date of Birth"
                                value={newStudent.dateOfBirth}
                                onChange={(e) => setNewStudent({...newStudent, dateOfBirth: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <select
                                value={newStudent.selectedClass}
                                onChange={(e) => setNewStudent({...newStudent, selectedClass: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">Select Class *</option>
                                {classOptions.map(cls => (
                                    <option key={cls} value={cls}>Class {cls}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Address"
                                value={newStudent.address}
                                onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Father Name"
                                value={newStudent.fatherName}
                                onChange={(e) => setNewStudent({...newStudent, fatherName: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Mother Name"
                                value={newStudent.motherName}
                                onChange={(e) => setNewStudent({...newStudent, motherName: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Parent Email *"
                                value={newStudent.parentEmail}
                                onChange={(e) => setNewStudent({...newStudent, parentEmail: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="WhatsApp Number"
                                value={newStudent.whatsappNumber}
                                onChange={(e) => setNewStudent({...newStudent, whatsappNumber: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={addStudentManually}
                                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700"
                            >
                                Add Student
                            </button>
                            <button 
                                onClick={() => setShowAddStudentForm(false)}
                                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Teacher Modal */}
            {showAddTeacherForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-black text-slate-800 mb-6">Add New Teacher</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={newTeacher.name}
                                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="Email *"
                                value={newTeacher.email}
                                onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Subject *"
                                value={newTeacher.subject}
                                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={newTeacher.phone}
                                onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Qualification"
                                value={newTeacher.qualification}
                                onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                            <input
                                type="text"
                                placeholder="Years of Experience"
                                value={newTeacher.experience}
                                onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={addTeacherManually}
                                className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
                            >
                                Add Teacher
                            </button>
                            <button 
                                onClick={() => setShowAddTeacherForm(false)}
                                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-bold hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* show existing notices for reference */}
            {notices.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-bold mb-4">Previous Notices</h2>
                    <ul className="space-y-3">
                        {notices.map(n => (
                            <li key={n.id} className="border-b pb-2">
                                <p className="text-gray-800">{n.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{n.createdAt?.toDate().toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;