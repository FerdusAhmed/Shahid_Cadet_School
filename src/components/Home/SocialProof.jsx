import React from 'react';

const sponsors = [
    { n: "Panjabi Guide", i: "📖" }, { n: "Edu Board", i: "🎓" },
    { n: "Creative IT", i: "💡" }, { n: "Study Care", i: "📚" },
    { n: "Book Worm", i: "🔬" }, { n: "Scholar Lab", i: "🧪" }
];

const stats = [
    { v: "10k+", l: "Students" }, { v: "500+", l: "Teachers" },
    { v: "98%", l: "Success" }, { v: "15+", l: "Years" }
];

const SocialProof = () => {
    return (
        <section className=" py-16 font-sans select-none">
            <h1 className="text-blue-400 text-2xl font-bold tracking-[0.2em] uppercase text-center mb-5">
                <span className='text-white'>Trusted</span> Community
            </h1>
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 px-4">
                {stats.map((s, idx) => (
                    <div key={idx} className="text-center border-l border-slate-800 first:border-none">
                        <h3 className="text-3xl font-bold text-white">{s.v}</h3>
                        <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">{s.l}</p>
                    </div>
                ))}
            </div>

            {/* Marquee */}
            <div className="relative flex overflow-hidden ">
                <div className="flex gap-8 animate-[marquee_25s_linear_infinite] whitespace-nowrap">
                    {[...sponsors, ...sponsors].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 px-6 py-3 bg-slate-900/40 border border-slate-800 rounded-full">
                            <span className="text-lg">{item.i}</span>
                            <span className="text-slate-300 font-medium text-sm">{item.n}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
        </section>
    );
};

export default SocialProof;