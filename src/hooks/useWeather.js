import { useQuery, useMutation } from '@tanstack/react-query';
import { weatherService } from '../services/weatherService';

// Hook para buscar ciudades
export const useSearchCities = (searchQuery) => {
  return useQuery({
    queryKey: ['search-cities', searchQuery],
    queryFn: () => weatherService.searchCities(searchQuery),
    enabled: !!searchQuery && searchQuery.length >= 2,
    staleTime: 30 * 60 * 1000,
  });
};

// Hook para obtener datos del clima
export const useWeatherData = (cityName) => {
  return useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => weatherService.getWeatherData(cityName),
    enabled: !!cityName,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

// Hook para ciudades populares
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: () => weatherService.getCities(),
    staleTime: 30 * 60 * 1000,
  });
};

// Hook para guardar preferencias (favoritos)
export const useUpdateWeatherPreference = () => {
  return useMutation({
    mutationFn: ({ cityName, preferences }) =>
      weatherService.updateWeatherPreference(cityName, preferences),
  });
};