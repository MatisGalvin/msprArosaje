const initialState = {
  address: "",
  zipcode: "",
  city: "",
  lat: "",
  long: "",
  ownPlants: [],
};

// Reducer
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_STATE":
      return {
        ...state,
        address: action.address,
        city: action.city,
        zipcode: action.zipcode
      };
      break;
    case "INIT_OWN_PLANTS":
      return {
        ...state,
        ownPlants: action.plants,
      };
      break;

    default:
      return state;
      break;
  }
};

export const selectOwnPlants = (state) => state.appStore.ownPlants;

export default appReducer;
