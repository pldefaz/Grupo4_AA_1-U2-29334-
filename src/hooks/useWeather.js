import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "../services/weatherService";

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await fetchWeatherByCity(city);
        if (!cancelled) setData(result);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error desconocido");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [city]);

  return { data, loading, error };
}
