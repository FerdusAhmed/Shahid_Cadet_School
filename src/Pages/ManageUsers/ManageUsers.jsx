import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { ShieldCheck, UserCog, Trash2, Mail, Calendar, User } from 'lucide-react';
import Swal from 'sweetalert2';
import NexusLoader from '../../components/Nexusloader/Nexusloader';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['all-users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleRoleChange = async (user, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/${user.email}`, { role: newRole });
            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Role Updated!",
                    text: `${user.name} is now a ${newRole}`,
                    icon: "success",
                    background: '#1E293B',
                    color: '#fff',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error("Failed to update role", err);
        }
    };

    if (isLoading) return <NexusLoader />;

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10 animate-in fade-in duration-700">
            
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-black text-white italic">User Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Found {users.length} registered accounts</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Access Level</p>
                    <p className="text-blue-500 font-black text-sm uppercase">Administrator</p>
                </div>
            </div>

            <div className="bg-[#1E293B] border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-800/50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-800">
                                <th className="p-6">Member Information</th>
                                <th className="p-6">Joined Date</th>
                                <th className="p-6">Access Role</th>
                                <th className="p-6 text-center">Permissions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {users.map((user) => (
                                <tr key={user._id} className="group hover:bg-slate-800/30 transition-all">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden shadow-inner shrink-0">
                                                <img 
                                                    src={user.image || "https://i.pravatar.cc/150?u=" + user.email} 
                                                    alt={user.name} 
                                                    className="w-full h-full object-cover"
                                                    referrerPolicy='no-referrer'
                                                    // onError={(e) => { e.target.src = "https://i.pravatar.cc/150?img=12"; }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{user.name || "Anonymous"}</p>
                                                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                                                    <Mail size={12} /> {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-6 text-slate-400 text-xs font-medium">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-600" />
                                            {new Date(user.createdAt).toLocaleDateString('en-GB')}
                                        </div>
                                    </td>

                                    <td className="p-6">
                                        <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                                            user.role === 'admin' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                            user.role === 'teacher' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                            {user.role || 'student'}
                                        </span>
                                    </td>

                                    <td className="p-6">
                                        <div className="flex justify-center items-center gap-2">
                                            {/* Admin */}
                                            <button 
                                                onClick={() => handleRoleChange(user, 'admin')}
                                                disabled={user.role === 'admin'}
                                                className={`p-2 rounded-xl border transition-all ${user.role === 'admin' ? 'opacity-20 cursor-not-allowed border-slate-700' : 'border-slate-700 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-transparent active:scale-95'}`}
                                                title="Make Admin"
                                            >
                                                <ShieldCheck size={18} />
                                            </button>

                                            {/* Teacher */}
                                            <button 
                                                onClick={() => handleRoleChange(user, 'teacher')}
                                                disabled={user.role === 'teacher'}
                                                className={`p-2 rounded-xl border transition-all ${user.role === 'teacher' ? 'opacity-20 cursor-not-allowed border-slate-700' : 'border-slate-700 text-indigo-400 hover:bg-indigo-500 hover:text-white hover:border-transparent active:scale-95'}`}
                                                title="Make Teacher"
                                            >
                                                <UserCog size={18} />
                                            </button>

                                            {/* Student (Added Option) */}
                                            <button 
                                                onClick={() => handleRoleChange(user, 'student')}
                                                disabled={user.role === 'student' || !user.role}
                                                className={`p-2 rounded-xl border transition-all ${user.role === 'student' || !user.role ? 'opacity-20 cursor-not-allowed border-slate-700' : 'border-slate-700 text-blue-400 hover:bg-blue-500 hover:text-white hover:border-transparent active:scale-95'}`}
                                                title="Make Student"
                                            >
                                                <User size={18} />
                                            </button>

                                            {/* Delete */}
                                            <button 
                                                className="p-2 border border-slate-700 text-slate-500 hover:bg-rose-500/10 hover:text-rose-500 rounded-xl transition-all"
                                                title="Remove User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;