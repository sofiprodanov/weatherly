import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import { WeatherProvider } from "./context/WeatherContext";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * - Renderiza el Layout y dentro de él la página principal (Home).
 */

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <Layout>
          <Home />
        </Layout>
      </WeatherProvider>
    </QueryClientProvider>
  );
}

export default App;