
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const logo = process.env.PUBLIC_URL + '/octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';


function getSystemMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function App() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('octofit-mode');
    return saved || 'auto';
  });

  useEffect(() => {
    let appliedMode = mode;
    if (mode === 'auto') {
      appliedMode = getSystemMode();
    }
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${appliedMode}-mode`);
    localStorage.setItem('octofit-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  };

  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4 rounded">
          <div className="container-fluid d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img src={logo} alt="Octofit Logo" className="App-logo" />
              <Link className="navbar-brand fw-bold" to="/">Octofit Tracker</Link>
            </div>
            <button className="btn btn-outline-light ms-auto" onClick={toggleMode} style={{minWidth:120}}>
              {mode === 'auto' ? 'Auto' : mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </button>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div className="card text-center">
              <div className="card-body">
                <h2 className="card-title">Welcome to Octofit Tracker!</h2>
                <p className="card-text">Select a section from the navigation menu.</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
