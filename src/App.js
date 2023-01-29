import React, { useEffect, useState } from 'react'
import Countries from './Components/Countries';

import "./App.css";
import Country from './Components/Country';
import Search from './Components/Search';

const url = "https://restcountries.com/v3.1/all";

const App = () => {
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
const [countries, setCountries] = useState([]);
const [filteredCountries, setFilteredCountries] = useState(countries);

const fetchData = async (url) => {
setIsLoading(true);
try {
const response = await fetch(url);
const data = await response.json();
setCountries(data);
setFilteredCountries(data);
setIsLoading(false);
setError(null);
} catch (error) {
setIsLoading(false);
setError(error);
}
};

useEffect(() => {
fetchData(url);
}, []);

const handleRemoveCountry = (name) =>{
    const filter = filteredCountries.filter((Country)=> Country.name.common !== name);
    setFilteredCountries(filter);
}

const handelSearch = (searchValue) =>{
    let value = searchValue.toLowerCase();
    const newCountries = countries.filter((Country) => {
        const countryName = Country.name.common.toLowerCase();
        return countryName.startsWith(value);
    });
    setFilteredCountries(newCountries);
}



return (
<>
    <h1>Country App By Ridoy Khan</h1>
    <Search onSearch={handelSearch}/>
    {isLoading && <h2>Loading...</h2>}
    {error && <h2>{error.message}</h2>}
    {countries && (
    <Countries countries={filteredCountries} onRemoveCountry={handleRemoveCountry}/>
    )}
</>
);
};
export default App
