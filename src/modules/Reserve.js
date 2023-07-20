import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchReservation, setMsgAction } from '../redux/user/session-redux';

const Reserve = () => {
  const { laptops } = useSelector((state) => state.laptops);
  const { creationMsg, user } = useSelector((state) => state.users);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const { chosenLaptopId } = location.state || -1;

  const [hour, setHour] = useState('');
  const [date, setDate] = useState('');
  const [laptopId, setLaptopId] = useState(chosenLaptopId);
  const [city, setCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    }
    if (creationMsg === 'Reservation has been created successfully!') {
      setCreated(true);
      setErrorMessage('');
      setErrorMessage('');
      dispatch(setMsgAction());
      setTimeout(() => {
        navigate('/reservations');
      }, 2500);
    }
    if (creationMsg === 'Reservation couldn\'t be created.') {
      setErrorMessage('Oops! Reservation couldn\'t be created. Can\'t reserve the same laptop on the same day and hour twice.');
      dispatch(setMsgAction());
    }
  }, [creationMsg, created, dispatch, navigate, isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="popup-message">
        <p>Please log in to access this page</p>
      </div>
    );
  }

  const hours = [
    '6am - 9am',
    '7am - 10am',
    '8am - 11am',
    '9am - 12m',
    '10am - 1pm',
    '11am - 2pm',
    '1pm - 4pm',
    '2pm - 5pm',
    '3pm - 8pm',
    '4pm - 9pm',
    '5pm - 6pm',
    '6pm - 7pm',
  ];

  const cities = [
    'Nairobi',
    'Nakuru',
    'Molo',
    'Mombasa',
    'Ghana',
    'Rwanda',
    'Milandi',
    'Cairo',
    'New York',
    'Canada',
    'Madrid',
    'Dubai',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (hour === '' || city === '' || date === '' || laptopId === -1) {
      setErrorMessage('All fields are required');
      return;
    }
    dispatch(fetchReservation({
      city, hour, date, laptop_id: laptopId, user_id: user.id,
    }));
  };

  const getCurrentDate = () => new Date().toJSON().slice(0, 10);

  return (
    <section className="reserve-laptop-page">
      <h1>HIRE A LAPTOP</h1>

      <div className="reserve-page-divider" />
      <p>
        This app gives detailed information about the modern laptops which can be hired.
      </p>

      <form onSubmit={handleSubmit} className="reserve-form">
        <select defaultValue={chosenLaptopId || ''} name="laptop_id" id="laptop-drop-down" onChange={(e) => setLaptopId(e.target.value)}>
          <option value="">Select a laptop</option>
          {laptops.map((laptop) => (
            <option
              key={laptop.id + laptop.name}
              value={laptop.id}
            >
              {`${laptop.name}`}
            </option>
          ))}
        </select>

        <select name="city" id="city-dropdown" onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input type="date" id="date-picker" name="date" min={getCurrentDate()} onChange={(e) => setDate(e.target.value)} />

        <select name="hour" id="hour-dropdown" onChange={(e) => setHour(e.target.value)}>
          <option value="">Select an hour</option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>

        <p className="error-messages">{errorMessage}</p>
        <input type="submit" value="Book Now" />
      </form>

      <div className={`popup-message ${created ? '' : 'hidden'}`}>
        <p>Reservation has been created successfully!</p>
      </div>
    </section>
  );
};

export default Reserve;
