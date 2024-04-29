import { useState } from "react";
import "./DashboardPage.css";
import WeatherDashboard from "../../components/WeatherDashboard/WeatherDashboard";
import FourDaysForecast from "../../components/SevenDaysForecast/SevenDaysForecast";
import SearchBar from "../../components/SearchBar/SearchBar";

const apiKey = import.meta.env.VITE_API_KEY;

const DashboardPage = () => {
  const [city, setCity] = useState("Delhi");

  return (
    <div className="dashboard-layout">
      {/* <SearchBar /> */}
      <div className="dashboard-page">
        <WeatherDashboard city={city} setCity={setCity} apiKey={apiKey} />
        <FourDaysForecast city={city} setCity={setCity} apiKey={apiKey} />
      </div>
    </div>
  );
};

export default DashboardPage;
