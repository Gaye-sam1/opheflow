import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";
import { STORAGE_KEYS, getStorageItem } from "@/utils/storage";

export interface WorkoutLog {
  id: string;
  workoutId: string;
  workoutName: string;
  workoutType: "gym" | "home";
  completedAt: string; // ISO date string
  durationMinutes: number;
}

interface ProgressState {
  logs: WorkoutLog[];
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  thisWeekCount: number;
  thisMonthCount: number;
}

interface ProgressContextType extends ProgressState {
  logWorkout: (workout: { id: string; name: string; type: "gym" | "home"; durationMinutes: number }) => void;
  isCompletedToday: (workoutId: string) => boolean;
}

const STORAGE_KEY = STORAGE_KEYS.PROGRESS;

function getStartOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function calculateStreak(logs: WorkoutLog[]): { current: number; longest: number } {
  if (logs.length === 0) return { current: 0, longest: 0 };

  const uniqueDays = Array.from(
    new Set(logs.map((l) => getStartOfDay(new Date(l.completedAt)).toISOString()))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let current = 0;
  let longest = 0;
  let streak = 1;

  const today = getStartOfDay(new Date());
  const lastWorkoutDay = new Date(uniqueDays[0]);
  const diffFromToday = Math.floor((today.getTime() - lastWorkoutDay.getTime()) / 86400000);

  if (diffFromToday > 1) {
    current = 0;
  } else {
    current = 1;
    for (let i = 1; i < uniqueDays.length; i++) {
      const prev = new Date(uniqueDays[i - 1]);
      const curr = new Date(uniqueDays[i]);
      const diff = Math.floor((prev.getTime() - curr.getTime()) / 86400000);
      if (diff === 1) {
        current++;
      } else {
        break;
      }
    }
  }

  // longest streak
  streak = 1;
  longest = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diff = Math.floor((prev.getTime() - curr.getTime()) / 86400000);
    if (diff === 1) {
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 1;
    }
  }

  return { current, longest: Math.max(longest, current) };
}

function getWeekCount(logs: WorkoutLog[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  startOfWeek.setDate(startOfWeek.getDate() - (day === 0 ? 6 : day - 1));
  startOfWeek.setHours(0, 0, 0, 0);
  return logs.filter((l) => new Date(l.completedAt) >= startOfWeek).length;
}

function getMonthCount(logs: WorkoutLog[]): number {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return logs.filter((l) => new Date(l.completedAt) >= startOfMonth).length;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<WorkoutLog[]>(() => {
    return getStorageItem<WorkoutLog[]>(STORAGE_KEY, []);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  }, [logs]);

  const logWorkout = useCallback(
    (workout: { id: string; name: string; type: "gym" | "home"; durationMinutes: number }) => {
      const entry: WorkoutLog = {
        id: crypto.randomUUID(),
        workoutId: workout.id,
        workoutName: workout.name,
        workoutType: workout.type,
        completedAt: new Date().toISOString(),
        durationMinutes: workout.durationMinutes,
      };
      setLogs((prev) => [entry, ...prev]);
    },
    []
  );

  const isCompletedToday = useCallback(
    (workoutId: string) => {
      const today = getStartOfDay(new Date()).getTime();
      return logs.some(
        (l) =>
          l.workoutId === workoutId &&
          getStartOfDay(new Date(l.completedAt)).getTime() === today
      );
    },
    [logs]
  );

  const { current: currentStreak, longest: longestStreak } = calculateStreak(logs);

  return (
    <ProgressContext.Provider
      value={{
        logs,
        currentStreak,
        longestStreak,
        totalWorkouts: logs.length,
        thisWeekCount: getWeekCount(logs),
        thisMonthCount: getMonthCount(logs),
        logWorkout,
        isCompletedToday,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
