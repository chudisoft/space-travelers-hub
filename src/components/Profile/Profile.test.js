import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setMissions } from '../../redux/mission/missionsSlice'; // Import your action creators
import Profile from './Profile';
import { setRockets } from '../../redux/rockets/rocketSlice';

const mockStore = configureStore([thunk]);

describe('Test profile component', () => {
  const mockMissionsData = [
    {
      mission_name: "Thaicom",
      mission_id: "9D1B7E0",
      manufacturers: ["Orbital ATK"],
      payload_ids: ["Thaicom 6", "Thaicom 8"],
      wikipedia: "https://en.wikipedia.org/wiki/Thaicom",
      website: "http://www.thaicom.net/en/satellites/overview",
      twitter: "https://twitter.com/thaicomplc",
      description: "Thaicom is the name of a series of communications satellites operated from Thailand, and also the name of Thaicom Public Company Limited, which is the company that owns and operates the Thaicom satellite fleet and other telecommunication businesses in Thailand and throughout the Asia-Pacific region. The satellite projects were named Thaicom by the King of Thailand, His Majesty the King Bhumibol Adulyadej, as a symbol of the linkage between Thailand and modern communications technology.",
      reserved: true
    },
  ];
  const mockRocketsData = [
    {
      name: 'Falcon 1',
      type: 'rocket',
      active: false,
      stages: 2,
      boosters: 0,
      cost_per_launch: 6700000,
      success_rate_pct: 40,
      first_flight: '2006-03-24',
      country: 'Republic of the Marshall Islands',
      company: 'SpaceX',
      wikipedia: 'https://en.wikipedia.org/wiki/Falcon_1',
      description: 'The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.',
      id: '5e9d0d95eda69955f709d1eb',
      reserved: true
    },
  ];

  // Mock store with initial missions state and action creators
  const store = mockStore({
    missions: {
      missions: mockMissionsData,
      error: null,
    },
    rockets: {
      rockets: mockRocketsData,
      error: null,
    },
  });
  // Dispatch setMissions action with mock data
  store.dispatch(setMissions(mockMissionsData));
  store.dispatch(setRockets(mockRocketsData));

  test('renders profile data', async () => {
    const { getAllByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );

    await waitFor(() => {
      const missionTitles = getAllByText(/Thaicom/);
      const rocketTitles = getAllByText(/Falcon 1/);
      expect(missionTitles.length).toBe(1);
      expect(rocketTitles.length).toBe(1);
    });
  });
});
