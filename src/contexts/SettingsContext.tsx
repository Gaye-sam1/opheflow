/**
 * Settings context for OpheFlow.
 * Manages app settings with localStorage persistence.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage';
import type { NotificationConfig } from '@/utils/notifications';

interface SettingsContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  notificationsEnabled: boolean;
  toggleNotifications: () => void;
  resetProgress: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

function defaultSettings(): NotificationConfig {
  return {
    enabled: true,
    dailyReminderTime: '08:00',
    streakReminders: true,
    motivationalQuotes: true,
  };
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = getStorageItem<{ darkMode: boolean } | null>(STORAGE_KEYS.SETTINGS, null);
    return saved ? saved.darkMode : false;
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    const saved = getStorageItem<NotificationConfig | null>(STORAGE_KEYS.SETTINGS, null);
    return saved ? saved.notificationsEnabled : true;
  });

  useEffect(() => {
    const settings = { darkMode, notificationsEnabled, dailyReminderTime: '08:00', streakReminders: true, motivationalQuotes: true };
    setStorageItem(STORAGE_KEYS.SETTINGS, settings);

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, notificationsEnabled]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  const resetProgress = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.XP);
    window.location.reload();
  };

  const value: SettingsContextType = {
    darkMode,
    toggleDarkMode,
    notificationsEnabled,
    toggleNotifications,
    resetProgress,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}