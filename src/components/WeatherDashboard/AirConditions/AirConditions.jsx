import "./AirConditions.css";
// assets
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";

const AirConditions = (props) => {
  const { title, value, icon } = props;
  //   let airData = [
  //     {
  //       title: "Feels Like",
  //       value: Math.round(data.main.feels_like),
  //     },
  //     {
  //       title: "Humidity",
  //       value: data.main.humidity,
  //     },
  //     {
  //       title: "Wind",
  //       value: Math.round(data.wind.speed),
  //     },
  //     {
  //       title: "Sky",
  //       value: data.weather.main,
  //     },
  //   ];
  return (
    <>
      {/* <div className="air-row-child">
        <FaTemperatureHalf />
        <div className="air-child-values">
          <p className="m-0">Feels Like</p>
          <p className="m-0">{Math.round(data.main.feels_like)}&deg;</p>
        </div>
      </div> */}
      {/* {airData.map((item, index) => (
        <div key={index} className="a">
          <FaTemperatureHalf className="tempIcon" size="30px" />
          <div className="b">
            <p className="m-0">Real Feel</p>
            <p className="m-0">30</p>
          </div>
        </div>
      ))} */}

      <div className="air-component">
        {/* <img className="air-icon" src={icon} alt="" /> */}
        {/* <div className="air-icon">{icon}</div> */}
        {icon}
        <div className="air-component--content">
          <p className="m-0 air-title">{title}</p>
          <p className="m-0 air-value">{value}</p>
        </div>
      </div>
    </>
  );
};

export default AirConditions;
