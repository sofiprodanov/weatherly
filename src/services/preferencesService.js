export const preferencesService = {
  delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

  async updateThemePreference(theme) {
    await this.delay(300);
    
    return {
      success: true,
      message: "Tema guardado correctamente",
      data: { 
        theme,
        updatedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };
  },

  async updateWeatherPreference(cityName, preferences) {
    await this.delay(300);
    
    return {
      success: true,
      message: "Preferencias guardadas correctamente",
      data: { 
        cityName, 
        preferences: preferences || {},
        updatedAt: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    };
  }
};