import { useState } from 'react';
import useFetch from './hooks/useFetch';
import CountryCard from './components/CountryCard';
import SearchBar from './components/SearchBar';
import RegionFilter from './components/RegionFilter';
import './App.css';

const API =
'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,languages';

function App() {
  const { data: countries, loading, error } = useFetch(API);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');

  const regions = ['All','Africa','Americas','Asia','Europe','Oceania'];

  const filtered = (countries || []).filter(c =>
    c.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedRegion === 'All' || c.region === selectedRegion)
  );

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <div className="app-header">
        <h1>🌍 Country Explorer</h1>
      </div>

      <SearchBar onSearch={setSearchTerm} searchTerm={searchTerm} />

      <RegionFilter
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      <p>Showing {filtered.length} of {countries.length} countries</p>

      <div className="country-grid">
        {filtered
          .sort((a,b)=>a.name.common.localeCompare(b.name.common))
          .map(c => (
            <CountryCard key={c.name.common} country={c} />
          ))}
      </div>
    </div>
  );
}

export default App;