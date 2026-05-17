import {
  Navigate,
} from "react-router-dom";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "../firebase";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({
  children,
}: Props) {

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    // Listen for Firebase auth changes
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);
        }
      );

    // Cleanup listener
    return () => unsubscribe();

  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">

        <div className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-5" />

        <h1 className="text-2xl font-bold">
          OpheFlow
        </h1>

        <p className="text-gray-400 mt-2">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Redirect if user not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Allow access
  return <>{children}</>;
}