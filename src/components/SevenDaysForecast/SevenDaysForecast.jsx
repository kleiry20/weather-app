import "./SevenDaysForecast.css";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import moment from "moment";

const FourDaysForecast = (props) => {
  const { city, apiKey } = props;

  const [istDateTime, setISTDateTime] = useState({ istDate: "", istTime: "" });

  const [quote, setQuote] = useState({
    quoteText: "",
    quoteAuthor: "",
  });

  // to fetch the qoutes api
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(
          "https://quote-garden.onrender.com/api/v3/quotes/random"
        );
        if (response.ok) {
          const data = await response.json();
          const { quoteText, quoteAuthor } = data.data[0];
          setQuote({
            quoteText,
            quoteAuthor,
          });
        } else {
          throw new Error("Failed to fetch quote");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();
  }, []);

  // handles the current time and date
  useEffect(() => {
    const { istDate, istTime } = getCurrentISTDateTime();
    setISTDateTime({ istDate, istTime });
  }, []);

  // 7 day forecast api
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=7&units=Metric`;
  const { data, error, isLoading } = useFetch(url);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let days_of_week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getCurrentISTDateTime = () => {
    // Fetch the current UTC time
    const utcTime = moment.utc();

    // Convert UTC time to IST time
    const istTime = utcTime.clone().utcOffset("+05:30").format("HH:mm"); // Convert to IST time as "hr:min"

    // Format the IST date (e.g., "Mon, 29 Apr 2024")
    const istDate = utcTime
      .clone()
      .utcOffset("+05:30")
      .format("ddd, D MMM YYYY");

    return { istDate, istTime };
  };

  return (
    <div className="seven-days-forecast">
      <h3 className="seven-days-title">7-Day Forecast</h3>

      {data != null && data.cod != "404" ? (
        data.list.map((item, index) => (
          <div key={index} className="seven-day-row divider">
            <p className="day-of-the-week">{days_of_week[index]}</p>
            <div className="seven-day-mid">
              <img
                className="seven-day-icon"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt="sun"
                width={50}
                height={50}
              />
              <span className="seven-day">{item.weather[0].main}</span>
            </div>
            <div style={{ display: "flex" }}>
              <p className="seven-day-maxTemp">
                {Math.round(item.main.temp_max)}
              </p>
              <p className="seven-day-minTemp">
                /{Math.round(item.main.temp_min)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <ErrorComponent />
      )}

      <div className="day-info">
        <div className="day-div">
          <p className="day-text">{istDateTime.istDate}</p>
          <p className="day-text">{istDateTime.istTime}</p>
        </div>

        {quote ? (
          <>
            <blockquote className="qouteText">{`"${quote.quoteText}"`}</blockquote>
            <blockquote className="qouteAuthor">
              <cite>- {quote.quoteAuthor}</cite>
            </blockquote>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FourDaysForecast;
