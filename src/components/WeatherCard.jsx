export default function WeatherCard({ data }) {
  const temp = Math.round(data?.main?.temp ?? 0);
  const desc = data?.weather?.[0]?.description ?? "";
  const name = data?.name ?? "";

  return (
    <div className="weatherCard">
      <h2 className="cityTitle">{name}</h2>
      <p className="temp">🌡️ {temp} °C</p>
      <p className="desc">☁️ {desc}</p>
      <p className="meta">💧 Humedad: {data?.main?.humidity ?? 0}%</p>
    </div>
  );
}
