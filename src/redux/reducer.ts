import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"
import userSlice from "./features/userSlice";
import verifyDocumentSlice from "./features/verifyDocumentSlice";
import documentSlice from "./features/documentSlice";
import institutionSlice from "./features/institutionSlice"
import adminLoginSlice from "./features/Admin/AdminSlice";
import adminDocumentSlice from "./features/Admin/adminGetDocument";
import adminSignUpSlice from "./features/Admin/adminSignUpSlice";

const rootReducer = combineReducers({
    signUp: signUpSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
    verify: verifyDocumentSlice.reducer,
    document: documentSlice.reducer,
    institution: institutionSlice.reducer,
    adminLogin: adminLoginSlice.reducer,
    adminSignUp: adminSignUpSlice.reducer,
    adminDocument: adminDocumentSlice.reducer,
})

export default rootReducer;