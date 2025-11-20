import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { FiSearch } from "react-icons/fi";
import { useWeather } from "../../context/WeatherContext";
import { useSearchInput } from "../../hooks/useSearchInput";

const Navbar = () => {
  const { changeCity, isLoading: weatherLoading } = useWeather();
  
  const {
    searchTerm,
    showSuggestions,
    inputRef,
    isLoading: searchLoading,
    citiesToShow,
    suggestionMessage,
    handleCitySelect,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    setShowSuggestions
  } = useSearchInput(changeCity);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, setShowSuggestions]);

  const isLoading = searchLoading || weatherLoading;

  return (
    <header className={styles.navbar}>
      <div className={styles.searchContainer} ref={inputRef}>
        <FiSearch className={styles.icon} />
        <input
          ref={inputRef}
          type="text"
          placeholder={isLoading ? "Buscando..." : "Buscar ciudad..."}
          className={styles.input}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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
            ) : suggestionMessage ? (
              <div className={styles.noResults}>
                {suggestionMessage}
              </div>
            ) : null
            }
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;