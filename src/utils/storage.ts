/**
 * Centralized localStorage helpers for OpheFlow
 */

export const STORAGE_KEYS = {
  XP: "opheflow-xp",
  STREAK: "opheflow-streak",
  PROFILE: "opheflow-profile",
  WORKOUTS: "opheflow-workouts",
  ONBOARDING: "opheflow-onboarding",
  SETTINGS: "opheflow-settings",
  HISTORY: "opheflow-history",
  PROGRESS: "opheflow-progress",
  ACHIEVEMENTS: "opheflow-achievements",
  COMPLETED_WORKOUTS: "opheflow-completed-workouts",
};

export function getStorageItem<T>(
  key: string,
  fallback: T
): T {
  try {
    const item = localStorage.getItem(key);

    return item
      ? JSON.parse(item)
      : fallback;
  } catch (error) {
    console.error(
      "Storage get error:",
      error
    );

    return fallback;
  }
}

export function setStorageItem(
  key: string,
  value: unknown
) {
  try {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  } catch (error) {
    console.error(
      "Storage set error:",
      error
    );
  }
}

export function removeStorageItem(
  key: string
) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(
      "Storage remove error:",
      error
    );
  }
}

export function clearStorage() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error(
      "Storage clear error:",
      error
    );
  }
}