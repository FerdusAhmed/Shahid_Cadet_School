import React from "react";
import Container from "../../../Layouts/Container";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import heroImg1 from "../../../assets/hero-1.webp";
import heroImg2 from "../../../assets/hero-2.webp";
import heroImg3 from "../../../assets/hero-3.webp";
import heroImg4 from "../../../assets/hero-4.webp";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
  const heroImgs = [
    { id: 1, img: heroImg1 },
    { id: 2, img: heroImg2 },
    { id: 3, img: heroImg3 },
    { id: 4, img: heroImg4 },
  ];

  return (
    <section className="py-12 md:py-20 lg:py-28 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content: Text & CTA */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-full mb-2">
              #1 Trusted School Management System
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1]">
              Shaping the Future with{" "}
              <span className="text-blue-600">Digital Excellence</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Experience a seamless journey from admission to graduation. We
              empower students, engage parents, and simplify administration for
              a smarter tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/admission">
                <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition duration-300 transform hover:-translate-y-1">
                  Apply for Admission
                </button>
              </Link>

              <Link to="/result">
                <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-blue-200 transition duration-300">
                  View Result & Marksheet
                </button>
              </Link>
            </div>

            {/* Added dynamic stats to attract parents/students */}
            <div className="pt-8 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
                    10k+
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-white"></div>
                </span>
                <p className="font-medium">
                  <span className="text-gray-900 font-bold">
                    Active Students
                  </span>{" "}
                  & Counting
                </p>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
              <div className="flex items-center gap-1 text-yellow-500">
                {"★".repeat(5)}{" "}
                <span className="ml-1 text-gray-900 font-bold">4.9/5</span>
              </div>
            </div>
          </div>

          {/* Right Content: Modern Image Preview */}
          <div className="relative group">
            {/* Dashboard Image / Student Image */}
            <div className="relative z-10 w-full h-[350px] md:h-[500px] bg-linear-to-br from-blue-50 to-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
              {/* In a real project, replace this with an <img> tag */}

              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                effect={"fade"}
                pagination={{
                  clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mySwiper w-full"
              >
                {heroImgs.map((heroImg) => (
                  <SwiperSlide key={heroImg.id} className="w-full">
                    <img
                      className="w-full h-full object-cover"
                      src={heroImg.img}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Decorative elements - matching the modern vibe */}
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-bounce"></div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-blue-500 rounded-full opacity-10 blur-[80px]"></div>

            {/* Small Floating Card */}
            <div
              className="absolute top-10 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-blue-50 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs text-gray-400">Latest Update</p>
                  <p className="text-sm font-bold text-gray-800">
                    Result Published!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
