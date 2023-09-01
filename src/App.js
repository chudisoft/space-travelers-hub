import { Outlet } from 'react-router-dom';
import { Navbar } from './components';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Outlet />
      {/* <Missions />
      <Profile /> */}
      {/* <div id="root" className="row">
        <Outlet />
      </div> */}
    </div>
  );
}

export default App;
