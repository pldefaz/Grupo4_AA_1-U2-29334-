import { useEffect, useState } from "react";
import "./App.css";
import { fetchWeatherByCity } from "./services/weatherService";

export default function App() {
  const [city, setCity] = useState("Quito");
  const [selectedCity, setSelectedCity] = useState("Quito");

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
        const result = await fetchWeatherByCity(selectedCity);
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (selectedCity) load();

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);

  return (
    <div className="app">
      <h1>Mundial 2026 - Clima</h1>

      <div className="controls">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ej: Vancouver"
        />
        <button onClick={() => setSelectedCity(city)} disabled={loading}>
          {loading ? "Cargando..." : "Consultar"}
        </button>
      </div>

      {error && <p className="error">❌ {error}</p>}

      {data && !error && (
        <div className="card">
          <h2>{data.name}</h2>
          <p>🌡️ {Math.round(data.main.temp)} °C</p>
          <p>☁️ {data.weather?.[0]?.description}</p>
          <p>💧 Humedad: {data.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}
