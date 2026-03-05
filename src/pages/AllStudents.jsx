import { useState } from "react";
import { Users, Search, BookOpen, Trash2 } from "lucide-react";

const classOptions = [
    'Play', 'Nursery', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
];

const AllStudents = () => {
    const [selectedClass, setSelectedClass] = useState("1");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock data: Students by class (in real app, fetch from Firestore)
    const studentsByClass = {
        "Play": [
            { id: "p-01", name: "Ali Hassan", age: 4, parentEmail: "ali@example.com", status: "Active" },
            { id: "p-02", name: "Zara Khan", age: 4, parentEmail: "zara@example.com", status: "Active" },
        ],
        "Nursery": [
            { id: "n-01", name: "Ferdus Ahmed", age: 5, parentEmail: "ferdus@example.com", status: "Active" },
            { id: "n-02", name: "Karim Ullah", age: 5, parentEmail: "karim@example.com", status: "Active" },
        ],
        "1": [
            { id: "1-01", name: "Rayed Hassan", age: 6, parentEmail: "rayed@example.com", status: "Active" },
            { id: "1-02", name: "Sofia Rahman", age: 6, parentEmail: "sofia@example.com", status: "Active" },
            { id: "1-03", name: "Amin Khan", age: 6, parentEmail: "amin@example.com", status: "Active" },
        ],
        "2": [
            { id: "2-01", name: "Noor Jahan", age: 7, parentEmail: "noor@example.com", status: "Active" },
            { id: "2-02", name: "Hassan Ali", age: 7, parentEmail: "hassan@example.com", status: "Active" },
        ],
        "3": [
            { id: "3-01", name: "Sara Ahmed", age: 8, parentEmail: "sara@example.com", status: "Active" },
            { id: "3-02", name: "Bilal Khan", age: 8, parentEmail: "bilal@example.com", status: "Active" },
        ],
    };

    const currentStudents = studentsByClass[selectedClass] || [];
    const filteredStudents = currentStudents.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2">
                    <Users size={32} className="text-blue-600" /> Student Management
                </h1>
                <p className="text-gray-600">View and manage students by class</p>
            </div>

            {/* Class Selection */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <BookOpen size={24} className="text-blue-600" /> Select Class
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {classOptions.map(cls => (
                        <button
                            key={cls}
                            onClick={() => {
                                setSelectedClass(cls);
                                setSearchTerm("");
                            }}
                            className={`p-4 rounded-xl font-bold transition-all text-center ${
                                selectedClass === cls
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-gray-100 text-slate-700 hover:bg-blue-50'
                            }`}
                        >
                            <div className="text-lg">{cls}</div>
                            <div className="text-xs mt-1 opacity-75">
                                {studentsByClass[cls]?.length || 0} students
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by student name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    />
                </div>
            </div>

            {/* Students Table */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-800">
                        Class {selectedClass} - {filteredStudents.length} Student{filteredStudents.length !== 1 ? 's' : ''}
                    </h2>
                    <div className="text-sm font-bold text-gray-500">
                        Total Class Size: {currentStudents.length}
                    </div>
                </div>

                {filteredStudents.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No students found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide">Student ID</th>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide">Name</th>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide">Age</th>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide">Parent Email</th>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide">Status</th>
                                    <th className="p-4 font-bold text-gray-700 uppercase tracking-wide text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 font-bold text-blue-600">{student.id}</td>
                                        <td className="p-4 font-medium text-slate-700">{student.name}</td>
                                        <td className="p-4 text-gray-600">{student.age}</td>
                                        <td className="p-4 text-gray-600">{student.parentEmail}</td>
                                        <td className="p-4">
                                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                                {student.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="text-red-400 hover:text-red-600 transition">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                        <p className="text-3xl font-black text-blue-600">{filteredStudents.length}</p>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1">Total Students</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
                        <p className="text-3xl font-black text-green-600">
                            {filteredStudents.filter(s => s.status === 'Active').length}
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1">Active</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center">
                        <p className="text-3xl font-black text-yellow-600">
                            {Math.round((filteredStudents.filter(s => s.status === 'Active').length / filteredStudents.length || 0) * 100)}%
                        </p>
                        <p className="text-xs font-bold text-gray-500 uppercase mt-1">Enrollment Rate</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllStudents;
