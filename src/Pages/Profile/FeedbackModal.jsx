import React from 'react';
import { FiHexagon, FiX, FiArrowRight } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { HiHomeModern } from 'react-icons/hi2';

const FeedbackModal = ({ setIsFeedback,feedbacks }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm border-b-2  ">
      {/* Modal Container */}
      <div className="relative w-full max-w-md p-[2px] overflow-auto rounded-3xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 h-[400px] ">
        <div className="relative bg-slate-900 rounded-[22px] p-8 text-white">
          {/* Close Button */}
          <button
            onClick={() => setIsFeedback(false)}
            className="absolute p-2 transition-colors top-4 right-4 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl"
          >
            <FiX size={20} />
          </button>

          {/* Icon Header */}
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-white/10">
            <FiHexagon className="text-cyan-400 animate-pulse" size={32} />
          </div>

          {/* Text Content */}
          {feedbacks.map(feedback => (
            <div key={feedback._id} className="space-y-2 border-b mb-2 ">
              <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 flex items-center space-x-2">
                <span>
                  <FaBook size={20} className=" text-blue-400 " />
                </span>{' '}
                <span>{feedback?.subject}</span>
              </h2>
              <h3 className="text-sm font-medium tracking-widest uppercase text-cyan-400 flex items-center space-x-2">
                <span>
                  <HiHomeModern size={20} className=" text-blue-400 " />{' '}
                </span>
                <span>{feedback?.class}</span>
              </h3>
              <p className="pt-2 leading-relaxed text-slate-400 mb-2">
                {feedback?.feedback}
              </p>
            </div>
          ))}

          {/* Action Button
          <button className="flex items-center justify-center w-full gap-2 py-4 mt-8 font-bold transition-all duration-300 group rounded-2xl bg-white text-slate-950 hover:bg-cyan-400">
            Initiate Warp
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;