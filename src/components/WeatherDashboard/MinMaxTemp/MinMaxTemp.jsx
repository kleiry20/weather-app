import useFetch from "../../../hooks/useFetch";
import "./MinMaxTemp.css";

// assets
// import clear_icon from "../../../assets/clear.png";
// import snow from "../../../assets/snow.png";
// import humidity from "../../../assets/humidity.png";
// import rain from "../../../assets/rain.png";
// import cloud from "../../../assets/cloud.png";
// import wind from "../../../assets/wind.png";
// import drizzle from "../../../assets/drizzle.png";
// import search from "../../../assets/search.png";
import sun from "../../../assets/sun.png";
import { useState } from "react";

const MinMaxTemp = (props) => {
  const { city, apiKey } = props;

  let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}&units=Metric&cnt=5`;

  const { data, error, isLoading } = useFetch(url);
  console.log("dabba weather", data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  function extractTime(dateString) {
    const date = new Date(dateString);
    const timeFormat = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const time = timeFormat.format(date);

    return time;
  }

  return data != null && data.cod == "200" ? (
    data.list.map((item, index) => (
      <div key={index} className="min-max-div vl">
        <p className="forecast-time">{extractTime(item.dt_txt)}</p>

        <img
          className="forecast-icon"
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
          alt="weatherIcon"
        />
        <p className="forecast-temp">{Math.round(item.main.temp)}&deg;</p>
      </div>
    ))
  ) : (
    <p style={{ color: "maroon" }}>
      Oops! Data not found, please enter the correct city name.
    </p>
  );
};

export default MinMaxTemp;
