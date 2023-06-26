import { createStore, combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    appStore: appReducer,
    authStore: authReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;