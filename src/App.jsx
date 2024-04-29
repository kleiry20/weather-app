import "./App.css";

// import WeatherDashboard from "./components/WeatherDashboard/WeatherDashboard";
// import FourDaysForecast from "./components/FourDaysForecast/FourDaysForecast";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  // const [weatherData, setWeatherData] = useState(null);

  return (
    // <div className="app">
    //   <DashboardPage />
    //   <WeatherDashboard
    //     weatherData={weatherData}
    //     setWeatherData={setWeatherData}
    //   />
    //   <FourDaysForecast />
    // </div>
    <>
      <DashboardPage />
    </>
  );
}

export default App;
