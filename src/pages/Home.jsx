import { Link } from 'react-router-dom';
import { Users, Bell, CreditCard, GraduationCap, BookOpen, Award, Search } from 'lucide-react';
import schoolLogo from '../assets/logo.png';

const Home = () => {

    return (
        <div className="space-y-8 p-6 md:p-10">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-12 rounded-3xl shadow-xl">
                <div className="flex items-center justify-center gap-6 mb-4">
                    <img src={schoolLogo} alt="Shahid Cadet School" className="h-20 w-20 md:h-24 md:w-24" />
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-black">Welcome to</h1>
                        <h1 className="text-3xl md:text-4xl font-black">Shahid Cadet School</h1>
                    </div>
                </div>
                <p className="text-blue-100 text-lg text-center">Managing education with modern technology</p>
            </div>

            {/* Quick Access Button for Student Search */}
            <Link
                to="/students"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition font-bold text-lg flex items-center justify-center gap-3"
            >
                <Search size={32} />
                My Academic Record
            </Link>



            {/* Main Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Student Info */}
                <Link 
                    to="/all-students"
                    className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-300 transition transform hover:scale-105 cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Student Info</h3>
                        <Users className="text-blue-600 group-hover:text-blue-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">Check profiles and exam results</p>
                    <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                        View Students
                    </button>
                </Link>

                {/* Teachers */}
                <Link 
                    to="/all-teachers"
                    className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-green-300 transition transform hover:scale-105 cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Teachers</h3>
                        <GraduationCap className="text-green-600 group-hover:text-green-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">View faculty directory and qualifications</p>
                    <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition">
                        View Teachers
                    </button>
                </Link>

                {/* Admission */}
                <Link 
                    to="/admission"
                    className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-purple-300 transition transform hover:scale-105 cursor-pointer"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Admission</h3>
                        <BookOpen className="text-purple-600 group-hover:text-purple-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">Apply for admission to our school</p>
                    <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition">
                        Apply Now
                    </button>
                </Link>
            </div>

            {/* Secondary Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Notice Board */}
                <button 
                    onClick={() => alert('Notice Board: Coming soon')}
                    className="group bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition transform hover:scale-105 cursor-pointer text-left"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Notice Board</h3>
                        <Bell className="text-orange-600 group-hover:text-orange-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">Latest updates and announcements</p>
                    <button className="mt-6 w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition">
                        View Notices
                    </button>
                </button>

                {/* Payments */}
                <button 
                    onClick={() => alert('Payment System: Coming soon')}
                    className="group bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg border border-red-200 hover:shadow-xl transition transform hover:scale-105 cursor-pointer text-left"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Payments</h3>
                        <CreditCard className="text-red-600 group-hover:text-red-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">Track monthly school fees</p>
                    <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition">
                        View Payments
                    </button>
                </button>

                {/* Results */}
                <button 
                    onClick={() => alert('Exam Results: Coming soon')}
                    className="group bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-xl transition transform hover:scale-105 cursor-pointer text-left"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-black text-gray-800">Exam Results</h3>
                        <Award className="text-indigo-600 group-hover:text-indigo-800 transition" size={28} />
                    </div>
                    <p className="text-gray-600">Check exam scores and performance</p>
                    <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-700 transition">
                        View Results
                    </button>
                </button>
            </div>

            {/* Info Section */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-black text-gray-800 mb-4">About Shahid Cadet School</h2>
                <p className="text-gray-600 leading-relaxed">
                    Shahid Cadet School is dedicated to providing quality education and character development. 
                    Our state-of-the-art facilities and experienced faculty ensure the best learning environment for students.
                </p>
                <Link to="/location" className="inline-block mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                    View Location & Contact
                </Link>
            </div>
        </div>
    );
};

export default Home;