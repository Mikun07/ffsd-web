import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"
import userSlice from "./features/userSlice";
import verifyDocumentSlice from "./features/verifyDocumentSlice";
import documentSlice from "./features/documentSlice";
import institutionSlice from "./features/institutionSlice"

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
    verify: verifyDocumentSlice.reducer,
    document: documentSlice,
    institution: institutionSlice
})

export default rootReducer;