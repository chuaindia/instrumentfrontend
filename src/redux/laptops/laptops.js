import { setRemoveReservationsAction } from '../user/session-redux';

// Actions
const SET_LAPTOPS = 'laptops/laptops/SET_LAPTOPS';
const FULLFILED = 'laptops/laptops/FULLFILED';
const STATUS = 'laptops/laptops/STATUS';
const CLEAR = 'laptops/laptops/CLEAR';
const DELETE_LAPTOP = 'laptops/laptops/DELETE_LAPTOP';
const LINK = 'http://127.0.0.1:3000/api/v1/laptops';

// initial state
const initialState = {
  laptops: [],
  message: '',
};

// Reducer
const laptopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LAPTOPS:
      return { laptops: [...action.payload] };
    case FULLFILED:
      return {
        laptops: [...state.laptops, action.payload.obj],
        message: action.payload.msg,
      };
    case STATUS:
      return {
        laptops: [...state.laptops],
        message: action.payload,
      };
    case CLEAR:
      return {
        laptops: [...state.laptops],
        message: action.payload,
      };
    case DELETE_LAPTOP:
      return {
        laptops: [...state.laptops.filter((item) => item.id !== action.payload)],
      };
    default:
      return state;
  }
};

// Action Creators
const setLaptopsAction = (laptopsList) => ({
  type: SET_LAPTOPS,
  payload: laptopsList,
});

const fullfiled = (obj, msg) => ({
  type: FULLFILED,
  payload: { obj, msg },
});

const status = (msg) => ({
  type: STATUS,
  payload: msg,
});

const clear = () => ({
  type: CLEAR,
  payload: '',
});

const deleteLaptop = (id) => ({
  type: DELETE_LAPTOP,
  payload: id,
});

const fetchLaptops = () => async (dispatch) => {
  await fetch(LINK, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((res) => {
      const laptopsList = res.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        photoUrl: item.photo_url,
        modelYear: item.model_year,
        price: item.price,
        romSize: item.rom_size,
        ramSize: item.ram_size,
      }));
      dispatch(setLaptopsAction(laptopsList));
    });
};

const addLaptop = (obj) => async (dispatch) => fetch(LINK, {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.laptop_obj) {
      const laptopObj = {
        id: data.laptop_obj.id,
        name: data.laptop_obj.name,
        description: data.laptop_obj.description,
        photoUrl: data.laptop_obj.photo_url,
        modelYear: data.laptop_obj.model_year,
        price: data.laptop_obj.price,
        romSize: data.laptop_obj.rom_size,
        ramSize: data.laptop_obj.ram_size,
      };
      dispatch(fullfiled(laptopObj, data.message));
    } else {
      dispatch(status('Laptop already exists'));
    }
  });

const destroyLaptop = (id) => async (dispatch) => fetch(`http://127.0.0.1:3000/api/v1/laptops/${id}`, {
  method: 'DELETE',
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.message === 'Laptop has been destroyed successfully!') {
      dispatch(deleteLaptop(id));
      dispatch(setRemoveReservationsAction(id));
    }
  });

export {
  fetchLaptops, setLaptopsAction,
  fullfiled, addLaptop, destroyLaptop,
  clear, status, deleteLaptop,
};

export default laptopsReducer;
