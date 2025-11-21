import styles from "./Home.module.css";
import WeatherMain from "../components/WeatherMain/WeatherMain";
import HourlyForecast from "../components/HourlyForecast/HourlyForecast";
import AirConditions from "../components/AirConditions/AirConditions";
import WeeklyForecast from "../components/WeeklyForecast/WeeklyForecast";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import { useWeather } from "../context/WeatherContext";

const Home = () => {
  const { isLoading, error, selectedCity } = useWeather();

  // Estado de carga
  if (isLoading) {
    return (
      <div className={styles.homeContent}>
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className={styles.homeContent}>
        <div className={styles.errorContainer}>
          <ErrorMessage
            message={error.message || "Error al cargar los datos del clima"}
          />
        </div>
      </div>
    );
  }

  // Estado vacío (no hay ciudad seleccionada o datos)
  if (!selectedCity) {
    return (
      <div className={styles.homeContent}>
        <div className={styles.errorContainer}>
          <ErrorMessage
            message="No se encontraron datos para la ciudad seleccionada. Intenta con otra ciudad."
            showRetry={false}
          />
        </div>
      </div>
    );
  }

  if (!selectedCity.hourlyForecast || !selectedCity.weeklyForecast) {
    return (
      <div className={styles.homeContent}>
        <div className={styles.errorContainer}>
          <ErrorMessage
            message="Datos incompletos. Intenta recargar la página."
          />
        </div>
      </div>
    );
  }

  // Estado normal - mostrar contenido
  return (
    <div className={styles.homeContent}>
      {/* Contenido principal */}
      <div className={styles.leftColumn}>
        <div className={styles.topSection}>
          <WeatherMain />
        </div>

        {/* Sección media con pronóstico por hora y condiciones del aire */}
        <div className={styles.middleSection}>
          <HourlyForecast />
          <AirConditions />
        </div>
      </div>

      {/* Pronóstico semanal - sidebar derecho */}
      <div className={styles.rightColumn}>
        <WeeklyForecast />
      </div>
    </div>
  );
};

export default Home;