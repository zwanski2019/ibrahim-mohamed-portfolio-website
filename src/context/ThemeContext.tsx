import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const THEME_STORAGE_KEY = "zwanski-theme-preference";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  isSystemPreference: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [isSystemPreference, setIsSystemPreference] = useState(true);

  // Initialize theme on component mount
  useEffect(() => {
    try {
      // 1. Check for saved user preference
      const savedPreference = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      
      // 2. Check for system preference
      const systemPrefersDark = window.matchMedia && 
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      // 3. Determine initial theme
      const initialTheme = savedPreference || (systemPrefersDark ? "dark" : "light");
      
      setTheme(initialTheme);
      setIsSystemPreference(!savedPreference);
    } catch (error) {
      console.error("Error loading theme preference:", error);
      // Fallback to dark theme if errors occur
      setTheme("dark");
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    try {
      // Update document class
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      
      // Update data-theme attribute for CSS variables
      document.documentElement.setAttribute("data-theme", theme);
      
      // Save preference
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === "dark" ? "light" : "dark";
      setIsSystemPreference(false); // User override
      return newTheme;
    });
  };

  const contextValue = {
    theme,
    toggleTheme,
    isSystemPreference
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
