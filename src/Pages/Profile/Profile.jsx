import React, { useContext, useState } from 'react';
import { 
  Mail, Shield, Calendar, MapPin, 
  Edit3, Camera, GraduationCap, X, Save, Phone, User, Loader2
} from 'lucide-react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import NexusLoader from '../../components/Nexusloader/Nexusloader';
import Swal from 'sweetalert2';
import useRole from '../../Hooks/useRole';
import FeedbackModal from './FeedbackModal';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [role] = useRole();
  const [isFeedback,setIsFeedback]=useState(false)

  // --- Fetch Profile Data ---
  const { data: dbUser, isLoading, refetch } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // --- fetch feedback data 
  const { data:feedbacks} = useQuery({
    queryKey: ['feedback',user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/student/feedback?email=${user?.email}`);
      return res.data

    }
  })

  console.log(feedbacks)
 
  if (isLoading) return <NexusLoader />;

  const userImg = user?.photoURL || "https://i.pravatar.cc/150?img=11";
  const userRole = dbUser?.role || "Student";

  // --- Handle Update (PATCH) ---
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      phone: form.phone.value,
      address: form.address.value,
      department : form.department.value
    };

    try {
      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedData);
      
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        await refetch();
        setModalOpen(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Profile Updated",
          showConfirmButton: false,
          timer: 1500,
          background: '#1E293B',
          color: '#fff'
        });
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      {/* --- COVER & AVATAR SECTION --- */}
      <div className="relative mb-24">
        <div className="h-48 w-full bg-linear-to-r from-blue-600 to-indigo-800 rounded-[2.5rem] shadow-lg"></div>

        <div className="absolute -bottom-16 left-8 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img
              referrerPolicy="no-referrer"
              src={userImg}
              alt="Profile"
              className="w-36 h-36 rounded-4xl border-4 border-[#0F172A] object-cover shadow-2xl transition-transform group-hover:scale-[1.02]"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-xl border-2 border-[#0F172A] text-white hover:bg-blue-700 transition-colors">
              <Camera size={16} />
            </button>
          </div>

          <div className="pb-4">
            <h1 className="text-3xl font-black text-white">
              {dbUser?.name || user?.displayName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-xs font-bold uppercase tracking-widest">
                {userRole}
              </span>
              <span className="text-slate-400 text-sm flex items-center gap-1">
                <MapPin size={14} /> {dbUser?.address || 'Sylhet, Bangladesh'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="absolute -bottom-12 right-8 flex items-center gap-2 px-6 py-3 bg-[#1E293B] hover:bg-slate-800 border border-slate-700 text-white rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* --- DETAILS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
        <div className="md:col-span-2">
          <section className="bg-[#1E293B] p-8 rounded-4xl border border-slate-700 shadow-sm h-full">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Shield size={20} className="text-blue-500" /> Account Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <InfoBox
                label="Full Name"
                value={dbUser?.name || user?.displayName}
                icon={<User size={16} />}
              />
              <InfoBox
                label="Email Address"
                value={dbUser?.email}
                icon={<Mail size={16} />}
              />
              <InfoBox
                label="Phone"
                value={dbUser?.phone || 'Not Set'}
                icon={<Phone size={16} />}
              />
              <InfoBox
                label="Department"
                value={
                  dbUser?.department
                    ? dbUser.department.replace('-', ' ').toUpperCase()
                    : 'Computer Science'
                }
                icon={<GraduationCap size={16} />}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-linear-to-br from-blue-600/10 to-transparent p-8 rounded-4xl border border-blue-500/20">
            <h4 className="font-bold text-blue-400 mb-4 uppercase text-xs tracking-widest">
              Performance
            </h4>
            <div className="space-y-4">
              <StatItem label="Attendance" value="99%" />
              <StatItem label="Account" value="Active" />
              <StatItem label="Joined" value="Jan 2026" />
              <div>
                {role === 'student' && (
                  <div>
                    {feedbacks.length === 0 || (
                      <div>
                        <button
                          onClick={() => setIsFeedback(true)}
                          className=" btn btn-info btn-xs capitalize text-white"
                        >
                          your-feedback
                        </button>
                        <div>
                          {isFeedback && (
                            <div>
                              <FeedbackModal
                                setIsFeedback={setIsFeedback}
                                feedbacks={feedbacks}
                              ></FeedbackModal>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#1E293B] border border-slate-700 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
              <h2 className="text-xl font-bold text-white">Update Profile</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 hover:bg-slate-700 rounded-xl text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-8 space-y-5">
              <ModalInput
                label="Display Name"
                name="name"
                defaultValue={dbUser?.name || user?.displayName}
              />

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">
                  Phone Number
                </label>
                <input
                  name="phone"
                  defaultValue={dbUser?.phone}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">
                  Location / Address
                </label>
                <input
                  name="address"
                  defaultValue={dbUser?.address}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">
                  Deparment
                </label>

                <select
                  name="department"
                  defaultValue={`${dbUser?.department}`}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all"
                >
                  <option value="Not set">Not Set</option>
                  <option value="class-6">Class 6</option>
                  <option value="class-7">Class 7</option>
                  <option value="class-8">Class 8</option>
                  <option value="class-9">Class 9</option>
                  <option value="class-10">Class 10</option>
                </select>
              </div>

              <button
                disabled={isUpdating}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
              >
                {isUpdating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} /> Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Components ---
const InfoBox = ({ label, value, icon }) => (
  <div className="space-y-1.5">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 italic">
      {icon} {label}
    </p>
    <div className="text-slate-200 font-medium text-sm bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
      {value || "Not Set"}
    </div>
  </div>
);

const ModalInput = ({ label, name, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-widest">{label}</label>
    <input 
      name={name} 
      defaultValue={defaultValue} 
      className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white focus:border-blue-500 outline-none text-sm transition-all" 
    />
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 last:border-0">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm font-black text-white">{value}</span>
  </div>
);

export default Profile;