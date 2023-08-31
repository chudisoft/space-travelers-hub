import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
import Mission from './Mission';
import { fetchMissions, joinMission, leaveMission } from '../../redux/mission/missionsSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Mission.css';

function Missions() {  
  const dispatch = useDispatch();
  const error = useSelector((state) => state.missions.error);
  const missionsAvailable = useSelector((state) => state.missions.missions);

  useEffect(() => {
    dispatch(fetchMissions());
  }, []);

  const join = ( mission ) => { dispatch(joinMission(mission)); }
  const leave = ( mission ) => { dispatch(leaveMission(mission)); }

  return (
    <div className='w-100 p-4'>
      <div>{error}</div>
      <div className='missions'>
        {
          missionsAvailable.map((b) => 
            <Mission 
              mission={b}
              join={join}
              leave={leave}
              key={b.mission_id}
            />
          )
        }
      </div>
    </div>
  )
}

Missions.propTypes = {}

export default Missions
