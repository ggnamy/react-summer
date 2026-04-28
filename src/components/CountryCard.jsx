function CountryCard({ country, isFav, onFav, onClick }) {
  const pop = country.population.toLocaleString();
  const cap = country.capital ? country.capital[0] : 'N/A';

  const lang = country.languages
    ? Object.values(country.languages).slice(0, 2).join(', ')
    : 'N/A';

  return (
    <div className="country-card" onClick={onClick}>
      <img src={country.flags.svg} className="country-flag" />

      <button
        className="fav-btn"
        onClick={(e) => {
          e.stopPropagation();
          onFav(country.name.common);
        }}
      >
        {isFav ? '❤️' : '🤍'}
      </button>

      <div className="country-info">
        <h3>{country.name.common}</h3>
        <p>Capital: {cap}</p>
        <p>Population: {pop}</p>
        <p>Languages: {lang}</p>
      </div>
    </div>
  );
}

export default CountryCard;
