import "./WeatherDashboard.css";
import SearchBar from "../SearchBar/SearchBar";
import sun from "../../assets/sun.png";

import useFetch from "../../hooks/useFetch";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import MinMaxTemp from "./MinMaxTemp/MinMaxTemp";
import AirConditions from "./AirConditions/AirConditions";

// assets
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { RiWaterPercentFill } from "react-icons/ri";

const WeatherDashboard = (props) => {
  const { city, setCity, apiKey } = props;

  // current weather api call
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
  const { data, error, isLoading } = useFetch(url);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function capitalizeFirstLetter(word) {
    const words = word.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalizedWord = capitalizedWords.join(" ");
    return capitalizedWord;
  }

  return (
    <div className="weather-dashboard">
      <SearchBar city={city} setCity={setCity} />
      {data != null && data.cod != "404" ? (
        <div className="weather-content">
          <div className="weather-content--left">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h3 className="weather-city m-0">{data.name}</h3>
              <p className="m-0 weather-desc">
                {capitalizeFirstLetter(data.weather[0].description)}
              </p>
            </div>

            <p className="weather-temp">{Math.round(data.main.temp)}&deg;</p>
          </div>

          <div className="weather-div">
            <img
              className="current-weather-icon"
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weatherIcon"
              // height={200}
              // width={200}
            />
            {/* <div>
              <p className="m-0">H:</p>
              <p className="m-0">L:</p>
            </div> */}
          </div>
        </div>
      ) : (
        <ErrorComponent />
      )}
      {/* min max temp */}
      <div className="child-card-div">
        <h4 className="child-card--title">Weather Forecast</h4>
        <div className="child-temp-data">
          <MinMaxTemp city={city} apiKey={apiKey} />
        </div>
      </div>

      <br />
      <br />

      {/* air  herererrerer*/}
      <div className="child-card-div">
        <h4 className="child-card--title">Air Conditions</h4>
        {data != null && data.cod != "404" ? (
          <div className="air-div">
            <div className="air-div-row">
              <AirConditions
                title="Feels Like"
                value={Math.round(data.main.feels_like) + `\u00B0 C`}
                icon={<FaTemperatureHalf className="air-icon" />}
              />
              <AirConditions
                title="Humidity"
                value={Math.round(data.main.humidity) + " %"}
                icon={<RiWaterPercentFill className="air-icon" />}
              />
            </div>
            <div className="air-div-row">
              <AirConditions
                title="Wind"
                value={Math.round(data.wind.speed) + " km"}
                icon={<FaWind className="air-icon" />}
              />
              <AirConditions
                title="Day"
                value={data.weather[0].main}
                icon={<TiWeatherWindyCloudy className="air-icon" />}
              />
            </div>
          </div>
        ) : (
          <p style={{ color: "red" }}>
            Oops! Data not found, please enter the correct city name.
          </p>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
