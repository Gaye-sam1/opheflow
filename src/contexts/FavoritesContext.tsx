/**
 * Favorites context for OpheFlow.
 * Manages favorite workout persistence.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem } from '@/utils/storage';
import type { FavoriteEntry } from '@/utils/types';

interface FavoritesContextType {
  favorites: FavoriteEntry[];
  toggleFavorite: (workoutId: string) => void;
  isFavorite: (workoutId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>(() => {
    return getStorageItem<FavoriteEntry[]>(STORAGE_KEYS.FAVORITES, []);
  });

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites]);

  const toggleFavorite = (workoutId: string) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.workoutId === workoutId);
      if (exists) {
        return prev.filter((f) => f.workoutId !== workoutId);
      }
      return [...prev, { workoutId, addedAt: new Date().toISOString() }];
    });
  };

  const isFavorite = (workoutId: string) => {
    return favorites.some((f) => f.workoutId === workoutId);
  };

  const value: FavoritesContextType = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}