import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';

function Profile() {  
  const dispatch = useDispatch();
  const error = useSelector((state) => state.missions.error);
  const missions = useSelector((state) => state.missions.missions);
  // get rockets data from the store
  // const rockets = useSelector(state => state.rockets);

  return (
    <div className='w-100 p-4'>
      <div className='profile-row'>
        <div className='profile-col'>
          <h3>My Missions</h3>
          <div className='profiles'>
            {
              missions.filter((x) => x.reserved === true).map((b) => 
                <div className='profile'>{b.mission_name}</div>
              )
            }
          </div>
        </div>
        <div className='profile-col'>
          <h3>My Rockets</h3>
          <div className='profiles'>
            {/* {
              rockets.filter((x) => x.reserved === true).map((b) => 
                <div className='profile'>{b.rocket_name}</div>
              )
            } */}
          </div>
        </div>
      </div>
    </div>
  )
}

Profile.propTypes = {}

export default Profile
