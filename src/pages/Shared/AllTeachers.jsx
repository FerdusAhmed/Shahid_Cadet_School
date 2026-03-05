const AllTeachers = () => {
    const teachers = [
        { name: "Mr. Ahmed", position: "Head of Physics", phone: "017XXXXXXXX" },
        { name: "Ms. Sultana", position: "Senior Math Teacher", phone: "018XXXXXXXX" },
    ];

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-blue-900">Faculty Directory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((t, idx) => (
                    <div key={idx} className="p-5 border rounded-xl hover:shadow-md transition bg-slate-50">
                        <h3 className="font-bold text-lg">{t.name}</h3>
                        <p className="text-blue-600 text-sm font-semibold">{t.position}</p>
                        <p className="text-gray-600 mt-2">📞 {t.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllTeachers;