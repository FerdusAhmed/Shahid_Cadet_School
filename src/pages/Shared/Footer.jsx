import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-black text-blue-400 mb-4">SCSC Portal</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Shahid Cadet School is committed to providing quality education and developing responsible citizens.
                        </p>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-black text-blue-400 mb-4 uppercase tracking-wide text-sm">Location</h4>
                        <div className="space-y-3">
                            <div className="flex gap-3 text-slate-400 text-sm">
                                <MapPin size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-bold text-white">Main Campus</p>
                                    <p>Zindabazar, Sylhet</p>
                                    <p>Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-black text-blue-400 mb-4 uppercase tracking-wide text-sm">Contact</h4>
                        <div className="space-y-3 text-slate-400 text-sm">
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                                <a href="tel:+8801700000000" className="hover:text-blue-400 transition">
                                    +880 17 0000 0000
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-blue-400 flex-shrink-0" />
                                <a href="mailto:info@scsc.edu.bd" className="hover:text-blue-400 transition">
                                    info@scsc.edu.bd
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={18} className="text-blue-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p><strong>Mon - Fri:</strong> 8 AM - 4 PM</p>
                                    <p><strong>Sat:</strong> 8 AM - 1 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social & Quick Links */}
                    <div>
                        <h4 className="font-black text-blue-400 mb-4 uppercase tracking-wide text-sm">Follow Us</h4>
                        <div className="flex gap-4 mb-6">
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition">
                                <Instagram size={18} />
                            </a>
                        </div>
                        <h4 className="font-black text-blue-400 mb-3 uppercase tracking-wide text-sm">Quick Links</h4>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="/admission" className="hover:text-blue-400 transition">Admission</a></li>
                            <li><a href="/all-students" className="hover:text-blue-400 transition">Students</a></li>
                            <li><a href="/teachers" className="hover:text-blue-400 transition">Teachers</a></li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 my-8"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Shahid Cadet School, Sylhet. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
                        <a href="/location" className="hover:text-blue-400 transition">Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;