/**
 * Type-safe models for OpheFlow.
 */

import type { MuscleGroup, WorkoutType, Difficulty } from '@/data/workouts';

// ── Auth ──────────────────────────────────────────────
export interface UserProfile {
  name: string;
  email: string;
  fitnessGoal: string;
  weight: number;       // kg
  height: number;       // cm
  avatar?: string;
  createdAt: string;    // ISO date
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
}

// ── Streak ────────────────────────────────────────────
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastWorkoutDate: string | null;  // ISO date string
}

export interface StreakBadge {
  id: string;
  name: string;
  icon: string;
  threshold: number;        // days required
  description: string;
  unlocked: boolean;
}

// ── Workout / Exercise ────────────────────────────────
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  type: WorkoutType;
  sets: number;
  reps: string;
  restSeconds: number;
  description: string;
  postureTips: string[];
  commonMistakes: string[];
}

export interface Workout {
  id: string;
  name: string;
  type: WorkoutType;
  difficulty: Difficulty;
  durationMinutes: number;
  muscleGroups: MuscleGroup[];
  exercises: Exercise[];
  description: string;
}

// ── Workout Log ───────────────────────────────────────
export interface WorkoutLog {
  id: string;
  workoutId: string;
  workoutName: string;
  workoutType: WorkoutType;
  completedAt: string;       // ISO date string
  durationMinutes: number;
  caloriesBurned?: number;
  notes?: string;
}

// ── Favorites ─────────────────────────────────────────
export interface FavoriteEntry {
  workoutId: string;
  addedAt: string;  // ISO date string
}

// ── Achievement ───────────────────────────────────────
export interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;  // ISO date string
}

// ── XP / Level ────────────────────────────────────────
export interface UserXP {
  totalXP: number;
  level: number;
  xpToNextLevel: number;
  currentLevelXP: number;
}

// ── Settings ──────────────────────────────────────────
export interface AppSettings {
  darkMode: boolean;
  notificationsEnabled: boolean;
  dailyReminderTime: string;   // HH:mm format
  hapticFeedback: boolean;
  soundEnabled: boolean;
}

// ── Daily Challenge ───────────────────────────────────
export interface DailyChallenge {
  id: string;
  date: string;         // ISO date string
  workoutId: string;
  workoutName: string;
  description: string;
  completed: boolean;
  bonusXP: number;
}

// ── Profile Stats (computed) ──────────────────────────
export interface ProfileStats {
  totalWorkouts: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  gymCount: number;
  homeCount: number;
  caloriesBurned: number;
  averageDuration: number;
  bmi?: number;
}

// ── Progress State ────────────────────────────────────
export interface ProgressState {
  logs: WorkoutLog[];
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  thisWeekCount: number;
  thisMonthCount: number;
}