import React from "react";
import { useSelector } from "react-redux";
import { rockets } from "../../features/rockets/rocketSlice";

const Profile = () => {
  const data = useSelector(rockets);
  const myRockets = data.filter((rocket) => rocket.reserved);
  return (
    <div className="profile__cont">
      <div>
        <h2>My Missions</h2>
      </div>
      <div className="my-rockets">
        <h2>My Rockets</h2>
        <ul>
          {myRockets.map(rocket => (
          <li key={rocket.id}>{rocket.name}</li>
        ))}

        </ul>
      </div>
    </div>
  );
};

export default Profile;

