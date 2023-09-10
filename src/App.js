import { Outlet } from 'react-router-dom';
import { Navbar } from './components';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="top-bg" />
      <div className="container body">
        <Outlet />
      </div>
      <div className="footer-bg" />
      <footer>
        <p>
          Copyright &copy; 2023&nbsp;
          <a href="https://github.com/chudisoft">Chudisoft</a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
