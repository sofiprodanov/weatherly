// Servicio de clima - OpenWeatherMap + lista predefinida
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherService = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  // BUSCAR CIUDADES - LISTA PREDEFINIDA
  async searchCities(searchTerm) {
    if (!searchTerm || searchTerm.length < 2) return [];
    
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

      const cleanCityName = cityName.split(',')[0].trim();

      const currentWeatherUrl = `${BASE_URL}/weather?q=${cleanCityName},AR&appid=${API_KEY}&units=metric&lang=es`;
      const currentResponse = await fetch(currentWeatherUrl);
      
      if (!currentResponse.ok) {
        throw new Error(`Ciudad "${cleanCityName}" no encontrada`);
      }
      
      const currentData = await currentResponse.json();

      const forecastUrl = `${BASE_URL}/forecast?q=${cleanCityName},AR&appid=${API_KEY}&units=metric&lang=es`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();

      return this.transformApiData(currentData, forecastData, cleanCityName);

    } catch (error) {
      throw error;
    }
  },

  // TRANSFORMAR DATOS
  transformApiData(apiData, forecastData, cityName) {
    const weatherCondition = this.mapWeatherCondition(apiData.weather[0].main);

    return {
      id: apiData.id,
      city: cityName,
      province: this.getProvinceFromCity(cityName),
      temperature: Math.round(apiData.main.temp),
      condition: weatherCondition.description,
      icon: weatherCondition.icon,
      air: {
        feels_like: Math.round(apiData.main.feels_like),
        humidity: apiData.main.humidity,
        wind_speed: Math.round(apiData.wind.speed * 3.6),
        rain_probability: forecastData?.list?.[0]?.pop ? 
                         Math.round(forecastData.list[0].pop * 100) : 0
      },
      hourlyForecast: this.transformHourlyForecast(forecastData),
      weeklyForecast: this.transformWeeklyForecast(forecastData)
    };
  },

  // MAPEAR CONDICIONES
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
    };
    
    return conditionMap[apiCondition] || { description: 'Despejado', icon: 'sunny' };
  },

  // TRANSFORMAR PRONÓSTICO POR HORA
  transformHourlyForecast(forecastData) {
    if (!forecastData?.list) return [];
    
    return forecastData.list.slice(0, 8).map(item => {
      const condition = this.mapWeatherCondition(item.weather[0].main);
      
      return {
        hour: new Date(item.dt * 1000).getHours() + ':00',
        temperature: Math.round(item.main.temp),
        icon: condition.icon
      };
    });
  },

  // TRANSFORMAR PRONÓSTICO SEMANAL
  transformWeeklyForecast(forecastData) {
    if (!forecastData?.list) return [];
    
    const dailyForecasts = [];
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    for (let i = 0; i < 7; i++) {
      const dayData = forecastData.list[i * 8];
      if (!dayData) break;
      
      const condition = this.mapWeatherCondition(dayData.weather[0].main);
      const date = new Date(dayData.dt * 1000);
      
      dailyForecasts.push({
        day: days[date.getDay()],
        max: Math.round(dayData.main.temp_max),
        min: Math.round(dayData.main.temp_min),
        icon: condition.icon
      });
    }
    
    return dailyForecasts;
  },

  // OBTENER PROVINCIA
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
    
    return cityProvinceMap[cityName] || cityName;
  },

  // ACTUALIZAR PREFERENCIAS
  async updateWeatherPreference(cityName, preferences) {
    await this.delay(300);
    
    return {
      success: true,
      message: "Preferencias guardadas correctamente",
      data: { cityName, ...preferences },
      timestamp: new Date().toISOString()
    };
  }
};