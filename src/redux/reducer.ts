import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer
})

export default rootReducer;