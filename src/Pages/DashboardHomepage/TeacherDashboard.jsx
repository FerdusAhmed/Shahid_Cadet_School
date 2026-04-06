import React from 'react';
import { 
  Users, BookOpen, Clock, CheckCircle, 
  Calendar as CalendarIcon, MessageSquare, 
  FileText, ArrowUpRight, GraduationCap 
} from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-6 md:p-10 animate-in fade-in duration-700">
      
      {/* --- WELCOME SECTION --- */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight italic">
          Welcome Back, Prof! 🎓
        </h1>
        <p className="text-slate-400 text-sm mt-2 flex items-center gap-2">
          <CalendarIcon size={14} /> Saturday, February 28, 2026 | You have 3 lectures today.
        </p>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Students" value="1,240" icon={<Users className="text-blue-400" />} />
        <StatCard label="Live Courses" value="06" icon={<BookOpen className="text-indigo-400" />} />
        <StatCard label="Assignments" value="24" icon={<FileText className="text-amber-400" />} />
        <StatCard label="Satisfaction" value="4.9/5" icon={<GraduationCap className="text-emerald-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- SCHEDULE SECTION (Left 2/3) --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-indigo-500" /> Today's Schedule
            </h3>
            <button className="text-xs font-bold text-indigo-400 hover:underline">Full Timetable</button>
          </div>
          
          <div className="space-y-4">
            <ScheduleCard 
              subject="Advanced Web Development" 
              time="09:00 AM - 10:30 AM" 
              type="Theory" 
              students="45" 
            />
            <ScheduleCard 
              subject="Data Structures & Algorithms" 
              time="11:30 AM - 01:00 PM" 
              type="Lab Session" 
              students="30" 
            />
            <ScheduleCard 
              subject="System Design Workshop" 
              time="03:00 PM - 04:30 PM" 
              type="Online" 
              students="120" 
            />
          </div>
        </div>

        {/* --- RIGHT SIDEBAR: QUICK UPDATES --- */}
        <div className="space-y-6">
          <section className="bg-indigo-600/5 border border-indigo-500/20 p-8 rounded-[2.5rem]">
            <h4 className="font-bold text-indigo-400 mb-6 flex items-center gap-2 text-xs uppercase tracking-widest">
              <CheckCircle size={16} /> Needs Grading
            </h4>
            <div className="space-y-5">
              <GradingItem title="React Hooks Quiz" due="2 hours left" count="12" />
              <GradingItem title="Final Project Docs" due="Today" count="05" />
              <GradingItem title="SQL Lab Report" due="Yesterday" count="28" />
            </div>
          </section>

          <section className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-white text-sm">Recent Activity</h4>
              <MessageSquare size={16} className="text-slate-500" />
            </div>
            <div className="space-y-4">
              <ActivityItem text="Alex Morgan submitted assignment" time="10m ago" />
              <ActivityItem text="New question in Course Forum" time="24m ago" />
              <ActivityItem text="Database backup completed" time="1h ago" />
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const StatCard = ({ label, value, icon }) => (
  <div className="bg-[#1E293B] p-6 rounded-4xl border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <h2 className="text-3xl font-black text-white">{value}</h2>
    </div>
    <div className="p-4 bg-slate-900 rounded-2xl group-hover:bg-indigo-600/10 transition-colors">
      {icon}
    </div>
  </div>
);

const ScheduleCard = ({ subject, time, type, students }) => (
  <div className="bg-[#1E293B] p-6 rounded-4xl border border-slate-800 flex items-center justify-between hover:bg-slate-800/40 transition-all cursor-default">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500">
        <ArrowUpRight size={24} />
      </div>
      <div>
        <h4 className="font-bold text-white text-lg leading-tight">{subject}</h4>
        <div className="flex items-center gap-3 mt-1 text-slate-500 text-xs">
          <span className="flex items-center gap-1 font-medium"><Clock size={12}/> {time}</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded-md text-[10px] uppercase font-bold text-slate-400">{type}</span>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="text-xs font-black text-slate-300">{students}</p>
      <p className="text-[9px] text-slate-500 uppercase font-bold">Enrolled</p>
    </div>
  </div>
);

const GradingItem = ({ title, due, count }) => (
  <div className="flex justify-between items-center group cursor-pointer">
    <div>
      <p className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{title}</p>
      <p className="text-[10px] text-slate-500 italic">{due}</p>
    </div>
    <span className="text-xs font-black bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-lg">
      {count}
    </span>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <div className="flex justify-between items-start gap-3">
    <p className="text-xs text-slate-400 leading-tight">{text}</p>
    <span className="text-[9px] font-bold text-slate-600 whitespace-nowrap">{time}</span>
  </div>
);

export default TeacherDashboard;