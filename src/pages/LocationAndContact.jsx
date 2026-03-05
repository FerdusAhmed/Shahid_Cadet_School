import { MapPin, Phone, Mail, Clock } from "lucide-react";

const LocationAndContact = () => {
    return (
        <div className="p-4 md:p-10 space-y-8 bg-gray-50 min-h-screen">
            {/* Main Location Card */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-6">
                    <MapPin className="inline mr-2 text-blue-600" size={32} />
                    Location & Contact
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Main Campus */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-l-4 border-blue-600">
                        <h2 className="text-xl font-black text-blue-600 mb-4">Main Campus - Sylhet</h2>
                        <div className="space-y-3 text-slate-700 font-medium">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                                <p>Shahid Cadet School, Zindabazar, Sylhet, Bangladesh</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-blue-600 flex-shrink-0" />
                                <a href="tel:+8801700000000" className="hover:text-blue-600 transition">
                                    +880 17 0000 0000
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-blue-600 flex-shrink-0" />
                                <a href="mailto:info@scsc.edu.bd" className="hover:text-blue-600 transition">
                                    info@scsc.edu.bd
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p><strong>Mon - Fri:</strong> 8:00 AM - 4:00 PM</p>
                                    <p><strong>Sat:</strong> 8:00 AM - 1:00 PM</p>
                                    <p><strong>Sunday:</strong> Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Office */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-600">
                        <h2 className="text-xl font-black text-green-600 mb-4">Admin Office</h2>
                        <div className="space-y-3 text-slate-700 font-medium">
                            <div className="flex items-start gap-3">
                                <MapPin size={20} className="text-green-600 mt-1 flex-shrink-0" />
                                <p>Building-A, Ground Floor, Main Campus</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={20} className="text-green-600 flex-shrink-0" />
                                <a href="tel:+8801800000001" className="hover:text-green-600 transition">
                                    +880 18 0000 0001
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={20} className="text-green-600 flex-shrink-0" />
                                <a href="mailto:admin@scsc.edu.bd" className="hover:text-green-600 transition">
                                    admin@scsc.edu.bd
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={20} className="text-green-600 mt-1 flex-shrink-0" />
                                <div>
                                    <p><strong>Contact Time:</strong></p>
                                    <p>9:00 AM - 3:00 PM (Weekdays)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-slate-800 mb-6">Send us a Message</h2>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    />
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LocationAndContact;
