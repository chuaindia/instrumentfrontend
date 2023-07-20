import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

const Home = () => {
  const { laptops } = useSelector((state) => state.laptops);
  const isLoggedIn = useSelector((state) => state.users.logged_in);

  return (
    <section className="main-page-section">
      <div className="heading">
        <h1>AWESOME LAPTOPS</h1>
        {laptops.length !== 0 ? <p>Please choose your favourite laptop!</p> : ''}
      </div>

      <div className="divider">
        {[...Array(20)].map(() => (
          <div key={Math.random(100)} className="divider-bullet" />
        ))}
      </div>

      {laptops.length !== 0 ? (
        <Carousel laptops={laptops} />
      ) : (
        <div className="no-items-available">
          <div> There are no laptops currently available</div>
          {isLoggedIn && (
            <Link to="/add_laptop">
              {' '}
              <button type="button">Add a laptop now!</button>
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default Home;
