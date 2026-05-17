/**
 * Notification utility for OpheFlow.
 * Provides browser notification helpers (works in Capacitor webview).
 */

import { STORAGE_KEYS, getStorageItem } from './storage';

export type NotificationType =
  | 'daily-reminder'
  | 'streak-reminder'
  | 'motivational'
  | 'achievement'
  | 'workout-complete';

export interface NotificationConfig {
  enabled: boolean;
  dailyReminderTime: string; // HH:mm
  streakReminders: boolean;
  motivationalQuotes: boolean;
}

export function requestPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return Promise.resolve(false);
  }
  return Notification.requestPermission().then((result) => result === 'granted');
}

export function canNotify(): boolean {
  if (typeof window === 'undefined') return false;
  if (!('Notification' in window)) return false;
  const settings = getSetting();
  if (!settings.notificationsEnabled) return false;
  return Notification.permission === 'granted';
}

function getSetting(): NotificationConfig {
  return getStorageItem(STORAGE_KEYS.SETTINGS, defaultSettings());
}

export function defaultSettings(): NotificationConfig {
  return {
    enabled: true,
    dailyReminderTime: '08:00',
    streakReminders: true,
    motivationalQuotes: true,
  };
}

export function sendLocalNotification(
  title: string,
  body: string,
  tag?: string
): void {
  if (!canNotify()) return;

  try {
    const notification = new Notification(title, {
      body,
      tag,
      icon: '/logo.png',
      badge: '/logo.png',
    });

    // Auto-close after 5 seconds on mobile
    setTimeout(() => notification.close(), 5000);
  } catch {
    // Silent fail for environments without notification API
  }
}

// Notification templates
export function sendDailyReminder(): void {
  const quotes = [
    "Your only limit is you.",
    "Train insane or remain the same.",
    "The pain you feel today is the strength you feel tomorrow.",
    "Don't count the days, make the days count.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "Push yourself because no one else is going to do it.",
    "The best project you'll ever work on is you.",
    "Discipline is choosing between what you want now and what you want most.",
    "Sweat is just fat crying.",
    "Every workout is progress.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  sendLocalNotification(
    "Time to move! 💪",
    `"${randomQuote}" — OpheFlow`,
    'daily-reminder'
  );
}

export function sendStreakReminder(streak: number): void {
  sendLocalNotification(
    `🔥 ${streak}-Day Streak!`,
    "Don't break the chain! Complete a workout today.",
    'streak-reminder'
  );
}

export function sendAchievementNotification(name: string, icon: string): void {
  sendLocalNotification(
    `🏆 Achievement Unlocked!`,
    `${icon} ${name}`,
    'achievement'
  );
}

export function sendWorkoutComplete(workoutName: string): void {
  sendLocalNotification(
    "💪 Workout Complete!",
    `"${workoutName}" logged. Keep the streak going!`,
    'workout-complete'
  );
}

// Schedule a daily reminder (returns timeout ID for cancellation)
export function scheduleDailyReminder(time: string): void {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0
  );

  // If time already passed today, schedule for tomorrow
  if (targetTime <= now) {
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const delay = targetTime.getTime() - now.getTime();

  setTimeout(() => {
    sendDailyReminder();
    // Schedule again for tomorrow (24h repeat)
    setInterval(sendDailyReminder, 24 * 60 * 60 * 1000);
  }, delay);
}