import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Dumbbell,
  BookOpen,
  Flame,
  Trophy,
  Activity,
  Timer,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import heroGym from "@/assets/hero-gym.jpg";
import heroHome from "@/assets/hero-home.jpg";

import { type CompletedWorkout, getCompletedWorkouts } from "@/utils/workoutStorage";

/**
 * Dynamic Stats
 */
const completedWorkouts = getCompletedWorkouts();

const streak =
  Number(localStorage.getItem("opheflow-streak")) || 0;

const totalCalories = completedWorkouts.reduce(
  (acc: number, workout: CompletedWorkout) =>
    acc + (workout.calories || 0),
  0
);

const totalDuration = completedWorkouts.reduce(
  (acc: number, workout: CompletedWorkout) =>
    acc + (workout.duration || 0),
  0
);

const stats = [
  {
    title: `${streak} Day Streak`,
    icon: Trophy,
    value: "🔥",
  },
  {
    title: `${completedWorkouts.length} Workouts`,
    icon: Dumbbell,
    value: "💪",
  },
  {
    title: `${totalCalories} Calories`,
    icon: Activity,
    value: "⚡",
  },
  {
    title: `${Math.floor(totalDuration / 60)} Hours`,
    icon: Timer,
    value: "⏱",
  },
];

const Index = () => {
  return (
    <div className="bg-background text-foreground min-h-screen pb-24">
      {/* HERO SECTION */}
      <section className="relative h-[48vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={heroGym}
          alt="Gym interior"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 container mx-auto px-5 pb-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Train{" "}
            <span className="text-orange-500">
              Anywhere.
            </span>
            <br />
            Train{" "}
            <span className="text-orange-500">
              Smarter.
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-slate-300 max-w-md leading-relaxed">
            Your complete workout companion for gym
            and home training with proper form guides
            for every exercise.
          </p>

          <div className="flex gap-3 mt-6 flex-wrap">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-6 rounded-2xl shadow-lg"
            >
              <Link to="/workouts">
                Start Training
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border border-white/20 hover:bg-white/10 px-6 py-6 rounded-2xl"
            >
              <Link to="/schedule">
                View Schedule
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="container mx-auto px-5 -mt-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-orange-500" />
                <span className="text-lg">
                  {stat.value}
                </span>
              </div>

              <h3 className="font-bold text-sm md:text-base leading-snug">
                {stat.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="container mx-auto px-5 py-8">
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            to="/schedule"
            className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300"
          >
            <Calendar className="h-10 w-10 text-orange-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Weekly Schedule
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm">
              A structured weekly plan balancing gym
              sessions, home workouts, and recovery
              days.
            </p>
          </Link>

          <Link
            to="/workouts"
            className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300"
          >
            <Dumbbell className="h-10 w-10 text-orange-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Gym & Home Workouts
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm">
              Browse curated workouts for every level,
              from heavy lifts to bodyweight circuits.
            </p>
          </Link>

          <Link
            to="/exercises"
            className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300"
          >
            <BookOpen className="h-10 w-10 text-orange-500 mb-4" />

            <h3 className="text-xl font-bold mb-3">
              Exercise Library
            </h3>

            <p className="text-slate-300 leading-relaxed text-sm">
              Detailed form guides, posture tips, and
              common mistakes for every exercise.
            </p>
          </Link>
        </div>
      </section>

      {/* HOME WORKOUT SECTION */}
      <section className="container mx-auto px-5 pb-4">
        <div className="relative rounded-[2rem] overflow-hidden border border-white/10">
          <img
            src={heroHome}
            alt="Home workout"
            width={1920}
            height={1080}
            loading="lazy"
            className="w-full h-[300px] md:h-[340px] object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/75 flex items-center">
            <div className="p-6 max-w-lg">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-5 w-5 text-orange-500" />

                <span className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                  No Equipment Needed
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-3">
                Home Workouts
              </h2>

              <p className="text-slate-300 text-sm md:text-lg leading-relaxed mb-5">
                Effective bodyweight routines you can
                do in your living room. Perfect form,
                zero excuses.
              </p>

              <Button
                asChild
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-2xl px-6 py-6"
              >
                <Link to="/workouts">
                  Explore Workouts
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
