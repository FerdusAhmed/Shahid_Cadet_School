import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Mr. Rahman',
      role: 'School Principal',
      image: 'https://i.pravatar.cc/150?img=12',
      review:
        'This School Management Platform has completely transformed our administrative workflow. Everything is faster, safer, and more organized.',
    },
    {
      name: 'Mrs. Ahmed',
      role: 'Teacher',
      image: 'https://i.pravatar.cc/150?img=32',
      review:
        'Managing student records and attendance is now incredibly simple. The cloud system gives us peace of mind.',
    },
    {
      name: 'Imran Hossain',
      role: 'IT Coordinator',
      image: 'https://i.pravatar.cc/150?img=45',
      review:
        'The security and performance of this platform are outstanding. It’s modern, reliable, and very easy to use.',
    },
  ];

  return (
    <section className="py-20 bg-linear-to-r from-base-200 to-base-300 mb-20 ">
      <div className="section-res">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary">Voices of Trust</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            Trusted by schools, teachers, and administrators for secure and
            reliable management solutions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="relative bg-base-100 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
            >
              <FaQuoteLeft className="text-3xl text-primary opacity-20 absolute top-6 left-6" />

              <p className="mb-6 text-gray-600 relative z-10">{item.review}</p>

              {/* Stars */}
              <div className="flex mb-4 text-warning">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full border-2 border-primary"
                />
                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
