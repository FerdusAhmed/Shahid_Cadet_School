import { Megaphone, Users, BadgeCheck, Calculator } from "lucide-react";

const Home = () => {
    const stats = [
        { label: "Total Students", value: "450+", icon: <Users />, color: "bg-blue-500" },
        { label: "Graduation Rate", value: "98%", icon: <BadgeCheck />, color: "bg-green-500" },
        { label: "Avg. GPA", value: "4.85", icon: <Calculator />, color: "bg-purple-500" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
                        <div className={`${stat.color} p-4 rounded-2xl text-white`}>{stat.icon}</div>
                        <div>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fee Structure Table */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Calculator className="text-blue-600" size={20} /> Fee Structure
                    </h3>
                    <div className="space-y-4">
                        <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                            <span className="font-bold text-slate-600">Class 6 - 8</span>
                            <span className="font-black text-blue-600">1,200 BDT/mo</span>
                        </div>
                        <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                            <span className="font-bold text-slate-600">Class 9 - 10</span>
                            <span className="font-black text-blue-600">1,800 BDT/mo</span>
                        </div>
                    </div>
                </div>

                {/* Notice Board */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                        <Megaphone className="text-red-500" size={20} /> Campus Notices
                    </h3>
                    <div className="border-l-4 border-blue-600 pl-4 py-1">
                        <p className="text-xs font-black text-blue-600">MARCH 15, 2026</p>
                        <h4 className="font-bold text-slate-700">Final Term Examination Schedule</h4>
                        <p className="text-sm text-slate-500">The routine for the final exam is now available in the admin office.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;