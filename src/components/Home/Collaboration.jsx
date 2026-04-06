import React from 'react';

// Made by Emon
const Collaboration = () => {
  const sponsors = [
    "Panjabi Guide", "Edu Board", "Creative IT", "Study Care",
    "Book Worm", "Scholar Lab", "Future Pen", "Exam Aid",
    "Knowledge Co", "Tutor Point", "Science Academy", "Alpha Library"
  ];

  const marqueeSponsors = [...sponsors, ...sponsors];

  return (
    <div className=" py-16 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.3em] uppercase text-blue-500 mb-3">
          Our Partners
        </p>
        <h2 className="text-3xl font-bold text-white">
          Trusted{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Collaborators
          </span>
        </h2>
      </div>

      <div className="relative flex w-full overflow-hidden mb-4 ">
        <div className="flex flex-nowrap gap-4 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
          {marqueeSponsors.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700/60 bg-slate-900/60 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300 cursor-default whitespace-nowrap group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors" />
              <span className="text-slate-400 font-medium text-sm tracking-wide group-hover:text-slate-200 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div className="relative flex w-full overflow-hidden ">
        <div className="flex flex-nowrap gap-4 animate-[marquee-reverse_45s_linear_infinite] hover:[animation-play-state:paused]">
          {[...marqueeSponsors].reverse().map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700/60 bg-slate-900/60 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300 cursor-default whitespace-nowrap group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 group-hover:bg-purple-400 transition-colors" />
              <span className="text-slate-400 font-medium text-sm tracking-wide group-hover:text-slate-200 transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

    </div>
  );
};

export default Collaboration;