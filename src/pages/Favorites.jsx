import styles from "./Favorites.module.css";
import { useWeather } from "../context/WeatherContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";

const Favorites = () => {
  const { favorites, isLoading, error, toggleFavorite, changeCity } = useWeather();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleCityClick = (city) => {
    changeCity(city.city);
  };

  const handleFavoriteToggle = (city, e) => {
    e.stopPropagation();
    toggleFavorite(city);
  };

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Ciudades Favoritas</h1>
      
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⭐</div>
          <h3>No tienes ciudades favoritas</h3>
          <p>Agrega ciudades a favoritos desde la página principal</p>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map((city, index) => (
            <div 
              key={index} 
              className={styles.favoriteCard}
              onClick={() => handleCityClick(city)}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cityName}>
                  {city.city}, {city.province}
                </h3>
                <button
                  onClick={(e) => handleFavoriteToggle(city, e)}
                  className={styles.favoriteBtn}
                  title="Quitar de favoritos"
                >
                  ★
                </button>
              </div>
              
              <div className={styles.weatherInfo}>
                <span className={styles.temperature}>{city.temperature}°</span>
                <span className={styles.condition}>{city.condition}</span>
              </div>

              <div className={styles.airConditions}>
                <div className={styles.airItem}>
                  <span>💨</span>
                  <span>{city.air.wind_speed} km/h</span>
                </div>
                <div className={styles.airItem}>
                  <span>💧</span>
                  <span>{city.air.humidity}%</span>
                </div>
                <div className={styles.airItem}>
                  <span>🌡️</span>
                  <span>{city.air.feels_like}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;