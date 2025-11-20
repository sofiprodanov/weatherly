import { useState, useRef } from 'react';
import { useSearchCities, useCities } from './useWeather';

export const useSearchInput = (onCitySelect) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // ✅ NUEVO
  const inputRef = useRef(null);

  const { data: searchResults = [], isLoading: searchLoading } = useSearchCities(searchTerm);
  const { data: popularCities = [] } = useCities();

  const handleCitySelect = (city) => {
    setSearchTerm('');
    setShowSuggestions(false);
    setHasInteracted(false);
    
    onCitySelect(city);
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
    setHasInteracted(true);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const getCitiesToShow = () => {
    if (searchTerm.length > 0) {
      return searchResults;
    } else if (hasInteracted) {
      return popularCities;
    } else {
      return [];
    }
  };

  const getSuggestionMessage = () => {
    if (!hasInteracted && searchTerm.length === 0) {
      return null; //
    }
    
    if (searchTerm.length > 0) {
      if (searchTerm.length < 2) {
        return "Escribe al menos 2 caracteres";
      } else if (searchResults.length === 0) {
        return "No se encontraron ciudades";
      }
    } else if (hasInteracted && popularCities.length === 0) {
      return "No hay ciudades populares disponibles";
    }
    
    return null;
  };

  return {
    searchTerm,
    showSuggestions,
    inputRef,
    isLoading: searchLoading,
    citiesToShow: getCitiesToShow(),
    suggestionMessage: getSuggestionMessage(),
    handleCitySelect,
    handleInputChange,
    handleInputFocus,
    handleInputBlur,
    setShowSuggestions
  };
};