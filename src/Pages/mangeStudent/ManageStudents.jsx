import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

import StudentCard from './StudentCard';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const ManageStudents = () => {
  const axiosSecure = useAxiosSecure();
  const [isDepartment, setIsDepartment] = useState('');
  // const [isAllStudent, setIsAllStudent] = useState(0);
  const [isAllPage, setIsAllPage] = useState(0);
  const [currentPage,setCurrentPage]=useState(0)
  const limit = 8;
  const { data: studentData =[], isLoading } = useQuery({
    queryKey: ['all-students',isDepartment,limit,currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student?department=${isDepartment}&limit=${limit}&skip=${currentPage * limit}`);
      const totalStudent = res.data.allStudent / limit
      setIsAllPage(Math.ceil(totalStudent));
      return res.data.result;
    }
  });
  console.log(currentPage);
  if (isLoading) {
   return <NexusLoader></NexusLoader>
 }
  return (
    <div>
      <div>
        {/* title and subtitle */}
        <div className=" text-center mb-8 space-y-2 ">
          <h1 className=" text-2xl font-bold">Today’s Feedback</h1>
          <p>Teachers can provide one feedback per subject each day</p>
        </div>
        {/* select with class */}
        <div className="md:max-w-[350px] w-full mb-3">
          <select
            name="department"
            value={isDepartment}
            onChange={e => setIsDepartment(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
          >
            <option value="">Not Set</option>
            <option value="class-6">Class 6</option>
            <option value="class-7">Class 7</option>
            <option value="class-8">Class 8</option>
            <option value="class-9">Class 9</option>
            <option value="class-10">Class 10</option>
          </select>
        </div>
        {/* select with subject */}
      </div>
      <div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {studentData.map(student => (
          <StudentCard
            key={student?._id}
            student={student}
            studentData={studentData}
          ></StudentCard>
        ))}
      </div>

      <div className=" text-center my-4 space-x-2">
        {currentPage === 0 || (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className=" btn btn-xs"
          >
            <SlArrowLeft />
          </button>
        )}

        {Array(isAllPage)
          .keys()
          .map(i => (
            <button
              onClick={() => setCurrentPage(i)}
              className={`btn  btn-xs  ${currentPage === i && 'btn-info text-white'}`}
            >
              {i + 1}
            </button>
          ))}

        {currentPage < isAllPage - 1 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="btn btn-xs"
          >
            <SlArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;