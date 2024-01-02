import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer
})

export default rootReducer;