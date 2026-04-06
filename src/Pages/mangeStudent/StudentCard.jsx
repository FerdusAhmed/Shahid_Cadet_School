import React, { useState } from 'react';
import {
  FaUserGraduate,
  FaEnvelope,
  FaFingerprint,
  FaRegCommentDots,
  FaRegCommentAlt,
} from 'react-icons/fa';
import FeedBack from './FeedBack';

const StudentCard = ({ student, studentData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudent, setStudent] = useState();
  const handleClick = id => {
    const singleStudent = studentData.find(s => id === s._id);
    
    setStudent(singleStudent)

    setIsOpen(true);
  };
  

  return (
    <div>
      <div className=" bg-slate-900 p-2">
        {/* Animated Border Container */}
        <div className="relative group p-[2px] rounded-2xl overflow-hidden">
          {/* The Animation Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-75 group-hover:opacity-100 transition-opacity"></div>

          {/* Main Card Content */}
          <div className="relative bg-slate-800 text-white p-8 rounded-2xl w-full backdrop-blur-xl">
            <div className="flex flex-col items-center">
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 p-1 mb-4">
                <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-3xl font-bold">
                  {student?.name?.charAt(0)}
                </div>
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                {student.name}
              </h2>
              <span className="px-3 py-1 mt-2 text-xs font-medium uppercase tracking-wider bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                {student.role}
              </span>

              <div className="mt-6 space-y-3 w-full text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaFingerprint className="text-purple-400" />
                  <span className="font-mono text-[10px]">{student.id}</span>
                </div>
              </div>

              {/* Feedback Button */}
              <button
                onClick={() => handleClick(student?._id)}
                className="mt-8 flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all active:scale-95 group/btn cursor-pointer"
              >
                <FaRegCommentDots className="group-hover/btn:rotate-12 transition-transform" />
                <span>Give Feedback</span>
              </button>

              <p className="mt-4 text-[10px] text-slate-500 italic">
                Joined: {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
      <FeedBack isStudent={isStudent} isOpen={isOpen} setIsOpen={setIsOpen}></FeedBack>
    </div>
  );
};

export default StudentCard;