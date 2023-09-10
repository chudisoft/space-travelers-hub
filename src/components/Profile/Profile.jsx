import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Profile.css";
import { getRockets } from "../../redux/rockets/rocketSlice";
import { fetchMissions } from "../../redux/mission/missionsSlice";

const Profile = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const missions = useSelector((state) => state.missions.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Profile"
    dispatch(getRockets());
    dispatch(fetchMissions());
  }, [])
  

  return (
    <div className="profile__cont">
      <div className="profile-col">
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
      <div className="profile-col">
        <h2>My Rockets</h2>
        <div className="profiles">
          {rockets
            .filter((x) => x.reserved === true)
            .map((b) => (
              <div className="profile" key={b.name}>
                {b.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
