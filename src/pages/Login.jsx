import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Login Successful!");
                navigate("/");
            })
            .catch((error) => console.error(error.message));
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border">
            <h2 className="text-2xl font-black mb-6 text-slate-800 uppercase tracking-tight">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input name="email" type="email" placeholder="Email" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-blue-500" required />
                <input name="password" type="password" placeholder="Password" className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:border-blue-500" required />
                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition">Enter Dashboard</button>
            </form>
        </div>
    );
};

export default Login;