import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { CheckCircle, AlertCircle, UserPlus } from 'lucide-react';

const Signup = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '', role: 'teacher' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        
        console.log("Attempting signup with role:", form.role);
        
        try {
            await register(form.email, form.password, form.role);
            setSuccess('Account created successfully! Redirecting to login...');
            console.log("Signup successful, redirecting to login");
            
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Create Account</h1>
                    <p className="text-gray-600 mb-8">Sign up as a teacher or admin</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex gap-3">
                            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-red-700 font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex gap-3">
                            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-green-700 font-medium">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none transition"
                            >
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none transition"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-green-500 focus:outline-none transition"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white p-3 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <UserPlus size={20} />
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-600 text-center mb-4">Already have an account?</p>
                        <Link to="/login" className="inline-block w-full text-center bg-gray-100 text-gray-800 p-3 rounded-xl font-bold hover:bg-gray-200 transition">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
