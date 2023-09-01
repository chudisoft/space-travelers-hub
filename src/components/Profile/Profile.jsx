import React from "react";
import { useSelector } from "react-redux";
import { rockets } from "../../features/rockets/rocketSlice";
import "./Profile.css";

const Profile = () => {
  const data = useSelector(rockets);
  const missions = useSelector((state) => state.missions.missions);

  return (
    <div className="profile__cont">
      <div>
        <h2>My Missions</h2>
        <div className="profiles">
          {missions
            .filter((x) => x.reserved === true)
            .map((b) => (
              <div className="profile" key={b.mission_name}>
                {b.mission_name}
              </div>
            ))}
        </div>
      </div>
      <div className="my-rockets">
        <h2>My Rockets</h2>
        <ul>
          {data
            .filter((rocket) => rocket.reserved)
            .map((rocket) => (
              <li key={rocket.id}>{rocket.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
