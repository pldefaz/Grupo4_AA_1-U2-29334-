export default function CityList({ cities, selectedCity, onSelect, disabled }) {
  return (
    <div className="cityList">
      {cities.map((c) => (
        <button
          key={c}
          className={`cityBtn ${selectedCity === c ? "active" : ""}`}
          onClick={() => onSelect(c)}
          disabled={disabled}
          type="button"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
