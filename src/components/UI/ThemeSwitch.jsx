import { useTheme } from "../../context/ThemeContext";
import "./ThemeSwitch.css";

const ThemeSwitch = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <div className="theme-switch">
      <input 
        type="checkbox" 
        id="theme-switch" 
        className="theme-switch__checkbox"
        checked={!isDarkMode}
        onChange={handleToggle}
      />
      <label htmlFor="theme-switch" className="theme-switch__container">
        <div className="theme-switch__circle-container">
          <div className="theme-switch__sun-moon-container"></div>
        </div>
      </label>
    </div>
  );
};

export default ThemeSwitch;