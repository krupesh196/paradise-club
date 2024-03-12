import './App.css';
import Navbar from "./components/Navbar.js"
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen.js';
import Registerscreen from './screens/Registerscreen.js';
import Loginscreen from './screens/Loginscreen.js';
import Profilescreen from './screens/Profilescreen.js';
import Adminscreen from './screens/Adminscreen.js';
import Landingscreen from './screens/Landingscreen.js';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>

          <Route path="/home" exact Component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" exact Component={Bookingscreen} />
          <Route path='/register' exact Component={Registerscreen} />
          <Route path='/login' exact Component={Loginscreen} />
          <Route path='/profile' exact Component={Profilescreen} />
          <Route path='/admin' exact Component={Adminscreen} />
          <Route path='/' exact Component={Landingscreen} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
