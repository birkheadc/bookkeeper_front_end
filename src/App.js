import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Report from './components/report/Report';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
import SummaryPage from './components/summary/SummaryPage';
import { useEffect, useState } from 'react';
import LogoutButton from './components/logoutButton/LogoutButton';

function App() {

  const [isLoggedIn, setLoggedIn] = useState();
  const [width, setWidth] = useState(window.innerWidth);

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

  if (isLoggedIn === true) {
    return (
      <div className="App">
        <BrowserRouter>
          <header>
            <Navbar MOBILE_WIDTH={800} width={width} isLoggedIn={isLoggedIn} logoutButton={<LogoutButton MOBILE_WIDTH={800} width={width} handleLogout={handleLogout}/>}/>
          </header>
          <main>
            <div className='main-wrapper'>
              <Routes>
                <Route path ='/' element={<Home />} />
                <Route path ='/report' element={<Report />} />
                <Route path ='/settings' element={<Settings />} />
                <Route path ='/login' element={<Login handleLogin={handleLogin}/>} />
                <Route path ='/summary' element={<SummaryPage />} />
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
