const BASE_URL = "/api/weather";

export async function fetchWeatherByCity(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("Falta VITE_WEATHER_API_KEY en .env (local) o en Vercel.");
  }

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: "metric", // Celsius
    lang: "es",      // Español
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!res.ok) {
    // Intentar leer mensaje de error de OpenWeather
    let msg = `Error ${res.status}`;
    try {
      const err = await res.json();
      if (err?.message) msg = `${msg}: ${err.message}`;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
