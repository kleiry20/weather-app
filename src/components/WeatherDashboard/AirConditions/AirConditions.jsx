import "./AirConditions.css";

const AirConditions = (props) => {
  const { title, value, icon } = props;

  return (
    <>
      <div className="air-component">
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
