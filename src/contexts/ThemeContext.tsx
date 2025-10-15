import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Theme } from '@/types';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({ mode: 'light' });

  useEffect(() => {
    // Check for stored theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme({ mode: storedTheme as 'light' | 'dark' });
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme({ mode: prefersDark ? 'dark' : 'light' });
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme.mode);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => ({ 
      mode: prev.mode === 'light' ? 'dark' : 'light' 
    }));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};


