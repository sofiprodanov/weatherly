# Weatherly 🌤️

Weatherly es una aplicación web de clima moderna y completamente funcional construida con **React**. Ofrece una experiencia de usuario **intuitiva** para consultar condiciones climáticas actuales, pronósticos por hora y semanales, con un diseño dashboard elegante y **responsivo**. La aplicación **integra APIs** de clima en tiempo real y permite gestionar **ciudades favoritas**.

---

## Tabla de Contenidos

- [Weatherly 🌤️](#weatherly-️)
  - [Tabla de Contenidos](#tabla-de-contenidos)
  - [Características](#características)
  - [Demo](#demo)
  - [Tecnologías](#tecnologías)
  - [Estructura del Proyecto](#estructura-del-proyecto)
  - [Instalación](#instalación)
  - [Uso](#uso)
  - [Licencia](#licencia)

---

## Características

* Dashboard principal con información climática completa en tiempo real
* Búsqueda inteligente de ciudades con autocompletado
* Gestión de ciudades favoritas para acceso rápido
* Sidebar intuitivo con navegación entre secciones principales
* Pronóstico por horas con gráficos interactivos
* Pronóstico semanal detallado
* Condiciones del aire (humedad, viento, etc)
* Tarjetas interactivas con efectos 3D y hover
* Iconos climáticos dinámicos que se actualizan según las condiciones
* Diseño completamente responsivo para todos los dispositivos
* Tema oscuro/claro 
* Persistencia de datos en localStorage
  
---

## Demo

> Puedes ver el proyecto en [Vercel](#).

---

## Tecnologías

* Frontend: React 18 + Vite
* Estilos: CSS Modules + CSS Variables
* Gestión de Estado: React Hooks (useState, useEffect, useContext) + Custom Hooks
* Enrutamiento: React Router DOM
* Iconos: SVG dinámicos personalizados
* APIs Externas: OpenWeatherMap API
* Deployment: Vercel
* Control de Versiones: Git
  
---

## Estructura del Proyecto

```
weatherly/
├── public/                                 # Archivos públicos estáticos
│   └── iconweathely.svg
├── src/                                    # Código fuente principal
│   ├── components/                         # Componentes de React
│   │   ├── AirConditions/                  # Componente de condiciones del aire
│   │   │   ├── AirConditions.jsx
│   │   │   └── AirConditions.module.css
│   │   ├── HourlyForecast/                 # Pronóstico por horas
│   │   │   ├── HourlyForecast.jsx
│   │   │   └── HourlyForecast.module.css
│   │   ├── Layout/                         # Layout principal
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.module.css
│   │   ├── Navbar/                         # Barra de navegación
│   │   │   ├── Navbar.jsx
│   │   │   └── Navbar.module.css
│   │   ├── Sidebar/                        # Barra lateral
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.module.css
│   │   ├── UI/                             # Componentes de interfaz de usuario
│   │   │   ├── ErrorMessage.jsx
│   │   │   ├── ErrorMessage.module.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── LoadingSpinner.module.module.css
│   │   ├── WeatherMain/                    # Componente principal del clima e iconos SVG
│   │   │   ├── Icons/
│   │   │   │   ├── index.js
│   │   │   │   └── ...
│   │   │   ├── WeatherMain.jsx
│   │   │   └── WeatherMain.module.css
│   │   └── WeeklyForecast/                 # Pronóstico semanal
│   │       ├── WeeklyForecast.jsx
│   │       └── WeeklyForecast.module.css
│   ├── context/                            # Contexto para estado del clima
│   │   └── WeatherContext.jsx              
│   ├── hooks/                              # Custom hooks de React
│   │   ├── useSearchInput.js                        
│   │   └── useWeather.js   
│   ├── pages/                              # Página principal de la aplicación
│   │   ├── Favorites.jsx
│   │   ├── Favorites.module.css   
│   │   ├── Home.jsx                        
│   │   └── Home.module.css                 
│   ├── services/                           # Servicios para APIs externas
│   │   └── weatherService.js
│   ├── styles/                             # Estilos CSS globales
│   │   └── globals.css                     
│   ├── App.jsx                             # Componente raíz de la aplicación
│   └── main.jsx                            # Punto de entrada de la aplicación
├── .gitignore                              # Archivos ignorados por Git
├── eslint.config.js                        # Configuración de ESLint
├── index.html                              # HTML principal
├── LICENSE                                 # Licencia del proyecto
├── package-lock.json                       # Lock file de dependencias
├── package.json                            # Configuración del proyecto y dependencias
├── README.md                               # Documentación del proyecto
└── vite.config.js                          # Configuración de Vite                           
```

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/weatherly.git
```

2. Entrar a la carpeta del proyecto:

```bash
cd weatherly
```

3. Instalar dependencias:

```bash
npm install
```

4. Ejecutar en modo desarrollo:

```bash
npm run dev
```

5. Para producción (build optimizado):

```bash
npm run build
npm run preview
```

> Nota: `dist/` y `node_modules/` deberían estar en `.gitignore`.

---

## Uso

**Dashboard Principal**
* Visualiza temperatura actual, condiciones y sensación térmica
* Consulta pronóstico por horas deslizante
* Revisa pronóstico semanal extendido
* Monitorea condiciones del aire en tiempo real

**Gestión de Favoritos**
* Agrega ciudades a favoritos desde los resultados de búsqueda
* Accede rápidamente a ciudades guardadas
* Elimina favoritos con un click

**Búsqueda Avanzada**
* Búsqueda en tiempo real con sugerencias
* Resultados con información básica del clima
  
**Características Interactivas**
* Tarjetas con efectos hover 3D
* Iconos que cambian según condiciones climáticas
* Diseño adaptativo para móviles y desktop
* Actualizaciones automáticas de datos

**Tips de Uso**
* Usa la geolocalización para obtener clima de tu ubicación actual
* Guarda tus ciudades más consultadas en favoritos
* Explora el pronóstico por horas para planificar tu día
* Consulta el índice UV en condiciones del aire para protección solar

## Licencia

Este proyecto es **Open Source** bajo licencia MIT en el archivo [LICENSE](LICENSE).
