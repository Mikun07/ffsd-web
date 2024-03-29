import FormPasswordInput from "../../../../../components/input/Form/FormPasswordInput";
import FormTextInput from "../../../../../components/input/Form/FormTextInput";

const AccountInfo = ({ setValue, errors, register }) => {
  return (
    <>
      <div className=" grid grid-cols-2 gap-4">
        <FormTextInput
          label="firstname"
          errors={errors}
          {...register("firstname", {
            required: {
              value: true,
              message: "firstname is required",
            },
          })}
          onChange={(e) => setValue("firstname", e.target.value)}
        />
        <FormTextInput
          label="lastname"
          errors={errors}
          {...register("lastname", {
            required: {
              value: true,
              message: "lastname is required",
            },
          })}
          onChange={(e) => setValue("lastname", e.target.value)}
        />

        <FormTextInput
          label="phone"
          errors={errors}
          {...register("phone", {
            required: {
              value: true,
              message: "Phone Number is required",
            },
          })}
          onChange={(e) => setValue("phone", e.target.value)}
        />

        <FormPasswordInput
          label="password"
          errors={errors}
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          onChange={(e) => setValue("password", e.target.value)}
        />
        <FormPasswordInput
          label="confirmPassword"
          title="confirm password"
          errors={errors}
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          onChange={(e) => setValue("confirmPassword", e.target.value)}
        />
      </div>
    </>
  );
};

export default AccountInfo;
