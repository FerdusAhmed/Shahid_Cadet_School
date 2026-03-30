import { useState } from "react";

const Teachers = () => {
  const [activeGroup, setActiveGroup] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const teachers = [
    // SCIENCE GROUP
    { name: "MD Belal Ahmed", subject: "English", group: "Science", background: "BA (Honors), MA in English Literature, University of Dhaka", experience: "8 Years", history: "Specializes in communicative English and cadet college admission prep." },
    { name: "Naim Uddin", subject: "Mathematics", group: "Science", background: "BSc in Applied Mathematics, Leading University", experience: "5 Years", history: "Expert in Higher Math and Competitive Olympiad problem solving." },
    { name: "Dr. Anisur Rahman", subject: "Physics", group: "Science", background: "Ph.D. in Nuclear Physics, BUET", experience: "12 Years", history: "Former researcher with a passion for conceptual physics." },
    { name: "Rafiqul Islam", subject: "Chemistry", group: "Science", background: "MSc in Chemistry, Jahangirnagar University", experience: "10 Years", history: "Known for making organic chemistry simple for young cadets." },
    { name: "Sultana Kamal", subject: "Biology", group: "Science", background: "MSc in Zoology, University of Dhaka", experience: "6 Years", history: "Dedicated to medical-oriented coaching and botanical studies." },

    // ARTS GROUP
    { name: "MD Shahin Mirza", subject: "English Literature", group: "Arts", background: "MA in English, University of Dhaka", experience: "7 Years", history: "Focuses on classical literature and creative writing excellence." },
    { name: "Zahid Hasan", subject: "History & Civics", group: "Arts", background: "MA in World History, University of Rajshahi", experience: "4 Years", history: "Specialist in South Asian history and constitutional law." },
    { name: "Kamrul Ahsan", subject: "Geography", group: "Arts", background: "MSc in Geography & Environment, DU", experience: "9 Years", history: "Expert in GIS mapping and environmental science." },
    { name: "Farhana Yasmin", subject: "Social Science", group: "Arts", background: "MSS in Sociology, Chittagong University", experience: "5 Years", history: "Encourages students to understand social structures and ethics." },
    { name: "Abdur Rahim", subject: "Islamic Studies", group: "Arts", background: "MA in Islamic Studies, Al-Azhar University (Egypt)", experience: "15 Years", history: "Focuses on moral development and Islamic history." },

    // COMMERCE GROUP
    { name: "Mrs. Jennifer", subject: "Accounting", group: "Commerce", background: "MBA in Finance, University of Dhaka", experience: "5 Years", history: "Professional accountant turned educator focusing on modern auditing." },
    { name: "Tanvir Ahmed", subject: "Business Studies", group: "Commerce", background: "MBA, IBA (University of Dhaka)", experience: "4 Years", history: "Startup mentor and specialist in business management strategies." },
    { name: "Sajid Khan", subject: "Economics", group: "Commerce", background: "MSS in Economics, NSU", experience: "7 Years", history: "Expert in microeconomics and global market trends." },
    { name: "Rina Akhter", subject: "Finance & Banking", group: "Commerce", background: "MBA in Banking, DU", experience: "6 Years", history: "Passionate about financial literacy and mathematical finance." },
    { name: "Ahsan Habib", subject: "Statistics", group: "Commerce", background: "MSc in Statistics, Rajshahi University", experience: "11 Years", history: "Uses data science concepts to teach fundamental statistics." },
  ];

  // Filtering & Search Logic
  const filteredTeachers = teachers.filter(t => {
    const matchesGroup = activeGroup === "All" || t.group === activeGroup;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const groups = ["All", "Science", "Arts", "Commerce"];

  return (
    // mt-20 ensures the content starts below your fixed navbar
    <div className="bg-slate-50 min-h-screen mt-20">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-blue-900 py-16 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 Z"></path>
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Meet Our Faculty</h1>
          <p className="text-blue-200 max-w-2xl mx-auto text-lg italic">
            "Education is the most powerful weapon which you can use to change the world."
          </p>
        </div>
      </div>

      {/* --- FILTER & SEARCH BAR --- */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white shadow-2xl rounded-3xl p-4 md:p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Group Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeGroup === group 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "text-gray-500 hover:bg-blue-50 border border-transparent hover:border-blue-100"
                }`}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <input 
              type="text"
              placeholder="Search by name or subject..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-4 top-3 text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* --- TEACHERS GRID --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map((teacher, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Photo Area with Placeholder */}
              <div className="relative h-64 bg-slate-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200">
                   <span className="text-5xl">👨‍🏫</span>
                </div>
                {/* Image overlay for styling */}
                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-sm backdrop-blur-md ${
                    teacher.group === 'Science' ? 'bg-green-100 text-green-700' : 
                    teacher.group === 'Arts' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                  }`}>
                    {teacher.group} Group
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <h3 className="text-xl font-black text-gray-800 mb-1 group-hover:text-blue-700 transition-colors">{teacher.name}</h3>
                <p className="text-blue-600 font-bold text-xs mb-6 uppercase tracking-widest">{teacher.subject} Department</p>
                
                <div className="space-y-4 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500">🎓</span>
                    <p><strong>Education:</strong> {teacher.background}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500">⏳</span>
                    <p><strong>Experience:</strong> {teacher.experience}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm leading-relaxed italic line-clamp-3">
                    "{teacher.history}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeachers.length === 0 && (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-xl font-bold text-gray-800">No matches found</h3>
            <p className="text-gray-500">Try adjusting your search or group filter.</p>
          </div>
        )}
      </div>

      {/* --- FOOTER CALL TO ACTION --- */}
      <div className="bg-white border-t border-gray-100 py-12 text-center">
        <p className="text-gray-500 mb-4">Want to join our faculty?</p>
        <button className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition shadow-lg">
          Career Opportunities
        </button>
      </div>
    </div>
  );
};

export default Teachers;