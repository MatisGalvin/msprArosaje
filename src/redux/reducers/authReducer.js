const initialState = {
    isLoggedIn: false,
    id: null,
    email: null,
    username: null,
    profile_picture: null,
    jwt: null
};

// Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "setSignIn":
            return {
                ...state,
                id: action.id,
                email: action.email,
                username: action.username,
                profile_picture: action.profile_picture,
                isLoggedIn: action.isLoggedIn,
                jwt: action.jwt
            };
            break;
        case "setSignOut":
            return {
                ...state,
                id: null,
                email: null,
                username: null,
                profile_picture: null,
                isLoggedIn: null,
                jwt: null
            };
            break;

        default:
            return state;
            break;
    }
};

export const selectIsLoggedIn = (state) => state.authStore.isLoggedIn;
export const selectID = (state) => state.authStore.id;
export const selectEmail = (state) => state.authStore.email;
export const selectUsername = (state) => state.authStore.username;
export const selectProfilePicture = (state) => state.authStore.profile_picture;
export const selectJWT = (state) => state.authStore.jwt;
export const selectUser = (state) => state.authStore;

export default authReducer;