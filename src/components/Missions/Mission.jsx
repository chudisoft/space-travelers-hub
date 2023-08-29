import React from "react";
import PropTypes from "prop-types";

const Mission = ({ mission, join, leave }) => {
  Mission.propTypes = {
    mission: PropTypes.array.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
  };

  return (
    <div className="mission">
      <h4 className="mission-mission_name">{mission.mission_name}</h4>
      <p className="mission-description">{mission.description}</p>
      <p className="mission-status">
        <span
          className={`${!mission.reserved ? "mission-not-reserved" : "mission-reserved"}`}>
          { 
            !mission.reserved ? "Not a member": "Active member"
          }
        </span>
      </p>
      <div className="action-buttons">
        {
          mission.reserved ?
            <button
              className="leave"
              type="button"
              onClick={() => leave(mission)}
            >
              Leave Mission
            </button>
            :
            <button
              className="join"
              type="button"
              onClick={() => join(mission)}
            >
              Join Mission
            </button>
        }
      </div>
    </div>
  );
};

export default Mission;
