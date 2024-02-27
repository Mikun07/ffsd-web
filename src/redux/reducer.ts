import { combineReducers } from "@reduxjs/toolkit";
import signUpSlice from "./features/signupSlice";
import loginSlice from "./features/loginSlice"
import userSlice from "./features/userSlice";
import verifyDocumentSlice from "./features/verifyDocumentSlice";
import documentSlice from "./features/documentSlice";
import institutionSlice from "./features/institutionSlice"
import adminLoginSlice from "./features/Admin/AdminSlice";
import adminDocumentSlice from "./features/Admin/adminGetDocumentSlice";
import adminSignUpSlice from "./features/Admin/adminSignUpSlice";
import adminDocumentIdSlice from "./features/Admin/adminGetDocumentIdSlice";
import GetOrganizationSlice from "./features/Admin/adminGetOrganizationSlice";
import createStaffSlice from "./features/createStaffSlice";
import getStaffSlice from "./features/getStaffSlice";
import serviceChargeSlice from "./features/Admin/serviceChargeSlice";
import updateServiceChargeSlice from "./features/Admin/updateServiceChargeSlice";
import deleteStaffSlice from "./features/deleteStaffSlice";
import createServiceChargeSlice from "./features/Admin/createServiceChargeSlice";
import createAdminSlice from "./features/Admin/createAdminSlice";
import getAllAdminsSlice from "./features/Admin/getAllAdminSlice";
import getAllIndividualsSlice from "./features/Admin/getAllIndividualsSlice";
import createSurChargeSlice from "./features/Admin/createSurChargeSlice";
import surChargeSlice from "./features/Admin/surChargeSlice";
import updateSurChargeSlice from "./features/Admin/updateSurChargeSlice";
import updateAdminSlice from "./features/Admin/updateAdminSlice";
import updateDocumentStatusSlice from "./features/Admin/updateDocumentStatusSlice";
import updateStaffSlice from "./features/updateStaffSlice";

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
    adminDocumentId: adminDocumentIdSlice.reducer,
    getOrganization: GetOrganizationSlice.reducer,
    createStaff: createStaffSlice.reducer,
    createAdmin: createAdminSlice.reducer,
    getStaff: getStaffSlice.reducer,
    getServiceCharge: serviceChargeSlice.reducer,
    removeStaff: deleteStaffSlice.reducer,
    editingServiceCharge: updateServiceChargeSlice.reducer,
    createServiceCharge: createServiceChargeSlice.reducer,
    allAdmin: getAllAdminsSlice.reducer,
    allIndividual: getAllIndividualsSlice.reducer,
    createSurCharge: createSurChargeSlice.reducer,
    getSurCharge: surChargeSlice.reducer,
    editingSurCharge: updateSurChargeSlice.reducer,
    editingAdmin: updateAdminSlice.reducer,
    editingDocumentStatus: updateDocumentStatusSlice.reducer,
    editingStaff: updateStaffSlice.reducer,
})

export default rootReducer;