import { Users, Briefcase, Phone, Mail, Search } from "lucide-react";
import { useState } from "react";

const AllTeachers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("All");

    // Mock teacher data grouped by subject group
    const teachersByGroup = {
        "Science": [
            { id: "t-01", name: "Dr. Mohammad Hasan", position: "Head of Science Department", phone: "+880 17 1111 0001", email: "hasan@scsc.edu.bd", qualification: "M.Sc Physics" },
            { id: "t-02", name: "Mrs. Fatima Khan", position: "Physics Teacher", phone: "+880 17 1111 0002", email: "fatima@scsc.edu.bd", qualification: "B.Sc Physics" },
            { id: "t-03", name: "Mr. Karim Ahmed", position: "Chemistry Teacher", phone: "+880 17 1111 0003", email: "karim@scsc.edu.bd", qualification: "B.Sc Chemistry" },
            { id: "t-04", name: "Ms. Noor Jahan", position: "Biology Teacher", phone: "+880 17 1111 0004", email: "noor@scsc.edu.bd", qualification: "B.Sc Biology" },
        ],
        "Arts": [
            { id: "t-05", name: "Prof. Abdul Rahman", position: "Head of Arts Department", phone: "+880 17 2222 0001", email: "rahman@scsc.edu.bd", qualification: "M.A History" },
            { id: "t-06", name: "Mrs. Amina Begum", position: "English Teacher", phone: "+880 17 2222 0002", email: "amina@scsc.edu.bd", qualification: "M.A English" },
            { id: "t-07", name: "Mr. Rayed Hassan", position: "Bengali Teacher", phone: "+880 17 2222 0003", email: "rayed@scsc.edu.bd", qualification: "M.A Bengali" },
            { id: "t-08", name: "Ms. Sara Ahmed", position: "History Teacher", phone: "+880 17 2222 0004", email: "sara@scsc.edu.bd", qualification: "M.A History" },
        ],
        "Commerce": [
            { id: "t-09", name: "Mr. Bilal Khan", position: "Head of Commerce Department", phone: "+880 17 3333 0001", email: "bilal@scsc.edu.bd", qualification: "M.Com Accounting" },
            { id: "t-10", name: "Mrs. Zara Rahman", position: "Accounting Teacher", phone: "+880 17 3333 0002", email: "zara@scsc.edu.bd", qualification: "B.Com Accounting" },
            { id: "t-11", name: "Mr. Hassan Ali", position: "Economics Teacher", phone: "+880 17 3333 0003", email: "hassan@scsc.edu.bd", qualification: "M.Com Economics" },
            { id: "t-12", name: "Ms. Sofia Khan", position: "Business Studies Teacher", phone: "+880 17 3333 0004", email: "sofia@scsc.edu.bd", qualification: "B.Com Business" },
        ],
        "Primary": [
            { id: "t-13", name: "Mrs. Laila Ahmed", position: "Primary Coordinator", phone: "+880 17 4444 0001", email: "laila@scsc.edu.bd", qualification: "B.Ed Primary" },
            { id: "t-14", name: "Mr. Amin Khan", position: "Class Teacher - Play", phone: "+880 17 4444 0002", email: "amin.khan@scsc.edu.bd", qualification: "B.Ed Play" },
            { id: "t-15", name: "Mrs. Sofia Rahman", position: "Class Teacher - Nursery", phone: "+880 17 4444 0003", email: "sofia.r@scsc.edu.bd", qualification: "B.Ed Nursery" },
            { id: "t-16", name: "Mr. Raved Hassan", position: "Class Teacher - Class 1", phone: "+880 17 4444 0004", email: "raved@scsc.edu.bd", qualification: "B.Ed Primary" },
        ],
    };

    const allTeachers = Object.values(teachersByGroup).flat();
    const groups = ["All", ...Object.keys(teachersByGroup)];

    const displayTeachers = selectedGroup === "All"
        ? allTeachers
        : teachersByGroup[selectedGroup] || [];

    const filteredTeachers = displayTeachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2">
                    <Users size={32} className="text-blue-600" /> Teaching Staff Directory
                </h1>
                <p className="text-gray-600">
                    Total Teachers: <span className="font-bold text-blue-600">{allTeachers.length}</span>
                </p>
            </div>

            {/* Group Filter */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Briefcase size={24} className="text-blue-600" /> Select Department
                </h2>
                <div className="flex flex-wrap gap-3">
                    {groups.map(group => (
                        <button
                            key={group}
                            onClick={() => {
                                setSelectedGroup(group);
                                setSearchTerm("");
                            }}
                            className={`px-6 py-3 rounded-xl font-bold transition-all ${
                                selectedGroup === group
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-gray-100 text-slate-700 hover:bg-blue-50'
                            }`}
                        >
                            {group}
                            {group !== "All" && (
                                <span className="ml-2 text-xs opacity-75">
                                    ({teachersByGroup[group]?.length || 0})
                                </span>
                            )}
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
                        placeholder="Search by teacher name, position, or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    />
                </div>
            </div>

            {/* Teachers Grid */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6">
                    {selectedGroup === "All" ? "All Teachers" : `${selectedGroup} Department`}
                    <span className="text-base font-normal text-gray-500 ml-3">
                        ({filteredTeachers.length} {filteredTeachers.length === 1 ? 'teacher' : 'teachers'})
                    </span>
                </h2>

                {filteredTeachers.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No teachers found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (
                            <div key={teacher.id} className="bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-slate-800 mb-1">{teacher.name}</h3>
                                        <p className="text-sm font-bold text-blue-600">{teacher.position}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                                        {teacher.name.charAt(0)}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-blue-200 my-4"></div>

                                {/* Contact Info */}
                                <div className="space-y-3 text-sm mb-4">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Phone size={16} className="text-blue-600 flex-shrink-0" />
                                        <a href={`tel:${teacher.phone}`} className="hover:text-blue-600 transition break-all">
                                            {teacher.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Mail size={16} className="text-blue-600 flex-shrink-0" />
                                        <a href={`mailto:${teacher.email}`} className="hover:text-blue-600 transition break-all">
                                            {teacher.email}
                                        </a>
                                    </div>
                                </div>

                                {/* Qualification */}
                                <div className="bg-white px-3 py-2 rounded-lg text-xs font-bold text-blue-600">
                                    Qualification: {teacher.qualification}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary Stats */}
                {filteredTeachers.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
                        {groups.map(group => (
                            group !== "All" && (
                                <div key={group} className="text-center">
                                    <p className="text-3xl font-black text-blue-600">{teachersByGroup[group]?.length || 0}</p>
                                    <p className="text-xs font-bold text-gray-500 uppercase mt-1">{group}</p>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTeachers;
