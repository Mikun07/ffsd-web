import { FC } from "react";
import "./Progress.css";
import CheckIcon from "../../assets/icons/CheckIcon";

interface ProgressBarProps {
  progressSteps:
    | string[]
    | { title: string; info: string; buttonText: string }[];
  showStepTitle?: boolean;
  currentStepIndex: number;
  isFirstStep?: boolean;
  goTo: (index: number) => void;
  vertical: boolean;
  isDisabled?: boolean;
}
const ProgressBar: FC<ProgressBarProps> = ({
  progressSteps,
  showStepTitle = true,
  currentStepIndex,
  isFirstStep,
  goTo,
  vertical,
  isDisabled,
}) => {
  return (
    <div className={vertical ? "vertical-bar" : "horizontal-bar"}>
      {progressSteps.map((step, index) => (
        <div
          className={currentStepIndex >= index ? "step active" : "step"}
          key={index}
        >
          {showStepTitle && !!!vertical && (
            <div className="title">
              <h4 className={currentStepIndex >= index ? "current" : ""}>
                {typeof step === "object" ? step.title : step}
              </h4>
              {step.info && (
                <p
                  className={`heading ${
                    currentStepIndex >= index ? "current" : ""
                  }`}
                >
                  {step.info}
                </p>
              )}
            </div>
          )}
          <div className="bar">
            <hr className={currentStepIndex >= index ? "done" : "not-done"} />
            <button
              onClick={() => goTo(index)}
              disabled={currentStepIndex <= index}
            >
              {currentStepIndex > index ? (
                <span className="icon"><CheckIcon /></span>
              ) : (
                index + 1
              )}
            </button>
            <hr className={currentStepIndex > index ? "done" : "not-done"} />
          </div>
          {showStepTitle && vertical && (
            <div className={step.info ? "title-info" : "title"}>
              <h3 className={currentStepIndex >= index ? "current" : ""}>
                {typeof step === "object" ? step.title : step}
              </h3>
              {step.info && (
                <p
                  className={`heading ${
                    currentStepIndex >= index ? "current" : ""
                  }`}
                >
                  {step.info}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
