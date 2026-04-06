import React from 'react';

const NoticeBoard = () => {
    const notices = [
        {
            title: "Annual Sports Day 2026",
            date: "15 March 2026"
        },
        {
            title: "Mid-Term Exam Routine Published",
            date: "10 February 2026"
        },
        {
            title: "Admission Open for 2026 Session",
            date: "01 January 2026"
        }
    ];

    return (
      <section className="py-16 bg-white">
        <div className="section-res">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
            Notice Board
          </h2>

          <div className="space-y-6">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="border-l-4 border-blue-600 bg-gray-50 p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">📅 {notice.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default NoticeBoard;
