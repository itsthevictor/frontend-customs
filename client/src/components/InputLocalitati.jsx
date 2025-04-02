import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import * as cities from '../../../utils/localitati.json';

console.log(cities);
const InputLocalitati = () => {
  const [selectedCounty, setSelectedCounty] = useState('');
  const [countyQuery, setCountyQuery] = useState('');
  const [filteredCounties, setFilteredCounties] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [cityQuery, setCityQuery] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  // Normalize strings to handle diacritics
  const normalizeString = (str) =>
    str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  // Filter counties based on the query
  useEffect(() => {
    const normalizedQuery = normalizeString(countyQuery);

    const filtered = cities.judete.filter((item) => {
      const normalizedCountyName = normalizeString(item.nume);
      return normalizedCountyName.includes(normalizedQuery);
    });

    setFilteredCounties(filtered);
  }, [countyQuery]);

  // Update city list when a county is selected
  useEffect(() => {
    const citiesInCounty = cities.judete.filter(
      (item) => item.nume === selectedCounty
    );

    setCityList(citiesInCounty[0]?.localitati || []);
  }, [selectedCounty]);

  // Filter cities based on the query
  useEffect(() => {
    const normalizedQuery = normalizeString(cityQuery);

    const filtered = cityList.filter((item) => {
      const normalizedCityName = normalizeString(item.nume);
      return normalizedCityName.includes(normalizedQuery);
    });

    setFilteredCities(filtered);
  }, [cityQuery, cityList]);

  const handleFindCounty = (value) => {
    setCountyQuery(value);
  };

  const handleFindCity = (value) => {
    setCityQuery(value);
  };

  const handleSelectCounty = (countyName) => {
    setSelectedCounty(countyName); // Set the selected county
    setCountyQuery(countyName); // Update the query
    setFilteredCounties([]); // Hide the dropdown
  };

  const handleSelectCity = (cityName) => {
    setCityQuery(cityName); // Set the selected city
    setFilteredCities([]); // Hide the dropdown
  };

  return (
    <Form className='superstruct-form' method='post'>
      <div className='title'>
        <h2 className='w-xs'>Form</h2>
        <h5 className='form-subtitle'>Autocomplete cities</h5>
      </div>
      <div className='form-row'>
        <label htmlFor='county'>County</label>
        <input
          className='input'
          type='text'
          name='county'
          id='county'
          value={countyQuery}
          onChange={(e) => handleFindCounty(e.target.value)}
          autoComplete='off'
        />
        {countyQuery.length > 1 && (
          <ul className='autocomplete-dropdown'>
            {filteredCounties.map((item, i) => (
              <li
                className='autocomplete-item'
                key={i}
                onClick={() => handleSelectCounty(item.nume)}
              >
                {item.nume}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='form-row'>
        <label htmlFor='City'>City</label>
        <input
          className='input city-input'
          type='text'
          name='City'
          id='City'
          value={cityQuery}
          onChange={(e) => handleFindCity(e.target.value)}
          autoComplete='off'
        />
        {cityQuery.length > 1 && (
          <ul className='autocomplete-dropdown'>
            {filteredCities.map((item, i) => (
              <li
                className='autocomplete-item'
                key={i}
                onClick={() => {
                  setCityQuery(item.nume); // Set the selected city
                  setFilteredCities([]); // Hide the dropdown
                }}
              >
                {item.nume}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='btn-row'>
        <button className='btn form-btn'>Submit</button>
      </div>
    </Form>
  );
};

export default InputLocalitati;
