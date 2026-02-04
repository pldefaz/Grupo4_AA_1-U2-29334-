import { useEffect, useState } from "react";
import "./App.css";
import CityList from "./components/CityList";
import WeatherCard from "./components/WeatherCard";
import { fetchWeatherByCity } from "./services/weatherService";

export default function App() {
  const cities = ["Ciudad de México", "Nueva York", "Vancouver"];

  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      setData(null);

      try {
        // Nota: OpenWeather a veces entiende mejor "Mexico City" / "New York" / "Vancouver"
        // pero primero probamos tal cual. Si falla, te dejo fallback en el punto 7.
        const result = await fetchWeatherByCity(selectedCity);
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (selectedCity) load();
    return () => (cancelled = true);
  }, [selectedCity]);

  return (
    <div className="app">
      <header className="header">
        <h1>Mundial 2026 - Clima</h1>
        <p>Selecciona una sede para consultar el clima en tiempo real.</p>
      </header>

      <CityList
        cities={cities}
        selectedCity={selectedCity}
        onSelect={setSelectedCity}
        disabled={loading}
      />

      {loading && <p className="info">⏳ Cargando...</p>}
      {error && <p className="error">❌ {error}</p>}
      {data && !error && <WeatherCard data={data} />}
    </div>
  );
}
