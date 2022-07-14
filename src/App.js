import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Report from './components/report/Report';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
import { useEffect, useState } from 'react';
import LogoutButton from './components/logoutButton/LogoutButton';
import Upload from './components/upload/Upload';
import Home from './components/home/Home';

import * as Constants from './constants/Constants.js'
import BrowsePage from './components/browse/browsePage/BrowsePage';
import { Api } from './api';
import { UserSettings } from './helpers/settings';

function App() {

  const [isLoggedIn, setLoggedIn] = useState();
  const [width, setWidth] = useState(window.innerWidth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoggedIn();
  }, [])

  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
})

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem('password');
    setLoggedIn(false);
    return false;
  }
  
  const handleLogin = async (pw) => {
    window.localStorage.setItem('password', pw);
    setLoggedIn(true);
  }

  const checkLoggedIn = () => {
    if (window.localStorage.getItem('password') === null || window.localStorage.getItem('password') === "") {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
  }

  useEffect(() => {
    async function fetchAndStoreUserSettings() {
      let settings;
      try {
        settings = await Api.fetchSettings();
      }
      catch {
        settings = {};
      }
      UserSettings.storeUserSettings(settings);
      setLoading(false);
    }
    setLoading(true);
    fetchAndStoreUserSettings();
  }, [isLoggedIn]);

  if (isLoggedIn === true) {
    if (loading === true) {
      return (
        <h1>Loading...</h1>
      );
    }
    return (
      <div className="App">
        <BrowserRouter>
          <header>
            <Navbar MOBILE_WIDTH={Constants.MOBILE_WIDTH} width={width} isLoggedIn={isLoggedIn} logoutButton={<LogoutButton MOBILE_WIDTH={Constants.MOBILE_WIDTH} width={width} handleLogout={handleLogout}/>}/>
          </header>
          <main>
            <div className='main-wrapper'>
              <Routes>
                <Route path = '/' element={<Home />} />
                <Route path ='/report' element={<Report width={width}/>} />
                <Route path ='/settings' element={<Settings handleLogin={handleLogin} width={width} />} />
                <Route path ='/login' element={<Login handleLogin={handleLogin}/>} />
                <Route path ='/browse' element={<BrowsePage width={width}/>} />
                <Route path ='upload' element={<Upload />} />
              </Routes>
            </div>
          </main>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div className="App">
        <BrowserRouter>
          <header>
            <Navbar MOBILE_WIDTH={1000} width={width} isLoggedIn={isLoggedIn} logoutButton={<LogoutButton handleLogout={handleLogout}/>}/>
          </header>
          <main>
            <div className='main-wrapper'>
              <Login handleLogin={handleLogin}/>
            </div>
          </main>
        </BrowserRouter>
      </div>
  );

  
}

export default App;
