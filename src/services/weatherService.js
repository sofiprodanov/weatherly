const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0';

const REQUEST_TIMEOUT = 8000;

export const weatherService = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  },

  // BUSCAR CIUDADES - LISTA PREDEFINIDA
  async searchCities(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];
    
    await this.delay(300);
    
    const argentinianCities = [
      "Buenos Aires", "Resistencia", "Córdoba", "Mendoza", "Rosario",
      "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan",
      "San Luis", "Neuquén", "Formosa", "Corrientes", "Posadas",
      "Tucumán", "Bahía Blanca", "Paraná", "Santiago del Estero", "Ushuaia",
      "San Miguel de Tucumán", "Viedma", "Rawson", "Río Gallegos", "Reconquista",
      "Río Cuarto", "Comodoro Rivadavia", "San Salvador de Jujuy", "San Rafael", "San Nicolás"
    ];
    
    const results = argentinianCities.filter(city =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return results.slice(0, 5);
  },

  // OBTENER DATOS DEL CLIMA (API)
  async getWeatherData(cityName) {
    try {
      if (!API_KEY) {
        throw new Error('API Key no configurada. Revisa tu archivo .env');
      }

      if (!cityName || cityName.trim().length === 0) {
        throw new Error('El nombre de la ciudad no puede estar vacío');
      }

      const cleanCityName = cityName.split(',')[0].trim();

      // Llamada para datos actuales
      const currentWeatherUrl = `${BASE_URL}/weather?q=${cleanCityName},AR&appid=${API_KEY}&units=metric&lang=es`;
      const currentResponse = await this.fetchWithTimeout(currentWeatherUrl);
      
      if (!currentResponse.ok) {
        await this.handleApiError(currentResponse, cleanCityName);
      }
      
      const currentData = await currentResponse.json();

      if (!currentData.weather || !currentData.weather[0]) {
        throw new Error('Datos de clima incompletos');
      }

      // Llamada para pronóstico
      const forecastUrl = `${BASE_URL}/forecast?q=${cleanCityName},AR&appid=${API_KEY}&units=metric&lang=es`;
      const forecastResponse = await this.fetchWithTimeout(forecastUrl);
      
      if (!forecastResponse.ok) {
        throw new Error('Error al obtener el pronóstico extendido');
      }
      
      const forecastData = await forecastResponse.json();

      return this.transformApiData(currentData, forecastData, cleanCityName);

    } catch (error) {
      console.error('Error en getWeatherData:', error);
      await this.delay(500);
      
      if (error.name === 'AbortError') {
        throw new Error('La solicitud tardó demasiado tiempo. Verifica tu conexión');
      }
      
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión. Verifica tu internet');
      }
      
      throw error;
    }
  },

  // MANEJAR ERRORES DE API
  async handleApiError(response, cityName) {
    const errorText = await response.text();
    console.error(`API Error ${response.status}:`, errorText);
    
    switch (response.status) {
      case 400:
        throw new Error('Solicitud incorrecta al servidor');
      case 401:
        throw new Error('API Key inválida o no autorizada');
      case 404:
        throw new Error(`Ciudad "${cityName}" no encontrada en Argentina`);
      case 429:
        throw new Error('Límite de solicitudes excedido. Intenta más tarde');
      case 500:
        throw new Error('Error interno del servidor de OpenWeather');
      case 502:
      case 503:
        throw new Error('Servicio no disponible temporalmente');
      default:
        throw new Error(`Error ${response.status}: No se pudo obtener los datos`);
    }
  },

  // TRANSFORMAR DATOS
  transformApiData(apiData, forecastData, cityName) {
    try {
      const weatherCondition = this.mapWeatherCondition(apiData.weather[0].main);

      return {
        id: apiData.id || Date.now(),
        city: cityName,
        province: this.getProvinceFromCity(cityName),
        temperature: Math.round(apiData.main.temp),
        condition: weatherCondition.description,
        icon: weatherCondition.icon,
        air: {
          feels_like: Math.round(apiData.main.feels_like),
          humidity: apiData.main.humidity || 0,
          wind_speed: Math.round((apiData.wind.speed || 0) * 3.6),
          rain_probability: forecastData?.list?.[0]?.pop ? 
                           Math.round(forecastData.list[0].pop * 100) : 0
        },
        hourlyForecast: this.transformHourlyForecast(forecastData),
        weeklyForecast: this.transformWeeklyForecast(forecastData),
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error transformando datos API:', error);
      throw new Error('Error procesando los datos del clima');
    }
  },

  // MAPEAR CONDICIONES CLIMÁTICAS
  mapWeatherCondition(apiCondition) {
    const conditionMap = {
      'Clear': { description: 'Despejado', icon: 'sunny' },
      'Clouds': { description: 'Nublado', icon: 'cloudy' },
      'Rain': { description: 'Lluvioso', icon: 'rain' },
      'Drizzle': { description: 'Llovizna', icon: 'rain' },
      'Thunderstorm': { description: 'Tormenta', icon: 'storm' },
      'Snow': { description: 'Nevando', icon: 'snow' },
      'Mist': { description: 'Neblina', icon: 'cloudy' },
      'Fog': { description: 'Niebla', icon: 'cloudy' },
      'Smoke': { description: 'Humo', icon: 'cloudy' },
      'Haze': { description: 'Bruma', icon: 'cloudy' },
      'Dust': { description: 'Polvo', icon: 'cloudy' },
      'Sand': { description: 'Arena', icon: 'cloudy' },
      'Ash': { description: 'Ceniza', icon: 'cloudy' },
      'Squall': { description: 'Chubasco', icon: 'rain' },
      'Tornado': { description: 'Tornado', icon: 'storm' }
    };
    
    return conditionMap[apiCondition] || { description: 'Despejado', icon: 'sunny' };
  },

  // TRANSFORMAR PRONÓSTICO POR HORA
  transformHourlyForecast(forecastData) {
    if (!forecastData?.list) return [];
    
    try {
      return forecastData.list.slice(0, 8).map(item => {
        const condition = this.mapWeatherCondition(item.weather[0].main);
        const date = new Date(item.dt * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        
        return {
          hour: `${hours}:00`,
          temperature: Math.round(item.main.temp),
          icon: condition.icon,
          condition: condition.description
        };
      });
    } catch (error) {
      console.error('Error transformando pronóstico por hora:', error);
      return [];
    }
  },

  // TRANSFORMAR PRONÓSTICO SEMANAL
  transformWeeklyForecast(forecastData) {
    if (!forecastData?.list) return [];
    
    try {
      const dailyForecasts = [];
      const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
      
      const dailyData = {};
      
      forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!dailyData[dayKey]) {
          dailyData[dayKey] = {
            temps: [],
            conditions: [],
            date: date
          };
        }
        
        dailyData[dayKey].temps.push(item.main.temp);
        dailyData[dayKey].conditions.push(item.weather[0].main);
      });
      
      // Procesar cada día
      Object.values(dailyData).slice(0, 7).forEach(day => {
        const maxTemp = Math.round(Math.max(...day.temps));
        const minTemp = Math.round(Math.min(...day.temps));
        
        const conditionCount = {};
        day.conditions.forEach(cond => {
          conditionCount[cond] = (conditionCount[cond] || 0) + 1;
        });
        const mostFrequentCondition = Object.keys(conditionCount).reduce((a, b) => 
          conditionCount[a] > conditionCount[b] ? a : b
        );
        const condition = this.mapWeatherCondition(mostFrequentCondition);
        
        dailyForecasts.push({
          day: days[day.date.getDay()],
          max: maxTemp,
          min: minTemp,
          icon: condition.icon,
          condition: condition.description
        });
      });
      
      return dailyForecasts;
    } catch (error) {
      console.error('Error transformando pronóstico semanal:', error);
      return [];
    }
  },

  // OBTENER PROVINCIA SEGÚN CIUDAD
  getProvinceFromCity(cityName) {
    const cityProvinceMap = {
      'Resistencia': 'Chaco',
      'Buenos Aires': 'Buenos Aires', 
      'Córdoba': 'Córdoba',
      'Mendoza': 'Mendoza',
      'Ushuaia': 'Tierra del Fuego',
      'Rosario': 'Santa Fe',
      'La Plata': 'Buenos Aires',
      'Mar del Plata': 'Buenos Aires',
      'Salta': 'Salta',
      'Santa Fe': 'Santa Fe',
      'San Juan': 'San Juan',
      'San Luis': 'San Luis',
      'Neuquén': 'Neuquén',
      'Formosa': 'Formosa',
      'Corrientes': 'Corrientes',
      'Posadas': 'Misiones',
      'Tucumán': 'Tucumán',
      'Bahía Blanca': 'Buenos Aires',
      'Paraná': 'Entre Ríos',
      'Santiago del Estero': 'Santiago del Estero',
      'San Miguel de Tucumán': 'Tucumán',
      'Viedma': 'Río Negro',
      'Rawson': 'Chubut',
      'Río Gallegos': 'Santa Cruz',
      'Reconquista': 'Santa Fe',
      'Río Cuarto': 'Córdoba',
      'Comodoro Rivadavia': 'Chubut',
      'San Salvador de Jujuy': 'Jujuy',
      'San Rafael': 'Mendoza',
      'San Nicolás': 'Buenos Aires'
    };
    
    return cityProvinceMap[cityName] || 'Argentina';
  },

  // OBTENER LISTA DE CIUDADES
  async getCities() {
    await this.delay(200);
    
    return [
      "Buenos Aires", "Resistencia", "Córdoba", "Mendoza", "Rosario",
      "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan"
    ];
  },
};