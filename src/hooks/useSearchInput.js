import { useState, useRef, useEffect } from 'react';
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

  const blurTimeoutRef = useRef(null);
  const focusTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  const handleCitySelect = (city) => {
    setSearchTerm('');
    setShowSuggestions(false);
    
    if (typeof onCitySelect === 'function') {
      onCitySelect(city);
    }
    
    if (location.pathname !== '/' && typeof navigate === 'function') {
      navigate('/');
    }
    
    focusTimeoutRef.current = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    
    blurTimeoutRef.current = setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const getCitiesToShow = () => {
    if (searchTerm.length > 0) {
      return Array.isArray(searchResults) ? searchResults : [];
    } else {
      return popularCities;
    }
  };

  const getSuggestionMessage = () => {
    if (searchTerm.length > 0) {
      if (searchTerm.length < 2) {
        return "Escribe al menos 2 caracteres";
      } else if (searchResults.length === 0 && !searchLoading) {
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