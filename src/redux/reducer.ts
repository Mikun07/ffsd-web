import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"
import userSlice from "./features/userSlice";
import verifyDocumentSlice from "./features/verifyDocumentSlice";
import documentSlice from "./features/documentSlice";
import institutionSlice from "./features/institutionSlice"
import adminLoginSlice from "./features/Admin/AdminSlice";

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
    verify: verifyDocumentSlice.reducer,
    document: documentSlice.reducer,
    institution: institutionSlice.reducer,
    adminLogin: adminLoginSlice.reducer
})

export default rootReducer;