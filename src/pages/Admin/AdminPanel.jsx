import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Trash2, Megaphone, MapPin, Send } from "lucide-react";

const AdminPanel = () => {
    // we no longer require auth here; component is always shown
    const user = useContext(AuthContext)?.user;

    return (
        <div className="p-6 lg:p-10 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Portal</h1>
                    <p className="text-blue-600 font-bold text-xs flex items-center gap-1 uppercase tracking-widest mt-1">
                        <MapPin size={14}/> Sylhet Campus
                    </p>
                </div>
                <button className="w-full md:w-auto bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition active:scale-95">
                    Add New Student
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border-t-8 border-blue-600">
                    <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-700"><Megaphone size={20} className="text-blue-600"/> Post Notice</h3>
                    <textarea placeholder="Announcement text..." className="w-full border-2 border-gray-100 bg-gray-50 p-4 rounded-2xl h-40 focus:border-blue-500 focus:bg-white outline-none transition-all resize-none"></textarea>
                    <button className="mt-4 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition">
                        <Send size={18}/> Publish
                    </button>
                </div>

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
                    <div className="p-6 bg-gray-50/50 border-b font-black text-xs text-gray-400 tracking-widest uppercase">Student Database</div>
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-blue-50/20 transition">
                                <td className="p-6 font-bold text-blue-600">S-101</td>
                                <td className="p-6 font-bold text-slate-700">Ferdus Ahmed</td>
                                <td className="p-6 text-right"><button className="text-red-300 hover:text-red-600"><Trash2 size={20}/></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;