import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Laptop = (props) => {
  const { obj } = props;

  return (
    <div className="laptop-card">
      <div className="profile-pic-container">
        <img src={obj.photoUrl} alt="Laptop profile portrait" />
      </div>

      <Link to={`/laptop/${obj.id}`}><h2>{`${obj.name}`}</h2></Link>

      <div className="divider">
        {
          [...Array(20)].map(() => <div key={Math.random(100)} className="divider-bullet" />)
        }
      </div>

      <div className="laptop-description">
        {`${obj.description.substring(0, 70)}...`}
      </div>

    </div>
  );
};

Laptop.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    modelYear: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    romSize: PropTypes.number.isRequired,
    ramSize: PropTypes.number.isRequired,
  }).isRequired,
};

export default Laptop;
