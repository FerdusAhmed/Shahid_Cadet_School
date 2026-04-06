import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Calendar, Upload, Inbox, Loader2 } from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const MyAssignments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: assignments = [],
    isPending,
  } = useQuery({
    queryKey: ["my-assignments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assignments/my-assignment?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="max-w-6xl mx-auto pb-10 px-4">
      
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-white tracking-tight">
          My Assignments
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          View your class assignments and submit them before the deadline.
        </p>

        <div className="h-[2px] w-16 bg-blue-500 rounded-full mt-4"></div>
      </div>

      {/* Loading State */}
      {isPending && (
        <div className="flex flex-col items-center justify-center py-24 bg-[#1E293B]/20 rounded-[2.5rem] border border-slate-800/50">
          <Loader2 size={40} className="text-blue-500 animate-spin mb-4" />
          <p className="text-slate-400 font-medium tracking-wide">
            Fetching your assignments...
          </p>
        </div>
      )}

      {/* Assignments Grid */}
      {!isPending && assignments.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {assignments.map((a) => (
            <div
              key={a._id}
              className="bg-[#1E293B] border border-slate-800 p-6 rounded-[1.5rem] shadow-xl hover:border-blue-500/30 transition-all group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {a.title}
                  </h4>

                  <span className="inline-block bg-slate-900 text-blue-400 text-[10px] px-3 py-1 rounded-full border border-blue-500/20 mt-1 uppercase font-bold tracking-wider">
                    {a.targetClass || "General"}
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase leading-none">
                    Marks
                  </p>

                  <p className="text-blue-400 font-black text-xl">
                    {a.totalMarks}
                  </p>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-slate-400 text-sm mb-6 italic line-clamp-2 h-10">
                "{a.instructions}"
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Calendar size={14} className="text-rose-500" />

                  <div>
                    <p className="text-[9px] uppercase leading-none">
                      Due Date
                    </p>

                    <p className="text-xs font-semibold text-slate-300">
                      {a.dueDate}
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] px-4 py-2 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20">
                  <Upload size={14} />
                  Submit Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isPending && assignments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 mt-10 bg-[#1E293B]/30 border-2 border-dashed border-slate-800 rounded-[2.5rem] text-center px-6">
          <div className="bg-slate-800/50 p-6 rounded-full mb-6 shadow-inner">
            <Inbox size={48} className="text-slate-600" />
          </div>

          <h3 className="text-2xl font-bold text-white">
            No Assignments Yet!
          </h3>

          <p className="text-slate-500 text-sm mt-2 max-w-sm">
            It seems there are no assignments assigned to you at the moment.
            Check back later.
          </p>
        </div>
      )}

    </div>
  );
};

export default MyAssignments;