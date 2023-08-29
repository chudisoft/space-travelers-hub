import { Outlet } from 'react-router-dom';
import './App.css';
import Missions from './components/Missions/Missions';

function App() {
  return (
    <div className="App">
      <div id="root" className="row">
        <Outlet />
        <Missions />
      </div>
    </div>
  );
}

export default App;
