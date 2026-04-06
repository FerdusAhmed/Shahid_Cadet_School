import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTimes,
  FaPaperPlane,
  FaBook,
  FaPen,
  FaLayerGroup,
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const FeedBack = ({ isOpen, setIsOpen, isStudent }) => {
  const { register, handleSubmit ,reset} = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  
  
  const handleFeedBack = (feedback) => {
    const studentFeedBack = {
      ...feedback,
      studentEmail: isStudent.email,
      studentId: isStudent._id,
      teacherEmail: user.email,
      teacherName: user?.displayName,
      role:isStudent.role
      
      
    };

    axiosSecure.post('/student/feedback', studentFeedBack)
      .then(res => {
        console.log(res.data)
        if (res.data?.message) {
          toast.info(res.data?.message)
        } else {
          toast.info('success-feedback');
        }
          
        
         
          
        
        reset();

        setIsOpen(false)

      }).catch(err => {
      console.log(err)
    })

  }
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* 2. The Modal Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Animated Accent Border Top */}
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaPen className="text-blue-400 text-lg" /> Send Feedback
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form Fields */}
              <form
                onSubmit={handleSubmit(handleFeedBack)}
                className="space-y-5 "
              >
                {/* Field 1: Subject */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 ml-1">
                    Subject
                  </label>
                  <div className="relative">
                    <FaBook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Course Materials"
                      {...register('subject', { required: true })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Field 2: Class */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 ml-1">
                    Class / Section
                  </label>
                  <div className="relative">
                    <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Computer Science - A"
                      {...register('class', { required: true })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Field 3: Feedback Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 ml-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Tell us what you think..."
                    {...register('feedback', { required: true })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 mt-4 cursor-pointer"
                >
                  <FaPaperPlane />
                  Submit Feedback
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FeedBack;