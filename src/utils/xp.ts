// src/utils/xp.ts

export const XP_PER_WORKOUT = 50;
export const XP_PER_STREAK_DAY = 10;

/**
 * Get total XP
 */
export const getXP = (): number => {
  return Number(localStorage.getItem("opheflow-xp")) || 0;
};

/**
 * Add XP
 */
export const addXP = (amount: number): number => {
  const currentXP = getXP();

  const updatedXP = currentXP + amount;

  localStorage.setItem(
    "opheflow-xp",
    updatedXP.toString()
  );

  return updatedXP;
};

/**
 * Remove XP
 */
export const removeXP = (amount: number): number => {
  const currentXP = getXP();

  const updatedXP = Math.max(0, currentXP - amount);

  localStorage.setItem(
    "opheflow-xp",
    updatedXP.toString()
  );

  return updatedXP;
};

/**
 * Reset XP
 */
export const resetXP = () => {
  localStorage.setItem("opheflow-xp", "0");
};

/**
 * Calculate user level
 * Every 100 XP = +1 level
 */
export const calculateLevel = (xp: number): number => {
  return Math.floor(xp / 100) + 1;
};

/**
 * XP needed for next level
 */
export const getXPForNextLevel = (
  level: number
): number => {
  return level * 100;
};

/**
 * Progress percentage to next level
 */
export const getLevelProgress = (
  xp: number
): number => {
  const currentLevel = calculateLevel(xp);

  const previousLevelXP =
    (currentLevel - 1) * 100;

  const nextLevelXP =
    currentLevel * 100;

  const progress =
    ((xp - previousLevelXP) /
      (nextLevelXP - previousLevelXP)) *
    100;

  return Math.min(progress, 100);
};