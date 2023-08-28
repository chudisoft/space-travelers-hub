import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="root" className="row">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
