import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";

const Admission = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    fatherPhone: "",
    motherPhone: "",
    dob: "",
    class: "Play",
    address: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = [
    "Play", "Nursery", "KG", "1", "2", "3", "4", "5",
    "6", "7", "8", "9", "10", "11", "12"
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      if (file) {
        setFormData((prev) => ({ ...prev, photo: file }));
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Note: Real file uploads usually require Firebase Storage. 
      // For now, we store metadata.
      await addDoc(collection(db, "students"), {
        ...formData,
        photo: formData.photo ? formData.photo.name : null, // Storing filename
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      alert("✅ Application submitted successfully! Our office will contact you soon.");
      
      setFormData({
        firstName: "", lastName: "", fatherName: "", motherName: "",
        fatherPhone: "", motherPhone: "", dob: "", class: "Play",
        address: "", photo: null,
      });
      setPreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Submission failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      {/* Internal CSS for Formal Styling */}
      <style>{`
        .section-title { @apply text-xl font-bold text-blue-900 mb-6 flex items-center gap-2 border-b pb-2; }
        .label { @apply block text-sm font-semibold text-gray-700 mb-1; }
        .input { @apply w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white; }
      `}</style>

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {/* FORM HEADER */}
        <div className="bg-blue-900 p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black italic">SCA</div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Admission Form</h1>
          <p className="text-blue-200 mt-2 font-medium italic">Academic Session 2026-2027</p>
        </div>

        <div className="p-8 md:p-12">
          {/* NOTICE BOX */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-10 rounded-r-xl">
            <h4 className="text-amber-800 font-bold text-sm mb-1 uppercase">Important Instructions:</h4>
            <ul className="text-amber-700 text-sm list-disc ml-5 space-y-1">
              <li>Please provide accurate information as per Birth Certificate.</li>
              <li>Passport size photo must be under 2MB.</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* 1. STUDENT DETAILS */}
            <section>
              <h2 className="section-title">
                <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">1</span>
                Student Basic Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                
                <div>
                  <label className="label">Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="input" required />
                </div>

                <div>
                  <label className="label">Applying for Class</label>
                  <select name="class" value={formData.class} onChange={handleChange} className="input font-semibold text-blue-800">
                    {classes.map((cls) => <option key={cls} value={cls}>Class {cls}</option>)}
                  </select>
                </div>
              </div>
            </section>

            {/* 2. PARENTAL INFO */}
            <section>
              <h2 className="section-title">
                <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">2</span>
                Parental / Guardian Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Father's Full Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                <Input label="Mother's Full Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                <Input label="Father's Phone Number" name="fatherPhone" type="tel" value={formData.fatherPhone} onChange={handleChange} />
                <Input label="Mother's Phone Number" name="motherPhone" type="tel" value={formData.motherPhone} onChange={handleChange} />
              </div>
            </section>

            {/* 3. ADDRESS & PHOTO */}
            <section className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="section-title">Mailing Address</h2>
                <textarea 
                  name="address" 
                  rows="4"
                  value={formData.address} 
                  onChange={handleChange} 
                  placeholder="Street, House No, Village/City..." 
                  className="input resize-none" 
                  required 
                />
              </div>

              <div>
                <h2 className="section-title">Photograph</h2>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-4 hover:border-blue-400 transition-colors">
                  {preview ? (
                    <div className="relative group">
                      <img src={preview} alt="Preview" className="w-32 h-32 rounded-lg object-cover shadow-md" />
                      <button type="button" onClick={() => {setPreview(null); setFormData({...formData, photo: null})}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">✕</button>
                    </div>
                  ) : (
                    <label className="cursor-pointer text-center">
                      <div className="text-gray-400 mb-2">📁 Click to upload photo</div>
                      <input type="file" name="photo" accept="image/*" onChange={handleChange} className="hidden" />
                      <span className="text-xs text-gray-400 italic">PNG, JPG up to 2MB</span>
                    </label>
                  )}
                </div>
              </div>
            </section>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t">
              <button 
                disabled={loading}
                className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold text-white shadow-xl transition-all flex items-center justify-center gap-3
                  ${loading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-800 active:scale-95"}`}
              >
                {loading ? "Processing..." : "Submit Application"}
              </button>
              <p className="text-center md:text-left text-xs text-gray-400 mt-4">
                By submitting this form, you agree to the academy's terms and conditions regarding the admission process.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

/* IMPROVED INPUT COMPONENT */
const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="label">{label} <span className="text-red-500">*</span></label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      className="input"
      placeholder={label}
      required
    />
  </div>
);

export default Admission;