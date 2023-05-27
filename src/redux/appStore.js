import { createStore, combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    appStore: appReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;