import { useState } from "react";
import styles from "./WeatherMain.module.css";
import { SunnyIcon, CloudyIcon, RainyIcon, WindyIcon, SnowyIcon, StormIcon, HotThermometerIcon, ColdThermometerIcon } from "./Icons";
import { useWeather } from "../../context/WeatherContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";
import { useUpdateWeatherPreference } from "../../hooks/useWeather";

const WeatherMain = () => {
  const { selectedCity, isLoading, error } = useWeather();
  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: toggleFavorite, isPending } = useUpdateWeatherPreference();

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);

    toggleFavorite({
      cityName: selectedCity.city,
      preferences: { isFavorite: !isFavorite }
    }, {
      onSuccess: () => {
      },
      onError: (error) => {
        setIsFavorite(isFavorite);
        alert("Error al guardar favorito");
      }
    });
  };

  // Estados de carga y error
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!selectedCity) return <ErrorMessage message="No hay ciudad seleccionada" />;

  const weatherData = selectedCity;

  const renderWeatherIcon = (icon, temperature) => {
    // Casos especiales por temperatura
    if (temperature < 1) return <SnowyIcon />;
    if (temperature >= 1 && temperature <= 12) return <ColdThermometerIcon />;

    // Íconos SVG segun condicion
    switch (icon) {
      case "cloudy":
        return <CloudyIcon />;
      case "rain":
        return <RainyIcon />;
      case "windy":
        return <WindyIcon />;
      case "snow":
        return <SnowyIcon />;
      case "storm":
        return <StormIcon />;
      case "sunny":
        return temperature > 30 ? <HotThermometerIcon /> : <SunnyIcon />;
      default:
        return <SunnyIcon />;
    }
  };

  return (
    <section className={styles.weatherMain}>
      <div className={styles.top}>
        <div className={styles.cityHeader}>
          <h2 className={styles.city}>
            {weatherData.city}, {weatherData.province}
            <button
              onClick={handleToggleFavorite}
              disabled={isPending}
              className={styles.favoriteBtn}
              title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </h2>
        </div>
        <p className={styles.condition}>{weatherData.condition}</p>
      </div>

      <div className={styles.bottom}>
        <span className={styles.temperature}>{weatherData.temperature}°</span>
        <div className={styles.icon}>
          {renderWeatherIcon(weatherData.icon, weatherData.temperature)}
        </div>
      </div>
    </section>
  );
};

export default WeatherMain;