'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'midnight';

export interface ThemeOption {
  id: ThemeName;
  name: string;
  label: string;
  color: string;
  secondaryColor: string;
  description: string;
  isDark?: boolean;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'emerald',
    name: 'Emerald Green',
    label: 'Academic Nigerian Green',
    color: '#16A34A',
    secondaryColor: '#DCFCE7',
    description: 'Fresh, balanced & focused academic vibe',
  },
  {
    id: 'blue',
    name: 'Ocean Blue',
    label: 'UNILAG Lagoon Blue',
    color: '#2563EB',
    secondaryColor: '#DBEAFE',
    description: 'Clean, reliable & modern campus style',
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    label: 'Scholar Indigo',
    color: '#7C3AED',
    secondaryColor: '#EDE9FE',
    description: 'Deep focus, creativity & high retention',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    label: 'High Energy Sunrise',
    color: '#D97706',
    secondaryColor: '#FEF3C7',
    description: 'Warm motivation & exam sprint boost',
  },
  {
    id: 'rose',
    name: 'Coral Rose',
    label: 'Vibrant Coral',
    color: '#E11D48',
    secondaryColor: '#FFE4E6',
    description: 'Playful, modern & energetic palette',
  },
  {
    id: 'midnight',
    name: 'Midnight Library',
    label: 'All-Nighter Dark Mode',
    color: '#10B981',
    secondaryColor: '#1E293B',
    description: 'Sleek dark theme for late night revision',
    isDark: true,
  },
];

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeOption[];
  activeThemeOption: ThemeOption;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('emerald');

  useEffect(() => {
    // Load persisted theme preference
    const saved = localStorage.getItem('studymate_theme') as ThemeName;
    if (saved && THEME_OPTIONS.some(t => t.id === saved)) {
      setCurrentTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'emerald');
    }
  }, []);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem('studymate_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const activeThemeOption = THEME_OPTIONS.find(t => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: THEME_OPTIONS, activeThemeOption }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
