import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Trash2, CheckCircle, XCircle, Mail, Phone, Calendar, Users, Search, ChevronDown } from 'lucide-react';
import NexusLoader from '../../components/Nexusloader/Nexusloader';

/* ─── Config & Styles ───────────────────────────────────────────── */
const STATUS_THEME = {
  pending:  { bg: 'bg-amber-50',  text: 'text-amber-600',  dot: 'bg-amber-400',  border: 'border-amber-100' },
  approved: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-400', border: 'border-emerald-100' },
  rejected: { bg: 'bg-rose-50',    text: 'text-rose-600',    dot: 'bg-rose-400',    border: 'border-rose-100' },
};

/* ─── Shared Components ─────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const s = STATUS_THEME[status] || STATUS_THEME.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border font-mono ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} /> {status}
    </span>
  );
};

const ActionButtons = ({ id, status, onAction, isMobile }) => (
  <div className={`flex items-center gap-1.5 ${isMobile ? 'pt-1' : 'justify-end'}`}>
    {status === 'pending' && (
      <>
        <button onClick={() => onAction(id, 'approved')} className={`flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-600 rounded-xl md:rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all active:scale-95`}>
          <CheckCircle size={14} /> Approve
        </button>
        <button onClick={() => onAction(id, 'rejected')} className={`flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-2 bg-rose-50 text-rose-500 rounded-xl md:rounded-lg text-xs font-bold hover:bg-rose-100 transition-all active:scale-95`}>
          <XCircle size={14} /> Reject
        </button>
      </>
    )}
    <button onClick={() => window.confirm('Delete?') && onAction(id, null, true)} className={`p-2 bg-slate-50 md:bg-transparent text-slate-300 hover:text-rose-500 rounded-xl md:rounded-lg transition-all ${isMobile && status !== 'pending' ? 'flex-1 flex gap-2' : ''}`}>
      <Trash2 size={16} /> {isMobile && status !== 'pending' && 'Delete'}
    </button>
  </div>
);

/* ─── Main Component ────────────────────────────────────────────── */
const AdmissionApplication = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expanded, setExpanded] = useState({});

  const { data: admissions = [], isLoading } = useQuery({
    queryKey: ['admissions'],
    queryFn: async () => (await axiosSecure.get('/admission')).data,
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, isDelete }) => 
      isDelete ? axiosSecure.delete(`/admission/${id}`) : axiosSecure.patch(`/admission/${id}`, { status }),
    onSuccess: (_, v) => {
      queryClient.invalidateQueries(['admissions']);
      toast.success(v.isDelete ? 'Removed' : 'Status updated');
    },
  });

  const { filtered, counts } = useMemo(() => {
    const stats = { total: admissions.length, pending: 0, approved: 0, rejected: 0 };
    const list = admissions.filter(a => {
      if (stats[a.status] !== undefined) stats[a.status]++;
      const matchSearch = `${a.firstName} ${a.lastName} ${a.email}`.toLowerCase().includes(search.toLowerCase());
      return (filterStatus === 'all' || a.status === filterStatus) && matchSearch;
    });
    return { filtered: list, counts: stats };
  }, [admissions, search, filterStatus]);

  const handleAction = (id, status, isDelete = false) => updateMutation.mutate({ id, status, isDelete });

  if (isLoading) return <NexusLoader />;

  return (
    <div className="min-h-screen bg-[#f7f7f9] p-4 sm:p-8 font-['DM_Sans']">
      <div className="max-w-6xl mx-auto">
        {/* Header & Stats Grid */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold text-indigo-400 tracking-[0.2em] uppercase font-mono">Admin Management</span>
            <h1 className="text-3xl md:text-4xl font-black mt-1 text-slate-900 font-serif leading-tight">Admission Requests</h1>
          </div>
          <div className="bg-indigo-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 shadow-lg shadow-indigo-100">
            <Users size={14} /> {counts.total} Applications
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[ ['Total', counts.total, '#1e1b4b'], ['Pending', counts.pending, '#d97706'], ['Approved', counts.approved, '#16a34a'], ['Rejected', counts.rejected, '#e11d48'] ].map(([l, v, c]) => (
            <div key={l} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <span className="text-[9px] font-bold tracking-[0.15em] text-slate-400 uppercase font-mono">{l}</span>
              <p className="text-3xl font-black font-serif" style={{ color: c }}>{v}</p>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={15} />
            <input onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl outline-none text-sm transition-all focus:border-indigo-300" />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar sm:overflow-visible">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} className={`shrink-0 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider font-mono border transition-all ${filterStatus === s ? 'bg-indigo-950 text-white shadow-md' : 'bg-white text-slate-400 border-slate-100'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* List (Mobile) / Table (Desktop) */}
        <div className="md:bg-white md:border md:border-slate-100 md:rounded-3xl md:shadow-sm md:overflow-hidden">
          {filtered.length === 0 ? <div className="p-20 text-center text-slate-300 font-mono text-sm bg-white rounded-2xl md:rounded-none">No results</div> : (
            <>
              {/* Desktop Table View */}
              <table className="hidden md:table w-full text-left">
                <thead className="bg-slate-50/60 border-b border-slate-100 font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <tr>{['Student', 'Class & Blood', 'Contact', 'Status', 'Actions'].map((h, i) => <th key={h} className={`p-5 ${i === 4 ? 'text-right' : ''}`}>{h}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map(app => (
                    <tr key={app._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-900 to-indigo-500 text-white flex items-center justify-center font-serif font-black text-sm">{app.firstName[0]}{app.lastName[0]}</div>
                        <div><p className="font-bold text-slate-700 font-serif">{app.firstName} {app.lastName}</p><p className="text-[10px] text-slate-400 flex items-center gap-1 font-mono"><Calendar size={9}/>{new Date(app.submittedAt).toLocaleDateString()}</p></div>
                      </td>
                      <td className="p-5">
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold font-mono mr-1.5">Class {app.class}</span>
                        <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold font-mono">{app.bloodGroup}</span>
                      </td>
                      <td className="p-5 space-y-1 text-xs text-slate-500">
                        <p className="flex items-center gap-2"><Mail size={11} className="text-indigo-200"/>{app.email}</p>
                        <p className="flex items-center gap-2 font-mono"><Phone size={11} className="text-indigo-200"/>{app.phone}</p>
                      </td>
                      <td className="p-5"><StatusBadge status={app.status}/></td>
                      <td className="p-5 text-right"><ActionButtons id={app._id} status={app.status} onAction={handleAction} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {filtered.map(app => (
                  <div key={app._id} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden transition-all">
                    <button onClick={() => setExpanded(p => ({...p, [app._id]: !p[app._id]}))} className="w-full flex items-center gap-3 p-4 text-left active:bg-slate-50">
                      <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-900 to-indigo-500 text-white flex items-center justify-center font-serif font-black">{app.firstName[0]}{app.lastName[0]}</div>
                      <div className="flex-1 truncate"><p className="font-bold text-slate-800 font-serif truncate">{app.firstName} {app.lastName}</p><p className="text-[10px] text-slate-400 font-mono">{new Date(app.submittedAt).toLocaleDateString()}</p></div>
                      <StatusBadge status={app.status}/><ChevronDown size={14} className={`text-slate-300 transition-transform ${expanded[app._id] ? 'rotate-180' : ''}`}/>
                    </button>
                    {expanded[app._id] && (
                      <div className="px-4 pb-4 space-y-3 border-t border-slate-50 pt-3">
                        <div className="flex gap-2 font-mono text-[10px] font-bold">
                          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg">Class {app.class}</span>
                          <span className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg">{app.bloodGroup}</span>
                        </div>
                        <div className="text-xs text-slate-500 space-y-1">
                          <p className="flex items-center gap-2 truncate"><Mail size={12} className="text-indigo-200 shrink-0"/>{app.email}</p>
                          <p className="flex items-center gap-2 font-mono"><Phone size={12} className="text-indigo-200 shrink-0"/>{app.phone}</p>
                        </div>
                        <ActionButtons id={app._id} status={app.status} onAction={handleAction} isMobile />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionApplication;