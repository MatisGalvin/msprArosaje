import { Roles } from "../../utils/Roles";

const initalState = {
  firstname: "John",
  lastname: "Doe",
  email: "johndoe@gmail.com",
  phoneNumber: "0607080910",
  roles: [Roles.Proprietaire],
  picture: "",
  listePlantes: [],
};

// Reducer
const appReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        firstname: action.name
      }
      break;
  
    default:
      return state
      break;
  }
};

export default appReducer;
