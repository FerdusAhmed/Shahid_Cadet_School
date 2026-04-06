import React from 'react';

const AcademicPrograms = () => {
    const programs = [
        {
            title: "Primary Section",
            description: "Classes 1-5 with strong foundation in basic subjects and moral education."
        },
        {
            title: "Secondary Section",
            description: "Classes 6-10 focusing on science, arts, and commerce streams."
        },
        {
            title: "Higher Secondary",
            description: "Classes 11-12 with advanced academic curriculum and career guidance."
        }
    ];

    return (
      <section className="py-16 bg-gray-100">
        <div className="section-res">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-600">
            Academic Programs
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {program.title}
                </h3>
                <p className="text-gray-600">{program.description}</p>
                {/* <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Learn More
                            </button> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default AcademicPrograms;
