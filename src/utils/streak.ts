// src/utils/streak.ts

/**
 * Get current streak
 */
export const getStreak = (): number => {
  return (
    Number(
      localStorage.getItem("opheflow-streak")
    ) || 0
  );
};

/**
 * Get last workout date
 */
export const getLastWorkoutDate = (): string | null => {
  return localStorage.getItem(
    "opheflow-last-workout-date"
  );
};

/**
 * Update streak after workout completion
 */
export const updateStreak = (): number => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const lastWorkoutDate =
    getLastWorkoutDate();

  let streak = getStreak();

  /**
   * First ever workout
   */
  if (!lastWorkoutDate) {
    streak = 1;
  } else {
    const yesterday = new Date();

    yesterday.setDate(
      yesterday.getDate() - 1
    );

    const yesterdayString = yesterday
      .toISOString()
      .split("T")[0];

    /**
     * Continue streak
     */
    if (
      lastWorkoutDate === yesterdayString
    ) {
      streak += 1;
    }

    /**
     * Same-day workout
     * Do not increase streak twice
     */
    else if (
      lastWorkoutDate === today
    ) {
      return streak;
    }

    /**
     * Missed day
     */
    else {
      streak = 1;
    }
  }

  localStorage.setItem(
    "opheflow-streak",
    streak.toString()
  );

  localStorage.setItem(
    "opheflow-last-workout-date",
    today
  );

  return streak;
};

/**
 * Reset streak
 */
export const resetStreak = () => {
  localStorage.setItem(
    "opheflow-streak",
    "0"
  );

  localStorage.removeItem(
    "opheflow-last-workout-date"
  );
};