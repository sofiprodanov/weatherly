# Weatherly 🌤️

Weatherly es una aplicación web de clima interactiva construida con **React**, pensada como un dashboard moderno y visual para consultar el clima por ciudad. El proyecto integra **diseño responsivo** y **efectos 3D en tarjetas**.

---

## Tabla de Contenidos

1. [Características](#características)
2. [Demo](#demo)
3. [Tecnologías](#tecnologías)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Instalación](#instalación)
6. [Uso](#uso)
7. [Licencia](#licencia)

---

## Características

* Dashboard principal con resumen del clima por ciudad.
* Búsqueda por localidad.
* Sidebar con categorías y navegación clara.
* Tarjetas interactivas.
* Iconos dinámicos de clima según condiciones (sol, lluvia, nieve, nublado, etc.).
* Horarios y pronósticos por hora.
* Diseño responsivo, moderno y minimalista.

---

## Demo

> Puedes ver el proyecto en [Vercel](#).

---

## Tecnologías

* **Frontend:** React + Vite
* **Estilos:** CSS puro
* **Gestión de estado:** React hooks (`useState`, `useEffect`)
* **Routing:** React DOM
* **Data Mock:** Archivos `citiemock` y `citiesMock` para pruebas sin API externa
* **Deploy:** Vercel

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
├── .env                                    # Variables de entorno
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

* Abrir la aplicación.
* Usar el **sidebar** para navegar entre categorías o secciones.
* Buscar por ciudad usando el **navbar**.
* Consultar pronósticos y ver iconos de clima dinámicos según las condiciones.

## Licencia

Este proyecto es **Open Source** bajo licencia MIT en el archivo [LICENSE](LICENSE).
