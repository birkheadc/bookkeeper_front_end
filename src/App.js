import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import Home from './components/home/Home';
import Report from './components/report/Report';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
import SummaryPage from './components/summary/SummaryPage';
import { useEffect, useState } from 'react';
import LogoutButton from './components/logoutButton/LogoutButton';

function App() {

  const [isLoggedIn, setLoggedIn] = useState();

  useEffect(() => {
    setLoggedIn(true);
  }, [])

  const handleLogout = () => {
    console.log("LOGOUT");
    setLoggedIn(false);
  }
  
  const handleLogin = async () => {
    setLoggedIn(true);
  }

  return (
    <div className="App">
      
      <BrowserRouter>
        <header>
          <Navbar isLoggedIn={isLoggedIn} logoutButton={<LogoutButton handleLogout={handleLogout}/>}/>
        </header>
        <main>
          <Routes>
            <Route path ='/' element={<Home />} />
            <Route path ='/report' element={<Report />} />
            <Route path ='/settings' element={<Settings />} />
            <Route path ='/login' element={<Login handleLogin={handleLogin}/>} />
            <Route path ='/summary' element={<SummaryPage apiUrl={process.env.REACT_APP_BOOKKEEPER_URL}/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
