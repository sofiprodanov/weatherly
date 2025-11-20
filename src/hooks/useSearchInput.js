import { useState, useRef } from 'react';
import { useSearchCities } from '../hooks/useWeather';
import { useLocation } from 'react-router';

export const useSearchInput = (onCitySelect, navigate) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const location = useLocation();

  const { data: searchResults = [], isLoading: searchLoading } = useSearchCities(searchTerm);

  const popularCities = [
    "Buenos Aires", "Resistencia", "Córdoba", "Mendoza", "Rosario",
    "La Plata", "Mar del Plata", "Salta", "Santa Fe", "San Juan",
    "San Luis", "Neuquén", "Formosa", "Corrientes", "Posadas",
    "Tucumán", "Bahía Blanca", "Paraná", "Santiago del Estero", "Ushuaia"
  ];

  const handleCitySelect = (city) => {
    setSearchTerm('');
    setShowSuggestions(false);
    
    onCitySelect(city);
    
    if (location.pathname !== '/') {
      navigate('/');
    }
    
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

  const getSuggestionMessage = () => {
    if (searchTerm.length > 0) {
      if (searchTerm.length < 2) {
        return "Escribe al menos 2 caracteres";
      } else if (searchResults.length === 0) {
        return "No se encontraron ciudades";
      }
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