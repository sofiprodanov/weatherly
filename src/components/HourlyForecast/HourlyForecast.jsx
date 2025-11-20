import styles from "./HourlyForecast.module.css";
import { WiDaySunny, WiCloudy, WiRain, WiNightClear, WiNightAltCloudy, WiSunset, WiSunrise, WiSnow, WiStrongWind, WiThunderstorm } from "react-icons/wi";
import { useWeather } from "../../context/WeatherContext";
import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorMessage from "../UI/ErrorMessage";

const HourlyForecast = () => {
  const { selectedCity, isLoading, error } = useWeather();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!selectedCity) return <ErrorMessage message="No hay ciudad seleccionada" />;
  if (!selectedCity.hourlyForecast) return <ErrorMessage message="Pronóstico horario no disponible" />;

  const forecast = selectedCity.hourlyForecast;

  const renderIcon = (icon, hour) => {
    const hourNumber = parseInt(hour.split(":")[0]);

    // Franja horaria
    const isSunrise = hourNumber >= 5 && hourNumber < 7; // Amanecer
    const isDay = hourNumber >= 7 && hourNumber < 17; // Día
    const isSunset = hourNumber >= 17 && hourNumber < 20; // Atardecer
    const isNight = hourNumber >= 20 || hourNumber < 5;

    // Íconos según franja horaria
    if (isNight) {
      switch (icon) {
        case "cloudy":
          return <WiNightAltCloudy size={40} color="#94a3b8" />;
        case "rain":
          return <WiRain size={40} color="#3b82f6" />;
        case "storm":
          return <WiThunderstorm size={40} color="#7c3aed" />;
        case "snow":
          return <WiSnow size={40} color="#e0f2fe" />; 
        case "windy":
          return <WiStrongWind size={40} color="#93c5fd" />;
        default:
          return <WiNightClear size={40} color="#facc15" />;
      }
    }

    if (isSunrise) {
      return <WiSunrise size={40} color="#fbbf24" />;
    }

    if (isSunset) {
      return <WiSunset size={40} color="#fb923c" />;
    }

    if (isDay) {
      switch (icon) {
        case "cloudy":
          return <WiCloudy size={40} color="#38bdf8" />;
        case "rain":
          return <WiRain size={40} color="#38bdf8" />;
        case "storm":
          return <WiThunderstorm size={40} color="#7c3aed" />;
        case "snow":
          return <WiSnow size={40} color="#e0f2fe" />;
        case "windy":
          return <WiStrongWind size={40} color="#93c5fd" />;
        default:
          return <WiDaySunny size={40} color="#facc15" />;
      }
    }

    // Fallback por si acaso
    return <WiDaySunny size={40} color="#facc15" />;
  };
  return (
    <section className={styles.hourlyForecast}>
      <h3 className={styles.title}>Pronóstico por hora</h3>
      <div className={styles.list}>
        {forecast.map((hourData, index) => (
          <div key={index} className={styles.item}>
            <p className={styles.hour}>{hourData.hour}</p>
            {renderIcon(hourData.icon, hourData.hour)}
            <p className={styles.temp}>{hourData.temperature}°</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyForecast;
