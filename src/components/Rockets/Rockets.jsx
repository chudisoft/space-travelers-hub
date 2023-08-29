import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  rockets,
  reserveRocket,
  cancelRocket,
} from "../../features/rockets/rocketSlice";

const Rockets = () => {
  const dispatch = useDispatch();
  const data = useSelector(rockets);

  const getLocalStorageReservations = () => {
    const localStorageReservations =
      JSON.parse(localStorage.getItem("rocketReservations")) || {};
    return localStorageReservations;
  };

  const setLocalStorageReservations = (reservations) => {
    localStorage.setItem("rocketReservations", JSON.stringify(reservations));
  };

  const handleClick = (isReserved, rocketId, rocketName) => {
    const localStorageReservations = getLocalStorageReservations();

    if (!isReserved) {
      dispatch(reserveRocket(rocketId));
      localStorageReservations[rocketId] = true;
    } else {
      dispatch(cancelRocket(rocketId));
      localStorageReservations[rocketId] = false;
    }

    setLocalStorageReservations(localStorageReservations);
  };

  useEffect(() => {
    const localStorageReservations = getLocalStorageReservations();
    data.forEach((rocket) => {
      if (localStorageReservations[rocket.id]) {
        dispatch(reserveRocket(rocket.id));
      }
    });
  }, [data, dispatch]);

  return (
    <div className="rockets__cont">
      {data.map((rocket) => (
        <div key={rocket.id} className="rocket__card">
          <div className="rocket__card-img">
            <img
              style={{ width: "300px" }}
              src={rocket.flickr_images[0]}
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
