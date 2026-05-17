import {
  useEffect,
  useState,
} from "react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  HashRouter,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ProgressProvider } from "@/hooks/useProgress";
import { CustomWorkoutsProvider } from "@/hooks/useCustomWorkouts";

import Navbar from "@/components/Navbar";
import AnimatedSplash from "@/components/AnimatedSplash";
import ProtectedRoute from "@/components/ProtectedRoute";

import Profile from "@/pages/Profile";
import History from "@/pages/History";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Onboarding from "@/pages/Onboarding";

import Index from "@/pages/Index";
import Schedule from "@/pages/Schedule";
import Workouts from "@/pages/Workouts";
import WorkoutDetail from "@/pages/WorkoutDetail";
import Exercises from "@/pages/Exercises";
import Progress from "@/pages/Progress";
import CreateWorkout from "@/pages/CreateWorkout";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {

  const location = useLocation();

  const [user, setUser] =
    useState<any>(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  // Check Firebase auth state
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setAuthLoading(false);
        }
      );

    return () => unsubscribe();

  }, []);

  const onboardingDone =
    localStorage.getItem(
      "opheflow-onboarding"
    );

  /**
   * Hide navbar on auth pages
   */
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/onboarding";

  /**
   * Loading Screen while checking auth
   */
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-5" />

        <h1 className="text-2xl font-bold">
          OpheFlow
        </h1>

        <p className="text-gray-400 mt-2">
          Loading...
        </p>
      </div>
    );
  }

  /**
   * Redirect to onboarding
   */
  if (
    !onboardingDone &&
    location.pathname !== "/onboarding"
  ) {
    return (
      <Navigate
        to="/onboarding"
        replace
      />
    );
  }

  /**
   * Not authenticated
   */
  if (
    onboardingDone &&
    !user &&
    location.pathname !== "/login" &&
    location.pathname !== "/signup"
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /**
   * Already logged in
   */
  if (
    user &&
    (
      location.pathname === "/login" ||
      location.pathname === "/signup"
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/onboarding"
          element={<Onboarding />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/create"
          element={
            <ProtectedRoute>
              <CreateWorkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workouts/:id"
          element={
            <ProtectedRoute>
              <WorkoutDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          }
        />

        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
}

const App = () => {

  const [loading, setLoading] =
    useState(true);

  // Splash Screen Timer
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2300);

    return () => clearTimeout(timer);

  }, []);

  /**
   * Splash Screen
   */
  if (loading) {
    return <AnimatedSplash />;
  }

  return (
    <QueryClientProvider client={queryClient}>

      <TooltipProvider>

        <ProgressProvider>

          <CustomWorkoutsProvider>

            <Toaster />
            <Sonner />

            <HashRouter>
              <AppContent />
            </HashRouter>

          </CustomWorkoutsProvider>

        </ProgressProvider>

      </TooltipProvider>

    </QueryClientProvider>
  );
};

export default App;