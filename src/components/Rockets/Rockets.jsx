import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  rockets,
  reserveRocket,
  cancelRocket,
  getRockets,
} from "../../redux/rockets/rocketSlice";

const Rockets = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.rockets.rockets);

  const handleClick = (isReserved, rocketId, rocketName) => {
    if (!isReserved) {
      dispatch(reserveRocket(rocketId));
    } else {
      dispatch(cancelRocket(rocketId));
    }
  };
  useEffect(() => {
    document.title = "Rockets"
    dispatch(getRockets());
  }, []);

  return (
    <div className="rockets__cont">
      {data.map((rocket) => (
        <div key={rocket.id} className="rocket__card">
          <div className="rocket__card-img">
            <img
              style={{ width: "300px" }}
              src={rocket.flickr_images}
              alt="rocket"
            />
          </div>
          <div className="rocket__card-desc">
            <h2>{rocket.name}</h2>
            <div>
              {rocket.reserved && <div className="reserved">Reserved</div>}
              <p>{rocket.description}</p>
            </div>
            <button
              onClick={() => handleClick(rocket.reserved, rocket.id, rocket.name)}
              style={
                rocket.reserved
                  ? {
                      background: "#fff",
                      color: "#000",
                      border: "1px solid #ccc",
                    }
                  : { backgroundColor: "#0290ff", color: "#fff" }
              }
              type="button">
              {rocket.reserved ? "Cancel reservation" : "Reserve Rocket"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rockets;
