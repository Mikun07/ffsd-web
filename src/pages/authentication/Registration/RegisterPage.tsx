import { useNavigate } from "react-router-dom";
import OrganizationForm from "./OrganisationSignUp/OrganizationForm";
import IndividualForm from "./IndividualForm";
import MultiTabs from "../../../components/multiTabs/MultiTabs";
import { useMultiStepForm } from "../../../hooks/useMultiTabForm";
import Logo from "../../../assets/Logo";
import SignUpIMG from "../../../assets/SignUpIMG";

function RegisterPage() {
  const navigate = useNavigate();
  const registerSteps = [<IndividualForm />, <OrganizationForm />];

  const tabTitles = ["Individual", "Organization"];

  const { step, currentStepIndex, goTo } = useMultiStepForm(
    registerSteps,
    tabTitles
  );
  return (
    <>
      <div className="bg-white flex h-screen">
        <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
          <Logo />
        </div>

        <div className="lg:flex w-[40%] ml-12 hidden items-center justify-center">
          <SignUpIMG width="400" />
        </div>

        <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center">
          <h4 className="lg:mt-4 text-[#40B52D] font-bold self-center">
            Create Account
          </h4>

          <MultiTabs
            tabs={tabTitles}
            currentStep={currentStepIndex}
            goTo={goTo}
          />

          <div className="">{step}</div>

          <p className="text-xs font-semibold py-4 capitalize self-center">
            I already have an account{" "}
            <span
              onClick={() => navigate("/")}
              className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
