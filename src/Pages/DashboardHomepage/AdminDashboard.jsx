import React from 'react';
import { 
  Users, DollarSign, BookOpen, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Calendar, Bell, Search 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';

// ডামি ডাটা (চার্টের জন্য)
const chartData = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 700, revenue: 3600 },
  { name: 'Mar', students: 900, revenue: 5000 },
  { name: 'Apr', students: 1200, revenue: 7200 },
  { name: 'May', students: 1500, revenue: 9000 },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 p-8 animate-in fade-in duration-700">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">System Overview</h1>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} /> Today is February 28, 2026
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-[#1E293B] border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-blue-500 outline-none w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-[#1E293B] border border-slate-700 rounded-xl text-slate-400 hover:text-white transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#1E293B]"></span>
          </button>
        </div>
      </div>

      {/* --- STAT CARDS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard 
          label="Total Revenue" 
          value="$128,430" 
          trend="+14.2%" 
          isPositive={true} 
          icon={<DollarSign size={24} className="text-emerald-400" />} 
        />
        <StatCard 
          label="Active Students" 
          value="4,210" 
          trend="+8.1%" 
          isPositive={true} 
          icon={<Users size={24} className="text-blue-400" />} 
        />
        <StatCard 
          label="Course Sales" 
          value="856" 
          trend="-2.4%" 
          isPositive={false} 
          icon={<BookOpen size={24} className="text-purple-400" />} 
        />
        <StatCard 
          label="Avg. Engagement" 
          value="78%" 
          trend="+12%" 
          isPositive={true} 
          icon={<TrendingUp size={24} className="text-orange-400" />} 
        />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Growth Chart */}
        <div className="lg:col-span-2 bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-white">Student Enrollment Growth</h3>
            <select className="bg-slate-800 border-none text-xs font-bold rounded-lg p-2 text-slate-400 outline-none">
                <option>Last 6 Months</option>
                <option>Yearly</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-800 flex flex-col justify-between">
          <h3 className="font-bold text-lg text-white mb-6">System Status</h3>
          
          <div className="space-y-6">
            <StatusProgress label="Server Performance" value={94} color="bg-emerald-500" />
            <StatusProgress label="Storage Used" value={62} color="bg-blue-500" />
            <StatusProgress label="Database Health" value={88} color="bg-purple-500" />
            <StatusProgress label="Daily Backup" value={100} color="bg-orange-500" />
          </div>

          <div className="mt-10 p-5 bg-blue-600/10 border border-blue-500/20 rounded-2xl">
             <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Quick Action</p>
             <p className="text-sm text-slate-300 mb-4">You have 12 pending teacher approvals.</p>
             <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-blue-600/20">
                Review Now
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ label, value, trend, isPositive, icon }) => (
  <div className="bg-[#1E293B] p-6 rounded-4xl border border-slate-800 group hover:border-blue-500/30 transition-all">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-800/50 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg ${
        isPositive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
      }`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">{label}</p>
    <h2 className="text-2xl font-black text-white">{value}</h2>
  </div>
);

const StatusProgress = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-bold">
      <span className="text-slate-400">{label}</span>
      <span className="text-white">{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default AdminDashboard;