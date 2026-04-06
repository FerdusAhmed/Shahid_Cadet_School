import {
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Register School",
      description:
        "Admin registers the school and configures academic structure, departments, and sessions.",
      icon: <FaSchool />,
    },
    {
      id: "02",
      title: "Add Teachers & Students",
      description:
        "Securely onboard teachers, students, and staff with role-based access control.",
      icon: <FaUserGraduate />,
    },
    {
      id: "03",
      title: "Manage Academic Activities",
      description:
        "Handle attendance, assignments, exams, and results from a centralized dashboard.",
      icon: <FaChalkboardTeacher />,
    },
    {
      id: "04",
      title: "Track Performance & Reports",
      description:
        "Monitor performance analytics and generate detailed academic reports.",
      icon: <FaChartLine />,
    },
  ];

  return (
    <section
      className="
      relative py-24 px-6 lg:px-20 overflow-hidden transition-colors duration-500
      
      bg-linear-to-br from-blue-100 via-indigo-100 to-purple-100
      dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900
      dark:bg-linear-to-br
    "
    >
      {/* Decorative Gradient Blurs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          How It Works
        </h2>

        {/* Subtitle */}
        <p className="mb-16 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Our School Management Platform simplifies academic and administrative
          operations through a structured and intelligent workflow.
        </p>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700 opacity-40"></div>

          {steps.map((step) => (
            <div key={step.id} className="relative group">
              {/* Connector Dot */}
              <div
                className="hidden lg:flex absolute -top-6 left-1/2 -translate-x-1/2 w-6 h-6 
                              bg-white dark:bg-gray-900 
                              border-4 border-indigo-500 
                              rounded-full z-10"
              ></div>

              <div
                className="
                backdrop-blur-xl 
                bg-white/60 dark:bg-white/10
                border border-white/40 dark:border-white/20
                rounded-2xl p-8 shadow-lg
                hover:scale-105 hover:shadow-2xl
                transition duration-500
              "
              >
                {/* Icon */}
                <div
                  className="text-4xl mb-4 flex justify-center 
                                text-indigo-600 dark:text-indigo-400
                                group-hover:rotate-12 transition duration-500"
                >
                  {step.icon}
                </div>

                {/* Step */}
                <div
                  className="text-sm font-semibold mb-2 
                                text-indigo-500 dark:text-indigo-300"
                >
                  Step {step.id}
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-semibold mb-3 
                               text-gray-800 dark:text-white"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed 
                              text-gray-600 dark:text-gray-300"
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
