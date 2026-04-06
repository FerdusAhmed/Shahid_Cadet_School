import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Twitter, ArrowRight } from "lucide-react";
import logoimg from '../../assets/NS1.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Academic Calendar', path: '/calendar' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  const platformLinks = [
    { name: 'Student Portal', path: '/portal/student' },
    { name: "Teacher's Dashboard", path: '/portal/teacher' },
    { name: 'Parent Portal', path: '/portal/parent' },
    { name: 'Online Payments', path: '/payments' },
    { name: 'Exam Results', path: '/results' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. School Branding & Socials */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-xl overflow-hidden shadow-md group-hover:scale-110 transition-transform">
                <img className="w-full h-full object-cover" src={logoimg} alt="Nexus School Logo" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Nexus School
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering the next generation with modern education and digital management. 
              Bridging the gap between students, teachers, and parents through innovation.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, link: "#" },
                { Icon: Instagram, link: "#" },
                { Icon: Twitter, link: "#" },
                { Icon: Linkedin, link: "#" }
              ].map((social, index) => (
                <a 
                  key={index} 
                  href={social.link} 
                  className="p-2.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-slate-500 hover:text-indigo-600 flex items-center group text-sm"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Platform Links */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 text-lg">Platform</h3>
            <ul className="space-y-4 text-sm">
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className="text-slate-900 font-bold mb-6 text-lg">Get in Touch</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-indigo-50 p-2 rounded-lg">
                    <MapPin className="text-indigo-600" size={18} />
                </div>
                <span className="text-slate-500 text-sm leading-snug">
                  123 Education Ave, Knowledge City, BD 1200
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <Phone className="text-indigo-600" size={18} />
                </div>
                <span className="text-slate-500 text-sm">+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <Mail className="text-indigo-600" size={18} />
                </div>
                <span className="text-slate-500 text-sm">support@nexusschool.edu</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} <span className="font-semibold text-slate-600">Nexus School</span>. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <Link to="/privacy" className="text-slate-400 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-slate-400 hover:text-indigo-600 transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="text-slate-400 hover:text-indigo-600 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;