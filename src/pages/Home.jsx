import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
// --- IMPORT THE PHOTO HERE ---
import principalPhoto from "../assets/principal.png";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [form, setForm] = useState({ id: "", dob: "" });

  const fees = [
    { class: "Play - KG", monthly: "3,500 BDT", admission: "12,000 BDT" },
    { class: "Class 1 - 5", monthly: "4,500 BDT", admission: "15,000 BDT" },
    { class: "Class 6 - 8", monthly: "5,500 BDT", admission: "18,000 BDT" },
    { class: "Class 9 - 12", monthly: "7,500 BDT", admission: "22,000 BDT" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.id === "12345" && form.dob === "2005-01-01") {
      alert("Welcome Student!");
      setShowLogin(false);
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pt-16">
      
      {/* --- HERO SECTION WITH OVERLAY --- */}
      <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756ebafe1?q=80&w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5">
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
              Now Enrolling for 2026 Session
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] mb-6 tracking-tight">
              SHAHID CADET <br /> <span className="text-blue-400">ACADEMY.</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mb-10 leading-relaxed font-light">
              Fostering excellence through discipline, rigorous academics, and character development. We prepare the next generation of civil and military leaders.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/admission" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold shadow-2xl transition-all transform hover:-translate-y-1">
                Apply for Admission
              </Link>
              <button onClick={() => setShowLogin(true)} className="bg-blue-600/20 backdrop-blur-md border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all">
                Student Portal
              </button>
            </div>
          </div>

          <div className="hidden md:block md:w-2/5 bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl">
            <h3 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 italic">Notice Board</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start border-b border-white/5 pb-2">
                <span className="bg-blue-500 px-2 py-1 rounded text-[10px]">NEW</span>
                <p>Annual Sports Meet 2026 registration starts tomorrow.</p>
              </li>
              <li className="flex gap-3 items-start border-b border-white/5 pb-2">
                <span className="bg-gray-500 px-2 py-1 rounded text-[10px]">UPDATE</span>
                <p>Class 10 Model Test schedule published.</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-gray-500 px-2 py-1 rounded text-[10px]">UPDATE</span>
                <p>New hostel guidelines for the upcoming session.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- PRINCIPAL'S SECTION --- */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-blue-900 rounded-2xl"></div>
            {/* --- PHOTO UPDATED HERE --- */}
            <img 
              src={principalPhoto} 
              alt="Principal MD Abu Sayed" 
              className="relative z-10 rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl w-full object-cover" 
            />
          </div>
          <div className="md:w-1/2">
            <span className="text-blue-600 font-black tracking-[0.3em] text-xs uppercase mb-4 block">Administration</span>
            <h2 className="text-4xl font-black text-blue-950 mb-8 tracking-tight">Leading with Vision</h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p className="italic font-serif">"At Shahid Cadet Academy, we don't just provide information; we facilitate transformation. Our goal is to see every student leave these gates as a person of character."</p>
              <div>
                <h4 className="font-black text-blue-900 text-xl tracking-wide uppercase">MD Abu Sayed</h4>
                <p className="text-sm font-bold text-gray-400">Principal & Chief Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEE SECTION --- */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-black text-blue-950 mb-4">Investment in Future</h2>
        <p className="text-gray-500 mb-16 italic">Transparent fee structure with no hidden costs.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
          {fees.map((f, i) => (
            <div key={i} className={`p-8 ${i % 2 === 0 ? 'bg-white' : 'bg-blue-900 text-white'}`}>
              <h4 className="text-sm font-black uppercase mb-4 opacity-70">{f.class}</h4>
              <p className="text-2xl font-bold mb-1">{f.monthly}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-6">Per Month</p>
              <div className="h-px bg-current opacity-10 mb-6"></div>
              <p className="text-sm font-medium">{f.admission}</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Admission</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-950 text-blue-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <img src={logo} alt="Logo" className="w-12 h-12 bg-white rounded p-1 mb-6" />
            <h2 className="text-2xl font-black text-white mb-4">SHAHID CADET ACADEMY</h2>
            <p className="text-blue-300/60 max-w-sm">The leading institution for cadet coaching and comprehensive national curriculum education since 1998.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/admission" className="hover:text-white transition">Admission Process</Link></li>
              <li><Link to="/teachers" className="hover:text-white transition">Our Faculty</Link></li>
              <li><Link to="/notice" className="hover:text-white transition">Board Notices</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>📍 Gazipur, Bangladesh</li>
              <li>📞 +880 1234 567 890</li>
              <li>✉️ info@shahidcadet.edu</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center text-xs text-blue-300/40">
          &copy; 2026 Shahid Cadet Academy. All Rights Reserved.
        </div>
      </footer>

      {/* --- LOGIN MODAL --- */}
      {showLogin && (
        <div className="fixed inset-0 bg-blue-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 relative">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-950 font-bold transition">✕</button>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-blue-950">Portal Login</h2>
              <p className="text-gray-400 text-sm mt-2">Authorized access for students only.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs font-black text-blue-900 uppercase mb-2 block tracking-widest">Student ID</label>
                <input type="text" placeholder="e.g. 12345" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required />
              </div>
              <div>
                <label className="text-xs font-black text-blue-900 uppercase mb-2 block tracking-widest">Date of Birth</label>
                <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 transition-all" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} required />
              </div>
              <button className="w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-xl hover:bg-blue-800 transition-all transform active:scale-95">
                Sign In to Portal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;