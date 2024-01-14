import LoginPage from "../pages/authentication/LoginPage";
import RegisterPage from "../pages/authentication/Registration/RegisterPage";
import ForgotPasswordPage from "../pages/authentication/ForgotPassword/ForgotPasswordPage";
import OTPPage from "../pages/authentication/OTPPage";
import Landing from "../pages/Landing";
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

export const PUBLIC_ROUTES = [
    LangPageRoute,
    LoginPageRoute,
    RegisterPageRoute,
    OTPPageRoute,
    ForgotPasswordPageRoute,
]