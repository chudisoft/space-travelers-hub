import React from "react";
import PropTypes from "prop-types";

const Mission = ({ mission, join, leave, mobile }) => {
  Mission.propTypes = {
    mission: PropTypes.object.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    mobile: PropTypes.bool.isRequired,
  };

  return mobile ?
  (
    <div className="mission">
      <h4 className="mission-mission_name"><span>{mission.mission_name}</span></h4>
      <p className="mission-description"><span>{mission.description}</span></p>
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
  ) :
  (
    <tr>
      <td className='mission-name'>{mission.mission_name}</td>
      <td className='mission-description'>{mission.description}</td>
      <td className='mission-status'>
        <span
          className={`${!mission.reserved ? "mission-not-reserved" : "mission-reserved"}`}>
          { 
            !mission.reserved ? "Not a member": "Active member"
          }
        </span>
      </td>
      <td className='mission-button'>
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
      </td>
    </tr>
  );
};

export default Mission;
