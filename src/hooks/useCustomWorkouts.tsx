import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import type { Workout, Exercise, WorkoutType, Difficulty, MuscleGroup } from "@/data/workouts";

interface CustomWorkoutsContextType {
  customWorkouts: Workout[];
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
}

const STORAGE_KEY = "fitforge-custom-workouts";

const CustomWorkoutsContext = createContext<CustomWorkoutsContextType | null>(null);

export function CustomWorkoutsProvider({ children }: { children: ReactNode }) {
  const [customWorkouts, setCustomWorkouts] = useState<Workout[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customWorkouts));
  }, [customWorkouts]);

  const addWorkout = useCallback((workout: Workout) => {
    setCustomWorkouts((prev) => [workout, ...prev]);
  }, []);

  const deleteWorkout = useCallback((id: string) => {
    setCustomWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  return (
    <CustomWorkoutsContext.Provider value={{ customWorkouts, addWorkout, deleteWorkout }}>
      {children}
    </CustomWorkoutsContext.Provider>
  );
}

export function useCustomWorkouts() {
  const ctx = useContext(CustomWorkoutsContext);
  if (!ctx) throw new Error("useCustomWorkouts must be used within CustomWorkoutsProvider");
  return ctx;
}
