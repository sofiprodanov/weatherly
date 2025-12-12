import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simular llamada a API
    setTimeout(() => {
      // LOGIN MOCK - Siempre funciona con cualquier email/password
      login(formData.email); // Pasamos el email para personalizar
      setIsLoading(false);
      navigate(from, { replace: true });
    }, 800);
  };

  // Demo rápido (opcional)
  const handleQuickDemo = () => {
    setFormData({
      email: 'demo@weatherly.com',
      password: 'demopass123'
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Weatherly</span>
        </div>
        
        <h2 className={styles.title}>Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="tu@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>
          
          {/* Demo rápido */}
          <div className={styles.demoHint}>
            <p><strong>💡 Demo Rápido:</strong></p>
            <button 
              type="button"
              onClick={handleQuickDemo}
              className={styles.demoButton}
              disabled={isLoading}
            >
              Cargar credenciales demo
            </button>
            <p className={styles.demoCredentials}>
              Cualquier email válido y contraseña de 6+ caracteres funciona
            </p>
          </div>
          
          {/* Botón de submit */}
          <button 
            type="submit" 
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                Iniciando sesión...
              </>
            ) : 'Iniciar Sesión'}
          </button>
        </form>
        
        {/* Información */}
        <div className={styles.info}>
          <p className={styles.infoNote}>
            <strong>⚠️ NOTA:</strong> Este es un sistema de autenticación simulado.<br/>
            No se validan credenciales reales. Cualquier dato válido funciona.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;