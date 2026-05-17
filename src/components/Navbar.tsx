import { Link, useLocation } from "react-router-dom";

import {
  Dumbbell,
  Calendar,
  Home,
  BookOpen,
  BarChart3,
  User,
} from "lucide-react";

const navItems = [
  {
    to: "/",
    label: "Home",
    icon: Home,
  },
  {
    to: "/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    to: "/workouts",
    label: "Workouts",
    icon: Dumbbell,
  },
  {
    to: "/exercises",
    label: "Exercises",
    icon: BookOpen,
  },
  {
    to: "/progress",
    label: "Progress",
    icon: BarChart3,
  },
  {
    to: "/profile",
    label: "Profile",
    icon: User,
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Desktop Top Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 h-16 items-center justify-between px-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="OpheFlow"
            className="w-10 h-10 object-contain"
          />

          <span className="text-xl font-bold text-white tracking-tight">
            OpheFlow
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === item.to
                  ? "bg-orange-500/20 text-orange-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-4 w-4" />

              {item.label}
            </Link>
          ))}
          
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/90 backdrop-blur-xl">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-all ${
                pathname === item.to
                  ? "text-orange-400"
                  : "text-slate-500"
              }`}
            >
              <item.icon className="h-5 w-5" />

              <span className="text-[10px] font-medium">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;