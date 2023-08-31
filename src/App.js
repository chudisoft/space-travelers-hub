import { Outlet } from 'react-router-dom';
import './App.css';
import Missions from './components/Missions/Missions';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <div id="root" className="row">
        <Outlet />
        <Missions />
        <Profile />
      </div>
    </div>
  );
}

export default App;
