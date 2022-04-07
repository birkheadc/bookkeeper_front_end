import './App.css';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Report from './components/report/Report';
import Settings from './components/settings/Settings';
import Login from './components/login/Login';
import SummaryPage from './components/summary/SummaryPage';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path ='/' element={<Home />} />
          <Route path ='/report' element={<Report />} />
          <Route path ='/settings' element={<Settings />} />
          <Route path ='/login' element={<Login />} />
          <Route path ='/summary' element={<SummaryPage apiUrl={process.env.REACT_APP_BOOKKEEPER_URL}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
