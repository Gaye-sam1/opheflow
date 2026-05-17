/**
 * Achievement system for OpheFlow.
 * Defines milestones and tracks unlock status.
 */

import type { Achievement } from './types';

export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  {
    id: 'first-workout',
    name: 'First Workout',
    icon: '🎯',
    description: 'Complete your first workout.',
    unlockedAt: '',
  },
  {
    id: 'streak-3',
    name: 'Hot Streak',
    icon: '🔥',
    description: 'Maintain a 3-day workout streak.',
    unlockedAt: '',
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    icon: '📅',
    description: 'Complete workouts for 7 consecutive days.',
    unlockedAt: '',
  },
  {
    id: 'streak-30',
    name: 'Month Master',
    icon: '🏅',
    description: 'Complete workouts for 30 consecutive days.',
    unlockedAt: '',
  },
  {
    id: 'streak-100',
    name: 'Centurion',
    icon: '👑',
    description: 'Complete workouts for 100 consecutive days.',
    unlockedAt: '',
  },
  {
    id: 'workouts-10',
    name: 'Getting Started',
    icon: '⭐',
    description: 'Complete 10 total workouts.',
    unlockedAt: '',
  },
  {
    id: 'workouts-50',
    name: 'Dedicated',
    icon: '💎',
    description: 'Complete 50 total workouts.',
    unlockedAt: '',
  },
  {
    id: 'workouts-100',
    name: 'Centurion Trainer',
    icon: '🏆',
    description: 'Complete 100 total workouts.',
    unlockedAt: '',
  },
  {
    id: 'minutes-100',
    name: 'Century Club',
    icon: '⏱️',
    description: 'Accumulate 100 total exercise minutes.',
    unlockedAt: '',
  },
  {
    id: 'minutes-500',
    name: 'Marathoner',
    icon: '🥇',
    description: 'Accumulate 500 total exercise minutes.',
    unlockedAt: '',
  },
  {
    id: 'both-types',
    name: 'Balanced Athlete',
    icon: '⚖️',
    description: 'Complete both gym and home workouts.',
    unlockedAt: '',
  },
  {
    id: 'level-up-3',
    name: 'Rising Star',
    icon: '🌟',
    description: 'Reach Level 3.',
    unlockedAt: '',
  },
  {
    id: 'level-up-5',
    name: 'Powerhouse',
    icon: '💪',
    description: 'Reach Level 5.',
    unlockedAt: '',
  },
  {
    id: 'level-up-10',
    name: 'Legendary',
    icon: '🐉',
    description: 'Reach Level 10.',
    unlockedAt: '',
  },
];

export function checkNewAchievements(
  stats: {
    totalWorkouts: number;
    longestStreak: number;
    currentStreak: number;
    totalMinutes: number;
    gymCount: number;
    homeCount: number;
    level: number;
  },
  existingAchievements: Achievement[]
): Achievement[] {
  const newlyUnlocked: Achievement[] = [];
  const existingIds = new Set(existingAchievements.map((a) => a.id));
  const now = new Date().toISOString();

  const check = (id: string, condition: boolean) => {
    if (condition && !existingIds.has(id)) {
      const def = ACHIEVEMENT_DEFINITIONS.find((a) => a.id === id);
      if (def) {
        newlyUnlocked.push({ ...def, unlockedAt: now });
      }
    }
  };

  check('first-workout', stats.totalWorkouts >= 1);
  check('streak-3', stats.currentStreak >= 3);
  check('streak-7', stats.currentStreak >= 7);
  check('streak-30', stats.currentStreak >= 30);
  check('streak-100', stats.currentStreak >= 100);
  check('workouts-10', stats.totalWorkouts >= 10);
  check('workouts-50', stats.totalWorkouts >= 50);
  check('workouts-100', stats.totalWorkouts >= 100);
  check('minutes-100', stats.totalMinutes >= 100);
  check('minutes-500', stats.totalMinutes >= 500);
  check('both-types', stats.gymCount > 0 && stats.homeCount > 0);
  check('level-up-3', stats.level >= 3);
  check('level-up-5', stats.level >= 5);
  check('level-up-10', stats.level >= 10);

  return newlyUnlocked;
}