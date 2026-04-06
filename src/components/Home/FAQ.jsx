import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Who can use this School Management Platform?",
      answer:
        "Our platform is designed for administrators, teachers, students, and parents with secure role-based access control.",
    },
    {
      question: "Is the platform secure?",
      answer:
        "Yes, we implement secure authentication and authorization mechanisms to ensure data privacy and protection.",
    },
    {
      question: "Can parents track student performance?",
      answer:
        "Parents can monitor attendance, exam results, assignments, and receive real-time academic updates.",
    },
    {
      question: "Does it support attendance and exam management?",
      answer:
        "Teachers can manage attendance, conduct exams, publish results, and track student academic performance efficiently.",
    },
    {
      question: "Is it mobile-friendly?",
      answer:
        "Yes, the platform is fully responsive and optimized for desktop, tablet, and mobile devices.",
    },
    {
      question: "Can reports be generated?",
      answer:
        "Yes, administrators and teachers can generate detailed academic and performance reports anytime.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 lg:px-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-2xl mx-auto">
          Everything you need to know about our School Management Platform.
        </p>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                         rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full"
              >
                <span className="font-semibold text-gray-800 dark:text-white">
                  {faq.question}
                </span>

                {/* Chevron Icon */}
                <FiChevronDown
                  className={`text-xl transition-transform duration-300 
                  ${
                    openIndex === index
                      ? "rotate-180 text-blue-600"
                      : "rotate-0 text-gray-500 dark:text-gray-400"
                  }`}
                />
              </button>

              {/* Animated Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-40 mt-4" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
