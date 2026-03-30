import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-20">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Institution Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4">
                            Shahid Cadet School
                        </h3>
                        <p className="text-sm leading-relaxed">
                            Shahid Cadet School & College is dedicated to academic excellence,
                            discipline, and character development, preparing students for a
                            successful future.
                        </p>
                    </div>

                    {/* Address */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Address
                        </h4>
                        <div className="flex items-start gap-3 text-sm">
                            <MapPin size={18} className="mt-1" />
                            <div>
                                <p>Zindabazar, Sylhet</p>
                                <p>Bangladesh</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Contact
                        </h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                <a href="tel:+8801700000000" className="hover:text-white transition">
                                    +880 17 0000 0000
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                <a href="mailto:info@scsc.edu.bd" className="hover:text-white transition">
                                    info@scsc.edu.bd
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Office Hours */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                            Office Hours
                        </h4>
                        <div className="flex items-start gap-3 text-sm">
                            <Clock size={18} className="mt-1" />
                            <div>
                                <p>Sunday – Thursday: 8:00 AM – 4:00 PM</p>
                                <p>Saturday: 8:00 AM – 1:00 PM</p>
                                <p>Friday: Closed</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 my-8"></div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                    <p>
                        © {new Date().getFullYear()} Shahid Cadet School & College. All Rights Reserved.
                    </p>

                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms & Conditions</a>
                        <a href="/contact" className="hover:text-white transition">Contact</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;