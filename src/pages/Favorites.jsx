import styles from "./Favorites.module.css";
import { useWeather } from "../context/WeatherContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, isLoading, error, toggleFavorite, changeCity } = useWeather();

  if (!user) {
    return (
      <div className={styles.notLoggedIn}>
        <div className={styles.notLoggedInContent}>
          <div className={styles.notLoggedInIcon}>🔒</div>
          <h2 className={styles.notLoggedInTitle}>Acceso Restringido</h2>
          <p className={styles.notLoggedInMessage}>
            Para ver tus ciudades favoritas, necesitas iniciar sesión.
          </p>
          <Link to="/login" className={styles.notLoggedInButton}>
            Iniciar Sesión
          </Link>
          <p className={styles.notLoggedInHint}>
            ¿No tienes cuenta? El sistema de autenticación es simulado.
            Solo haz click en "Iniciar Sesión Demo".
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

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
            if (!city || !city.city) return null;

            return (
              <div
                key={`${city.city}-${index}`}
                className={styles.favoriteCard}
                onClick={() => changeCity(city.city)}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cityName}>
                    {city.city}, {city.province || 'Argentina'}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(city);
                    }}
                    className={styles.favoriteBtn}
                    title="Quitar de favoritos"
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