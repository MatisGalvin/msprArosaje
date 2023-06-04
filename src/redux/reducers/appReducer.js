import { StrapiDatas } from "../../api/api";
import { Roles } from "../../utils/Roles";

const initalState = {
  id: null,
  username: "John",
  email: "",
  address: "",
  zipcode: "",
  city: "",
  lat: "",
  long: "",
  ownPlants: {},
};

// Reducer
const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case "INIT_STATE":
      return {
        ...state,
        id: action.id,
        username: action.username,
        address: action.address,
        city: action.city,
        zipcode: action.zipcode,
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

export default appReducer;
