import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute"; 
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import "./styles/globals.css";


/**
 * - Renderiza el Layout y dentro de él la página principal (Home).
 */

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>    
        <ThemeProvider>
          <WeatherProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="favoritos" element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  } />
                </Route>
                <Route path="/login" element={
                  <PublicOnlyRoute>
                    <Login />
                  </PublicOnlyRoute>
                } />
                <Route path="*" element={
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2>404 - Página no encontrada</h2>
                    <p>La página que buscas no existe.</p>
                  </div>
                } />
              </Routes>
            </BrowserRouter>
          </WeatherProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;