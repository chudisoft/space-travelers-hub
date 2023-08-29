import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';

function Profile() {  
  const dispatch = useDispatch();
  const error = useSelector((state) => state.missions.error);
  const missionsAvailable = useSelector((state) => state.missions.missions);
  // get rockets data from the store
  const rockets = useSelector(state => state.rockets);

  return (
    <div className='w-100 p-4'>
      <div className='missions'>
        {
          missionsAvailable.filter((x) => x.reserved === true).map((b) => 
            <div className='mission'>{b.mission_name}</div>
          )
        }
      </div>
      {/* <div className='missions'>
        {
          missionsAvailable.map((b) => 
            <div className='mission'>{b.mission_name}</div>
          )
        }
      </div> */}
    </div>
  )
}

Profile.propTypes = {}

export default Profile
