import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

import gymBg from "../assets/gym_bg.jpg";
import logo from "../assets/icon.png";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem(
        "opheflow-auth"
      ) === "true";

    if (isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validation
    if (
      !form.email ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Firebase Login
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      console.log(
        "Logged in:",
        userCredential.user
      );

      // Save login state
      localStorage.setItem(
        "opheflow-auth",
        "true"
      );

      alert("Login successful 🎉");

      // Redirect
      navigate("/");

    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/invalid-credential":
          alert(
            "Invalid email or password"
          );
          break;

        case "auth/user-not-found":
          alert("User not found");
          break;

        case "auth/wrong-password":
          alert("Incorrect password");
          break;

        case "auth/invalid-email":
          alert("Invalid email address");
          break;

        default:
          alert(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 bg-black">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${gymBg})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Login Card */}
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
          duration: 0.6,
        }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      >

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">

          <motion.img
            src={logo}
            alt="OpheFlow Logo"
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-24 h-24 mb-4 drop-shadow-[0_0_25px_rgba(255,115,0,0.8)]"
          />

          <h1 className="text-3xl font-bold text-white tracking-wide">
            OpheFlow
          </h1>

          <p className="text-gray-300 mt-2 text-sm text-center">
            Transform your fitness
            journey 💪
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div className="relative">

            <Mail className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password */}
          <div className="relative">

            <Lock className="absolute left-4 top-4 text-gray-400 w-5 h-5" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-4 top-4 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 transition-all text-white font-semibold disabled:opacity-70"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">

          <p className="text-gray-300 text-sm">
            Don’t have an account?

            <Link
              to="/signup"
              className="ml-2 text-orange-400 hover:text-orange-300 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}