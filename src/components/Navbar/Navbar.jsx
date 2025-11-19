import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import { FiSearch } from "react-icons/fi";
import { useWeather } from "../../context/WeatherContext";
import { useSearchCities, useCities } from "../../hooks/useWeather"; // ✅ NUEVO IMPORT

const Navbar = () => {
  const { changeCity, isLoading: weatherLoading } = useWeather();

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // ✅ NUEVO: Usar búsqueda dinámica
  const {
    data: searchResults = [],
    isLoading: searchLoading
  } = useSearchCities(searchTerm);

  // ✅ NUEVO: Ciudades populares para mostrar al inicio
  const { data: popularCities = [] } = useCities();

  // ✅ NUEVO: Determinar qué ciudades mostrar
  const getCitiesToShow = () => {
    if (searchTerm.length > 0) {
      // Si está buscando, mostrar resultados de la API
      return searchResults;
    } else {
      // Si no hay búsqueda, mostrar ciudades populares
      return popularCities;
    }
  };

  const handleCitySelect = (city) => {
    changeCity(city);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const citiesToShow = getCitiesToShow();
  const isLoading = searchLoading || weatherLoading;

  return (
    <header className={styles.navbar}>
      <div className={styles.searchContainer} ref={searchRef}>
        <FiSearch className={styles.icon} />
        <input
          type="text"
          placeholder={isLoading ? "Buscando..." : "Buscar ciudad..."}
          className={styles.input}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={isLoading}
        />

        {showSuggestions && (
          <div className={styles.suggestions}>
            {isLoading ? (
              <div className={styles.noResults}>Buscando ciudades...</div>
            ) : citiesToShow.length > 0 ? (
              citiesToShow.map((city, index) => (
                <div
                  key={index}
                  className={styles.suggestionItem}
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))
            ) : searchTerm.length > 0 ? (
              <div className={styles.noResults}>
                {searchTerm.length < 2
                  ? "Escribe al menos 2 caracteres"
                  : "No se encontraron ciudades"
                }
              </div>
            ) : (
              <div className={styles.noResults}>Escribe para buscar ciudades</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;