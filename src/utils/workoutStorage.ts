// src/utils/workoutStorage.ts

import { updateStreak } from "./streak";
import {
  addXP,
  XP_PER_WORKOUT,
} from "./xp";

export interface CompletedWorkout {
  id: string;
  name: string;
  date: string;
  calories: number;
  duration: number;
  type?: string;
}

/**
 * Get workout history
 */
export const getWorkoutHistory =
  (): CompletedWorkout[] => {
    return JSON.parse(
      localStorage.getItem(
        "opheflow-history"
      ) || "[]"
    );
  };

/**
 * Save completed workout
 */
export const saveCompletedWorkout = (
  workout: CompletedWorkout
) => {
  const history =
    getWorkoutHistory();

  history.unshift(workout);

  localStorage.setItem(
    "opheflow-history",
    JSON.stringify(history)
  );

  /**
   * Update streak
   */
  updateStreak();

  /**
   * Add XP
   */
  addXP(XP_PER_WORKOUT);
};

/**
 * Clear workout history
 */
export const clearWorkoutHistory =
  () => {
    localStorage.removeItem(
      "opheflow-history"
    );
  };

/**
 * Backward compatibility
 */
export const getCompletedWorkouts =
  getWorkoutHistory;