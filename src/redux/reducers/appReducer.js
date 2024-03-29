const initialState = {
    address: "",
    zipcode: "",
    city: "",
    lat: "",
    long: "",
    ownPlants: [],
    allPlants: [],
    ownDiscussions: [],
};

// Reducer
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INIT_STATE":
            return {
                ...state,
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

        case "INIT_OWN_DISCUSSIONS":
            return {
                ...state,
                ownDiscussions: action.discussions,
            };
            break;

        case "APP_SIGNOUT":
            return {
                ...state,
                address: "",
                zipcode: "",
                city: "",
                lat: "",
                long: "",
                ownPlants: [],
            };
            break;

        default:
            return state;
            break;
    }
};

export const selectOwnPlants = (state) => state.appStore.ownPlants;
export const selectOwnDiscussions = (state) => state.appStore.ownDiscussions;
export const selectAllPlants = (state) => state.appStore.allPlants;

export default appReducer;
