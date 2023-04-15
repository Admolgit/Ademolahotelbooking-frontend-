// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes as RouterCover,
  Route,
  // Switch,
} from 'react-router-dom';
import Home from "../pages/Home/Home";
import Hotel from "../pages/Hotel/Hotel";
import List from "../pages/Lists/MailList";
import Login from "../pages/Login/Login";
import Register from '../pages/Register/Register';

function Routes() {
  return (
    <Router>
      <RouterCover>
        <Route path='/' element={<Home />} />
        <Route path='/hotels/:id' element={<Hotel />} />
        <Route path='/hotels' element={<List />} />
        <Route path='/auth/login' element={<Login />} />
        <Route path='/auth/register' element={<Register />} />
      </RouterCover>
    </Router>
  );
}

export default Routes;