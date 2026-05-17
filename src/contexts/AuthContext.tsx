/**
 * Auth context for OpheFlow.
 * Manages authentication state, login, signup, logout, and session persistence.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_KEYS, getStorageItem, setStorageItem, removeStorageItem } from '@/utils/storage';
import type { UserProfile, AuthState } from '@/utils/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string, confirmPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  isInitialized: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// In-memory user store (simulates a backend)
const USERS_KEY = 'opheflow-users';

function getStoredUsers(): Record<string, UserProfile & { password: string }> {
  return getStorageItem(USERS_KEY, {});
}

function setStoredUsers(users: Record<string, UserProfile & { password: string }>): void {
  setStorageItem(USERS_KEY, users);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Check existing session on mount
  useEffect(() => {
    const auth = getStorageItem(STORAGE_KEYS.AUTH, null);
    const savedUser = getStorageItem<UserProfile | null>(STORAGE_KEYS.PROFILE, null);

    if (auth && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser);
    }

    // Check if onboarding is complete, redirect accordingly
    const onboardingDone = localStorage.getItem(STORAGE_KEYS.ONBOARDING) === 'done';

    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Validation
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    const users = getStoredUsers();
    const userRecord = users[email.toLowerCase()];

    if (!userRecord || userRecord.password !== password) {
      return { success: false, error: 'Invalid email or password. Try demo@example.com / demo123' };
    }

    // Success
    setIsAuthenticated(true);
    const profile: UserProfile = {
      name: userRecord.name,
      email: userRecord.email.toLowerCase(),
      fitnessGoal: userRecord.fitnessGoal || 'general-fitness',
      weight: userRecord.weight || 0,
      height: userRecord.height || 0,
      avatar: userRecord.avatar,
      createdAt: userRecord.createdAt,
    };

    setUser(profile);
    setStorageItem(STORAGE_KEYS.AUTH, true);
    setStorageItem(STORAGE_KEYS.PROFILE, profile);

    navigate('/');
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    // Validation
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      return { success: false, error: 'Please fill in all fields.' };
    }

    if (name.trim().length < 2) {
      return { success: false, error: 'Name must be at least 2 characters.' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match.' };
    }

    const users = getStoredUsers();

    if (users[email.toLowerCase()]) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    // Create user
    const newUser: UserProfile & { password: string } = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      fitnessGoal: 'general-fitness',
      weight: 0,
      height: 0,
      createdAt: new Date().toISOString(),
    };

    users[email.toLowerCase().trim()] = newUser;
    setStoredUsers(users);

    // Auto-login after signup
    const profile: UserProfile = {
      name: newUser.name,
      email: newUser.email,
      fitnessGoal: newUser.fitnessGoal,
      weight: newUser.weight,
      height: newUser.height,
      createdAt: newUser.createdAt,
    };

    setIsAuthenticated(true);
    setUser(profile);
    setStorageItem(STORAGE_KEYS.AUTH, true);
    setStorageItem(STORAGE_KEYS.PROFILE, profile);

    navigate('/');
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    removeStorageItem(STORAGE_KEYS.AUTH);
    removeStorageItem(STORAGE_KEYS.PROFILE);
    navigate('/login');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;

    const updated = { ...user, ...updates };
    setUser(updated);
    setStorageItem(STORAGE_KEYS.PROFILE, updated);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    updateProfile,
    isInitialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}