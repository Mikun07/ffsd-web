import { useNavigate } from "react-router-dom";
import OrganizationForm from "./OrganisationSignUp/OrganizationSignUp";
import IndividualForm from "./IndividualSignUp/IndividualForm";
import MultiTabs from "../../../components/multiTabs/MultiTabs";
import { useMultiStepForm } from "../../../hooks/useMultiTabForm";
import Logo from "../../../assets/Logo";
import LeftView from "../LeftView";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";

function RegisterPage() {
  const navigate = useNavigate();
  const registerSteps = [<IndividualForm />, <OrganizationForm />];
  const loadingPage = useSelector(
    (state: RootState) => state?.signUp?.loading
  );

  const tabTitles = ["Individual", "Organization"];

  const { step, currentStepIndex, goTo } = useMultiStepForm(
    registerSteps,
    tabTitles
  );
  return (
    <>
      {loadingPage ? (
        <Loading />
      ) : (
        <>
          <div className="bg-white flex h-screen justify-between mx-5">
            <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
              <Logo />
            </div>

            <LeftView />

            <div className="lg:w-[50%] px-2 w-full h-screen flex flex-col items-center justify-center">
              <h4 className="text-[#40B52D] font-bold self-center">
                Create Account
              </h4>

              <MultiTabs
                tabs={tabTitles}
                currentStep={currentStepIndex}
                goTo={goTo}
              />

              <div>{step}</div>

              <p className="text-[15px] font-semibold capitalize self-center">
                I already have an account{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default RegisterPage;
