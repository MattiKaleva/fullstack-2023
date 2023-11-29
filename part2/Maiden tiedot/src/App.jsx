import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [weather, setWeather] = useState(null)

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    if(searchResult.length===1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${searchResult[0].latlng[0]}&lon=${searchResult[0].latlng[1]}&appid=${api_key}&units=metric`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const Country = ({name}) => {
    return(
      <li>
        {name}
      </li>
    )
  }

  const showCountry = name => {
      setValue(name)
  }

  const Weather = (country) => {
    if(weather) {
      return (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>
            temperature {weather.main.temp} Celsius
          </p>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <p>
            wind {weather.wind.speed} m/s
          </p>
        </div>
      )}
    
  }

  const Haku = () => {
    if (searchResult.length>10) {
      return(
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (searchResult.length != 1) {
      return(
        <ul>
            {searchResult.map(country =>
            <p>
             <Country key={country.name.common} name={country.name.common}/> 
             <button key={country.name.official} onClick={() => showCountry(country.name.common)} >Show</button>
             </p>
             )}
        </ul>
      )} else if (searchResult.length === 1) {

        const country = searchResult[0]
        return(
          <div>
          <h1>
            {country.name.common}
          </h1>
            <p>
              Capital {country.capital} <br />
              Area {country.area}
            </p>
            <h2> Languages: </h2>
            <ul>
              {Object.values(country.languages).map(language =>
                <li key={language}>
                  {language}
                </li>
                )}
            </ul>
            <img src={country.flags.png}/>
            <Weather country = {country}/>
          </div>
        )
      }
  }

  const searchResult = countries.filter(country => country.name.common.match(value))

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange}/>
      </form>
      <Haku/>
    </div>
  )
}

export default App
