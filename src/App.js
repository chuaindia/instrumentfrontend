import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchLaptops } from './redux/laptops/laptops';
import './App.css';
import Nav from './modules/Nav';
import Home from './modules/Home';
import Error404 from './modules/Error404';
import Login from './modules/user-sessions/login';
import Signup from './modules/user-sessions/signup';
import AddLaptop from './modules/user-actions/AddLaptop';
import DeleteLaptop from './modules/user-actions/DeleteLaptop';
import SingleLaptop from './modules/SingleLaptop';
import Reserve from './modules/Reserve';
import { userSession } from './redux/user/session-redux';
import Reservations from './modules/Reservations';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLaptops());
    if (localStorage.getItem('user')) {
      const username = localStorage.getItem('user');
      dispatch(userSession({ username }, 'login'));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/add_laptop" element={<AddLaptop />} />
        <Route path="/delete_laptop" element={<DeleteLaptop />} />
        <Route path="/laptop/:id" element={<SingleLaptop />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
