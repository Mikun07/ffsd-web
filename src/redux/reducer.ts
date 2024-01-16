import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"
import userSlice from "./features/userSlice";

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer
})

export default rootReducer;