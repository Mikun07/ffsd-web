import { lazy } from "react"
const OTPPage = lazy(() => import("../pages/authentication/OTPPage"))
const LoginPage = lazy(() => import("../pages/authentication/LoginPage"))
const RegisterPage = lazy(() => import("../pages/authentication/Registration/RegisterPage"))
const ForgotPasswordPage = lazy(() => import("../pages/authentication/ForgotPassword/ForgotPasswordPage"))
const AdminLoginPage = lazy(() => import("../pages/admin/adminAuthentication/AdminLoginPage"))
const AdminSignUpPage = lazy(() => import("../pages/admin/adminAuthentication/AdminSignUpPage"))
import { Navigate } from "react-router-dom";


const LangPageRoute ={
    link: "/",
    element: <Navigate to={'/login'}/>
}

const LoginPageRoute = {
    link: "/login",
    element: <LoginPage />
};

const RegisterPageRoute = {
    link: "/signup",
    element: <RegisterPage />
};

const OTPPageRoute = {
    link: "/signup/otp",
    element: <OTPPage />
};

const ForgotPasswordPageRoute = {
    link: "/forgotpassword",
    element: <ForgotPasswordPage />
}

const AdminLoginPageRoute = {
    link: "/admin/login",
    element: <AdminLoginPage />
}

const AdminSignUpPageRoute = {
    link: "/admin/signup",
    element: <AdminSignUpPage />
}

export const PUBLIC_ROUTES = [
    LangPageRoute,
    LoginPageRoute,
    RegisterPageRoute,
    OTPPageRoute,
    ForgotPasswordPageRoute,
    AdminLoginPageRoute,
    AdminSignUpPageRoute,
]