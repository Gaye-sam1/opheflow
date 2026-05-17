import { motion } from "framer-motion";

export default function AnimatedSplash() {
  return (
    <div className="fixed inset-0 bg-[#050816] overflow-hidden flex items-center justify-center z-50">
      {/* Background Glow */}
      <div className="absolute w-[300px] h-[300px] bg-orange-500/20 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <motion.div
          initial={{
            scale: 0.7,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative"
        >
          {/* Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-orange-500/30 blur-2xl scale-125" />

          <img
            src="/opheflow_logo.png"
            alt="OpheFlow"
            className="relative w-28 h-28 object-contain"
          />
        </motion.div>

        {/* App Name */}
        <motion.h1
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className="mt-8 text-4xl font-black tracking-wide text-white"
        >
          OpheFlow
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-3 text-slate-400 text-base tracking-wide"
        >
          Elevate Your Fitness Journey
        </motion.p>

        {/* Loader */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.2,
          }}
          className="mt-10 flex gap-2"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce" />
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-bounce [animation-delay:0.3s]" />
        </motion.div>
      </div>
    </div>
  );
}