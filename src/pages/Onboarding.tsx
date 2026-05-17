import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";

import heroGym from "@/assets/hero-gym.jpg";
import heroHome from "@/assets/hero-home.jpg";

const slides = [
  {
    title: "Train Anywhere",
    subtitle:
      "Gym or home workouts designed to keep you consistent every single day.",
    image: heroGym,
  },
  {
    title: "Build Your Streak",
    subtitle:
      "Track workouts, XP, calories burned, and daily progress beautifully.",
    image: heroHome,
  },
  {
    title: "Unlock Your Best Body",
    subtitle:
      "Stay disciplined, train smarter, and elevate your fitness journey.",
    image: heroGym,
  },
];

const Onboarding = () => {
  const navigate = useNavigate();

  const finishOnboarding = () => {
    localStorage.setItem(
      "opheflow-onboarding",
      "done"
    );

    navigate("/login");
  };

  return (
    <div className="h-screen bg-black text-white overflow-hidden">
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-screen w-full">
              {/* Background */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/90" />

              {/* Logo */}
              <div className="absolute top-8 left-6 z-20 flex items-center gap-3">
                <img
                  src="/opheflow_logo.png"
                  alt="logo"
                  className="w-10 h-10"
                />

                <h1 className="text-xl font-black tracking-wide">
                  OpheFlow
                </h1>
              </div>

              {/* Skip */}
              {index !== slides.length - 1 && (
                <button
                  onClick={finishOnboarding}
                  className="absolute top-8 right-6 z-20 text-slate-300 text-sm"
                >
                  Skip
                </button>
              )}

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-14">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                  }}
                  className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-[32px] p-7"
                >
                  <h1 className="text-4xl font-black leading-tight mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-slate-300 text-lg leading-relaxed mb-8">
                    {slide.subtitle}
                  </p>

                  {index === slides.length - 1 ? (
                    <Button
                      onClick={finishOnboarding}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-7 rounded-2xl text-lg font-bold"
                    >
                      Start Training
                    </Button>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="text-orange-400 font-medium">
                        Swipe to continue
                      </div>

                      <div className="text-2xl">
                        →
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Onboarding;