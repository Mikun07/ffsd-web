import { ThunkDispatch } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../types/redux/root";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../../../../../components/withStatus/loading/Loading";
import FormTextInput from "../../../../../components/input/Form/FormTextInput";
import Button from "../../../../../components/button/Button";
import { FaTimes } from "react-icons/fa";
import { postCreateStaff } from "../../../../../redux/features/createStaffSlice";

const CreateStaffForm = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.createStaff
  );

  const [showSection, setShowSection] = useState(true); // State to control the visibility of the section

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    control,
  } = useForm({ mode: "all" });

  function createStaff(createStaffValues) {
    const createStaffData = {
      firstName: createStaffValues?.firstname,
      lastName: createStaffValues?.lastname,
      email: createStaffValues?.email,
    };

    // @ts-ignore
    dispatch(postCreateStaff({ ...createStaffData })).then((result) => {
      const { payload } = result;
      console.log(payload);

      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "New Staff Created");
      } else {
        toast.error(payload?.errors || "Email already exist");
      }
    });
  }

  // Function to toggle the visibility of the section
  const toggleSection = () => {
    setShowSection(!showSection);
  };

  return (
    <>
      {LoadingPage ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(createStaff)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-6">
              {showSection && ( // Conditional rendering based on showSection state
                <div className="w-full relative flex flex-col gap-1 p-3 bg-primary bg-opacity-35 rounded-lg text-black font-medium ">
                  <button
                    className="absolute top-2 right-2"
                    onClick={toggleSection}
                  >
                    <FaTimes size={25} /> {/* Close icon */}
                  </button>
                  <p className="text-justify pt-5">
                    Upon submission, the users temporary password is:{" "}
                    <span className="font-bold oldstyle-nums">1234567</span>.
                    Please ensure the accuracy of your email to receive the
                    password promptly. Once logged in, your staff will be
                    prompted to change their password for security purposes.
                    <ul className="text-justify list-disc list-inside">
                      <li>
                        Admin status one as the same status as a system admin
                      </li>
                      <li>Admin status two as limited access</li>
                    </ul>
                  </p>
                </div>
              )}
              <FormTextInput
                label="firstname"
                errors={errors}
                {...register("firstname", {
                  required: {
                    value: true,
                    message: "Firstname is required",
                  },
                })}
                onChange={(e) => setValue("firstname", e.target.value)}
                disabled={LoadingPage}
              />

              <FormTextInput
                label="lastname"
                errors={errors}
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "Lastname is required",
                  },
                })}
                onChange={(e) => setValue("lastname", e.target.value)}
                disabled={LoadingPage}
              />

              <FormTextInput
                label="email"
                errors={errors}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                onChange={(e) => setValue("email", e.target.value)}
                disabled={LoadingPage}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid || LoadingPage}>
                Create Staff
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateStaffForm;
