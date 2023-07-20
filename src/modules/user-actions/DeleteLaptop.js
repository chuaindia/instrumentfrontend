import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { destroyLaptop } from '../../redux/laptops/laptops';

const DeleteItem = () => {
  const dispatch = useDispatch();

  const redirection = useNavigate();

  const availableLaptops = useSelector((store) => store.laptops.laptops);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
  });

  const removeData = (e) => {
    const id = Number(e.target.value);
    dispatch(destroyLaptop(id));
  };

  if (isLoggedIn) {
    return (
      <section className="delete-laptop-page">
        <h1>Delete a laptop</h1>

        {availableLaptops.length !== 0 ? (
          <ul className="available-laptops-list">
            {availableLaptops.map((item) => (
              <li className="available-laptop" key={item.id}>
                <span>
                  {item.name}
                </span>
                <button
                  type="button"
                  name="delete"
                  className="delete-btn"
                  value={item.id}
                  onClick={removeData}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-available">
            <div>There are no laptops available.</div>
            <button type="button"><Link to="/"> Go back to the home page</Link></button>
          </div>
        )}
      </section>
    );
  }
  return (
    <div className="popup-message">
      <p>Please log in to access this page</p>
    </div>
  );
};

export default DeleteItem;
