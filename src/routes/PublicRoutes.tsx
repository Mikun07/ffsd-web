import LoginPage from "../pages/authentication/LoginPage";
import RegisterPage from "../pages/authentication/Registration/RegisterPage";
import ForgotPasswordPage from "../pages/authentication/ForgotPassword/ForgotPasswordPage";
import OTPPage from "../pages/authentication/OTPPage";


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
    LoginPageRoute,
    RegisterPageRoute,
    OTPPageRoute,
    ForgotPasswordPageRoute,
]