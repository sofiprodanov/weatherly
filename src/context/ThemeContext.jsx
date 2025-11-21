import { createContext, useContext, useState, useEffect } from "react";
import { useMutation } from '@tanstack/react-query';
import { preferencesService } from '../services/preferencesService';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // useMutation para el tema
  const updateThemeMutation = useMutation({
    mutationFn: (theme) => preferencesService.updateThemePreference(theme)
  });

  // Cargar tema al iniciar
  useEffect(() => {
    const savedTheme = localStorage.getItem('weatherly-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    
    setIsDarkMode(newTheme);
    localStorage.setItem('weatherly-theme', newTheme ? 'dark' : 'light');
    
    updateThemeMutation.mutate(newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{
      isDarkMode,
      toggleTheme,
      isUpdating: updateThemeMutation.isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};