import { useState, useRef } from 'react';
import { useSearchCities, useCities } from './useWeather';

export const useSearchInput = (onCitySelect) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const { data: searchResults = [], isLoading: searchLoading } = useSearchCities(searchTerm);
  const { data: popularCities = [] } = useCities();

  const handleCitySelect = (city) => {
    setSearchTerm('');
    setShowSuggestions(false);
    
    // Ejecutar el callback para cambiar la ciudad
    onCitySelect(city);
    
    // Mantener foco en el input después de un pequeño delay
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    // Pequeño delay para permitir click en sugerencias
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const getCitiesToShow = () => {
    if (searchTerm.length > 0) {
      return searchResults;
    } else {
      return popularCities;
    }
  };

  return {
    searchTerm,
    showSuggestions,
    inputRef,
    isLoading: searchLoading,
    citiesToShow: getCitiesToShow(),
    handleCitySelect,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    setShowSuggestions
  };
};