import React, { useEffect, useState } from 'react'
import Search from './SearchComp'

function Weather() {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=1ad7977fb6744982b4452021242703&q=${param}`);

            const data = await response.json();

            console.log(data, "data");

            if (data) {
                setWeatherData(data);
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    useEffect(() => {
        fetchWeatherData("pune");
    }, [])

    console.log(weatherData)

    return (
        <div className='weather-container'>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ? <div className="loading">Loading Data...</div> :
                    <div>
                        <div className='city-name'>
                            <h2>{weatherData?.location.name}, <span>{weatherData?.location.region}</span></h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className='temp1'>Temprature: {weatherData?.current.temp_c} Degree Celcius</div>
                        <p className='description'>
                            Description: {weatherData?.current.condition.text}
                        </p>
                        <div className='weather-info'>
                            <div>
                                <div>
                                    <p className='humidity'>Humidity: {weatherData?.current.humidity}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Weather
