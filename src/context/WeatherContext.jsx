import { createContext, useContext, useState, useEffect } from "react";
import { useWeatherData, useCities } from "../hooks/useWeather";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [selectedCityName, setSelectedCityName] = useState("Resistencia");
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // React Query para obtener datos del clima
  const {
    data: selectedCity,
    isLoading,
    error,
    isFetching
  } = useWeatherData(selectedCityName);

  // React Query para obtener lista de ciudades
  const { data: cities = [] } = useCities();

  const changeCity = (cityName) => {
    setSelectedCityName(cityName);
  };

  // Función para toggle favoritos
  const toggleFavorite = (city) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.find(fav => fav.city === city.city);
      let newFavorites;

      if (isAlreadyFavorite) {
        // Remover de favoritos
        newFavorites = prevFavorites.filter(fav => fav.city !== city.city);
      } else {
        // Agregar a favoritos
        newFavorites = [...prevFavorites, city];
      }

      // Guardar en localStorage
      localStorage.setItem('weatherFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  // Verificar si una ciudad es favorita
  const isFavorite = (cityName) => {
    return favorites.some(fav => fav.city === cityName);
  };

  return (
    <WeatherContext.Provider value={{
      selectedCity,
      changeCity,
      cities,
      favorites,
      toggleFavorite,
      isFavorite,
      isLoading: isLoading || isFetching,
      error
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather debe usarse dentro de WeatherProvider");
  }
  return context;
};
