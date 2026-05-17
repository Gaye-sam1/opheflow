/**
 * XP Session management for OpheFlow.
 * Tracks XP and level progression in localStorage.
 */

import { STORAGE_KEYS, getStorageItem, setStorageItem } from './storage';
import { XP_PER_STREAK_DAY } from './xp';

export interface XPSession {
  totalXP: number;
  earnedToday: number;
  lastEarnedDate: string | null;
}

const XP_KEY = 'opheflow-xp-session';

export function getXP(): {
  totalXP: number;
  earnedToday: number;
  level: number;
  XP_PER_WORKOUT: number;
  XP_PER_STREAK_DAY: number;
  XP_BONUS_CHALLENGE: number;
} {
  const session: XPSession = getStorageItem<{ totalXP: number; earnedToday: number; lastEarnedDate: string | null }>(XP_KEY, {
    totalXP: 0,
    earnedToday: 0,
    lastEarnedDate: null,
  });

  return {
    totalXP: session.totalXP,
    earnedToday: session.earnedToday,
    level: calculateLevelFromXP(session.totalXP),
    XP_PER_WORKOUT: 100,
    XP_PER_STREAK_DAY: 25,
    XP_BONUS_CHALLENGE: 150,
  };
}

function calculateLevelFromXP(xp: number): number {
  const thresholds = [0, 200, 500, 1000, 1700, 2600, 3800, 5200, 7000, 9000, 11500, 14500, 18000, 22000, 27000, Infinity];
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
  }
  return level;
}

export function awardXP(amount: number): void {
  const session: XPSession = getStorageItem<{ totalXP: number; earnedToday: number; lastEarnedDate: string | null }>(XP_KEY, {
    totalXP: 0,
    earnedToday: 0,
    lastEarnedDate: null,
  });

  const today = new Date().toISOString().split('T')[0];
  let earnedToday = session.earnedToday;

  // Reset daily earnings if it's a new day
  if (session.lastEarnedDate && session.lastEarnedDate !== today) {
    earnedToday = 0;
  }

  const updated: XPSession = {
    totalXP: session.totalXP + amount,
    earnedToday: earnedToday + amount,
    lastEarnedDate: today,
  };

  setStorageItem(XP_KEY, updated);
}

export function getProgressToNextLevel(): {
  currentXP: number;
  xpToNext: number;
  progressPercent: number;
  level: number;
  nextLevel: number;
} {
  const session: XPSession = getStorageItem<{ totalXP: number; earnedToday: number; lastEarnedDate: string | null }>(XP_KEY, {
    totalXP: 0,
    earnedToday: 0,
    lastEarnedDate: null,
  });

  const thresholds = [0, 200, 500, 1000, 1700, 2600, 3800, 5200, 7000, 9000, 11500, 14500, 18000, 22000, 27000];
  const nextThresholds = [200, 500, 1000, 1700, 2600, 3800, 5200, 7000, 9000, 11500, 14500, 18000, 22000, 27000, Infinity];

  let level = 1;
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (session.totalXP >= thresholds[i]) {
      level = i + 1;
      break;
    }
  }

  const currentThreshold = thresholds[level - 1];
  const nextThreshold = level <= 14 ? nextThresholds[level - 1] : Infinity;

  if (nextThreshold === Infinity) {
    return { currentXP: session.totalXP, xpToNext: 0, progressPercent: 100, level, nextLevel: level };
  }

  const xpInLevel = session.totalXP - currentThreshold;
  const xpForNext = nextThreshold - currentThreshold;
  const progressPercent = Math.min(100, Math.round((xpInLevel / xpForNext) * 100));

  return {
    currentXP: session.totalXP,
    xpToNext: xpForNext - xpInLevel,
    progressPercent,
    level,
    nextLevel: level + 1,
  };
}