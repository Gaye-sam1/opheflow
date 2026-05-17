import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  name: string;
  email: string;
  weight: string;
  height: string;
  goal: string;
}

export default function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    weight: "",
    height: "",
    goal: "",
  });

  const [savedMessage, setSavedMessage] = useState("");

  // Load saved profile safely
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("opheflow-profile");

      if (savedProfile) {
        setProfile(JSON.parse(savedProfile) as ProfileData);
      }

      // Auto-fill Firebase email
      if (auth.currentUser?.email) {
        setProfile((prev) => ({
          ...prev,
          email: auth.currentUser?.email || "",
        }));
      }

    } catch {
      console.error("Invalid profile data in localStorage");
    }
  }, []);

  // Save profile
  const handleSave = () => {
    localStorage.setItem(
      "opheflow-profile",
      JSON.stringify(profile)
    );

    setSavedMessage("Profile Saved ✅");

    setTimeout(() => {
      setSavedMessage("");
    }, 2000);
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logged out successfully 👋");

      navigate("/login");

    } catch (error: any) {
      alert(error.message);
    }
  };

  // BMI Calculation
  const bmi =
    profile.weight &&
    profile.height &&
    Number(profile.height) > 0
      ? (
          Number(profile.weight) /
          ((Number(profile.height) / 100) ** 2)
        ).toFixed(1)
      : null;

  // BMI Category
  const bmiCategory = bmi
    ? (() => {
        const value = Number(bmi);

        if (value < 18.5) return "Underweight";
        if (value < 24.9) return "Normal";
        if (value < 29.9) return "Overweight";

        return "Obese";
      })()
    : null;

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8 pb-28 md:pt-24">

      {/* Header */}
      <div className="flex flex-col items-center mb-10">

        <img
          src="/OpheFlow-logo.png"
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 border-4 border-orange-500 object-cover"
        />

        <h1 className="text-4xl font-bold text-center">
          My Profile
        </h1>

        <p className="text-slate-400 mt-2 text-center">
          Manage your fitness identity
        </p>
      </div>

      {/* Form Container */}
      <div className="space-y-5 max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">

        {/* Full Name */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            placeholder="Enter your name"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email: e.target.value,
              })
            }
            placeholder="Enter your email"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Weight (kg)
          </label>

          <input
            type="number"
            value={profile.weight}
            onChange={(e) =>
              setProfile({
                ...profile,
                weight: e.target.value,
              })
            }
            placeholder="Enter your weight"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Height (cm)
          </label>

          <input
            type="number"
            value={profile.height}
            onChange={(e) =>
              setProfile({
                ...profile,
                height: e.target.value,
              })
            }
            placeholder="Enter your height"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          />
        </div>

        {/* Fitness Goal */}
        <div>
          <label className="block mb-2 text-slate-300 font-medium">
            Fitness Goal
          </label>

          <select
            value={profile.goal}
            onChange={(e) =>
              setProfile({
                ...profile,
                goal: e.target.value,
              })
            }
            aria-label="Fitness Goal"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-700 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          >
            <option value="">Select Goal</option>
            <option value="Lose Weight">
              Lose Weight
            </option>
            <option value="Build Muscle">
              Build Muscle
            </option>
            <option value="Stay Fit">
              Stay Fit
            </option>
            <option value="Athletic Performance">
              Athletic Performance
            </option>
          </select>
        </div>

        {/* BMI Card */}
        {bmi && (
          <div className="bg-orange-500/10 border border-orange-500 rounded-2xl p-5 mt-4">

            <h2 className="text-2xl font-bold mb-2 text-orange-400">
              BMI Result
            </h2>

            <p className="text-5xl font-extrabold">
              {bmi}
            </p>

            {bmiCategory && (
              <p className="text-lg font-medium text-slate-300 mt-2">
                Category: {bmiCategory}
              </p>
            )}

            <p className="text-slate-300 mt-2">
              Keep tracking your progress and stay motivated!
            </p>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all py-4 rounded-2xl text-lg font-semibold shadow-lg shadow-orange-500/20"
        >
          Save Profile
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] transition-all duration-300 py-4 rounded-2xl text-lg font-bold shadow-lg mt-2"
        >
          Logout
        </button>

        {/* Success Message */}
        {savedMessage && (
          <p className="text-green-400 text-center mt-2 font-medium">
            {savedMessage}
          </p>
        )}
      </div>
    </div>
  );
}