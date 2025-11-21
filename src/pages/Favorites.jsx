import styles from "./Favorites.module.css";
import { useWeather } from "../context/WeatherContext";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";

const Favorites = () => {
  const { favorites, isLoading, error, toggleFavorite, changeCity } = useWeather();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleCityClick = (city) => {
    if (!city || !city.city) {
      console.error('Ciudad inválida en favoritos:', city);
      return;
    }

    try {
      changeCity(city.city);
    } catch (err) {
      console.error('Error al cambiar ciudad:', err);
    }
  };

  const handleFavoriteToggle = (city, e) => {
    e.stopPropagation();

    if (!city || !city.city) {
      console.error('Intento de eliminar favorito inválido:', city);
      return;
    }

    try {
      toggleFavorite(city);
    } catch (err) {
      console.error('Error al alternar favorito:', err);
    }
  };

  const validFavorites = Array.isArray(favorites) ? favorites : [];

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.title}>Ciudades Favoritas</h1>

      {validFavorites.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>⭐</div>
          <h3>No tienes ciudades favoritas</h3>
          <p>Agrega ciudades a favoritos desde la página principal</p>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {validFavorites.map((city, index) => {

            if (!city || !city.city) {
              console.warn('Ciudad inválida en favoritos, índice:', index);
              return null;
            }

            return (
              <div
                key={`${city.city}-${index}`}
                className={styles.favoriteCard}
                onClick={() => handleCityClick(city)}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cityName}>
                    {city.city}, {city.province || 'Argentina'}
                  </h3>
                  <button
                    onClick={(e) => handleFavoriteToggle(city, e)}
                    className={styles.favoriteBtn}
                    title="Quitar de favoritos"
                    aria-label={`Quitar ${city.city} de favoritos`}
                  >
                    ★
                  </button>
                </div>

                <div className={styles.weatherInfo}>
                  <span className={styles.temperature}>
                    {typeof city.temperature === 'number' ? `${city.temperature}°` : '--°'}
                  </span>
                  <span className={styles.condition}>
                    {city.condition || 'Despejado'}
                  </span>
                </div>

                {city.air && (
                  <div className={styles.airConditions}>
                    <div className={styles.airItem}>
                      <span>💨</span>
                      <span>{city.air.wind_speed || 0} km/h</span>
                    </div>
                    <div className={styles.airItem}>
                      <span>💧</span>
                      <span>{city.air.humidity || 0}%</span>
                    </div>
                    <div className={styles.airItem}>
                      <span>🌡️</span>
                      <span>{city.air.feels_like || '--'}°</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;