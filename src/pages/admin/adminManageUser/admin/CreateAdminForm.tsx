import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import FormTextInput from "../../../../components/input/Form/FormTextInput";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AdminStatus } from "../../../../data/data";
import { useForm } from "react-hook-form";
import SelectInput from "../../../../components/input/SelectInput";
import Button from "../../../../components/button/Button";
import toast from "react-hot-toast";
import { postCreateAdmin } from "../../../../redux/features/Admin/createAdminSlice";
import { RootState } from "../../../../types/redux/root";
import Loading from "../../../../components/withStatus/loading/Loading";

const CreateAdminForm = ({ onClose }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.createAdmin
  );

  const [showSection, setShowSection] = useState(true);

  const AdminStatusOptions = AdminStatus?.map((status) => ({
    label: status?.type,
    value: status?.id,
  }));

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    control,
  } = useForm({ mode: "all" });

  function handleCreateAdmin(createAdmin) {
    const createAdminData = {
      firstName: createAdmin?.firstName,
      lastName: createAdmin?.lastName,
      email: createAdmin?.email,
      phone: createAdmin?.phone,
      admin_type: createAdmin?.adminType?.value.toString(),
    };
    // @ts-ignore
    dispatch(postCreateAdmin({ ...createAdminData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload[0]?.success);
      if (success === true) {
        toast.success(payload[0]?.message || "Admin as been created");
      } else {
        toast.error(payload || "Failed, please try again");
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
            onSubmit={handleSubmit(handleCreateAdmin)}
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
                label="firstName"
                title="First Name"
                errors={errors}
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First Name is required",
                  },
                })}
                onChange={(e) => setValue("firstName", e.target.value)}
              />

              <FormTextInput
                label="lastName"
                title="Last Name"
                errors={errors}
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last Name is required",
                  },
                })}
                onChange={(e) => setValue("lastName", e.target.value)}
              />

              <FormTextInput
                label="email"
                title="Email"
                errors={errors}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
                onChange={(e) => setValue("email", e.target.value)}
              />

              <FormTextInput
                label="phone"
                title="Phone Number"
                errors={errors}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone number is required",
                  },
                })}
                onChange={(e) => setValue("phone", e.target.value)}
              />

              <SelectInput
                label="adminType"
                options={AdminStatusOptions}
                control={control}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid}>
                Create Admin
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateAdminForm;
