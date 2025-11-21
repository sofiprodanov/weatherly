import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./styles/globals.css";


/**
 * - Renderiza el Layout y dentro de él la página principal (Home).
 */

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <WeatherProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="favoritos" element={<Favorites />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WeatherProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;