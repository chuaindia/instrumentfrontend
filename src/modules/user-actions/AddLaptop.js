/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addLaptop, clear } from '../../redux/laptops/laptops';

const AddLaptop = () => {
  const dispatch = useDispatch();

  const [overlay, setOverlay] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const redirection = useNavigate();

  const returnMsg = useSelector((state) => state.laptops);

  const isLoggedIn = JSON.parse(window.localStorage.getItem('logged_in'));

  const postData = (data) => {
    const obj = { ...data };
    dispatch(addLaptop(obj));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        redirection('/user/login');
      }, 2000);
    }
    if (returnMsg) {
      if (returnMsg.message === 'Laptop has been created successfully!') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          redirection('/');
        }, 2500);
      } else if (returnMsg.message === 'Laptop already exists') {
        setOverlay(true);
        setTimeout(() => {
          dispatch(clear());
          setOverlay(false);
        }, 2500);
      }
    }
  }, [returnMsg, dispatch, redirection, isLoggedIn]);

  if (isLoggedIn) {
    return (
      <section className="add-laptop-page">
        <h1>ADD A LAPTOP</h1>
        <div className="add-laptop-page-divider" />

        <form
          action=""
          className="add-laptop-form"
          onSubmit={handleSubmit(postData)}
        >
          <input
            type="input"
            name="name"
            placeholder="Name*"
            {...register('name', {
              required: {
                value: true,
                message: 'Name is a required field',
              },
            })}
          />

          <input
            type="input"
            name="photo_url"
            placeholder="domain.com/something.jpg*"
            {...register('photo_url', {
              required: {
                value: true,
                message: 'Photo url is a required field',
              },
            })}
          />

          <input
            type="number"
            name="model_year"
            placeholder="Model Year*"
            {...register('model_year', {
              required: {
                value: true,
                message: 'model_year is a required field',
              },
            })}
          />

          <input
            type="number"
            name="price"
            placeholder="price $$*"
            onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
            {...register('price', {
              required: {
                value: true,
                message: 'Price is a required field',
              },
            })}
          />

          <input
            type="input"
            name="rom_size"
            placeholder="Rom Size*"
            {...register('rom_size', {
              required: {
                value: true,
                message: 'Rom Size is a required field',
              },
            })}
          />

          <input
            type="input"
            name="ram_size"
            placeholder="Ram Size*"
            {...register('ram_size', {
              required: {
                value: true,
                message: 'Ram Size is a required field',
              },
            })}
          />

          <textarea
            type="text"
            name="description"
            placeholder="Please introduce yourself*"
            {...register('description', {
              required: {
                value: true,
                message: 'Description is a required field',
              },
            })}
          />

          <ul className="error-messages">
            {errors.name && (
              <li className="errorMsg">{errors.name.message}</li>
            )}

            {errors.photo_url && (
              <li className="errorMsg">{errors.photo_url.message}</li>
            )}

            {errors.model_year && (
            <li className="errorMsg">{errors.model_year.message}</li>
            )}

            {errors.price && (
              <li className="errorMsg">{errors.price.message}</li>
            )}

            {errors.rom_size && (
              <li className="errorMsg">{errors.rom_size.message}</li>
            )}

            {errors.ram_size && (
              <li className="errorMsg">{errors.ram_size.message}</li>
            )}

            {errors.description && (
              <li className="errorMsg">{errors.description.message}</li>
            )}
          </ul>

          <button type="submit" name="additem" className="session-btn">
            Add laptop
          </button>
        </form>

        <div className={`popup-message ${overlay ? '' : 'hidden'}`}>
          <p>{returnMsg.message}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="popup-message">
      <p>Please login to view this page</p>
    </div>
  );
};

export default AddLaptop;
