import FormPasswordInput from "../../components/input/Form/FormPasswordInput";
import FormTextInput from "../../components/input/Form/FormTextInput";


const AccountInfo = ({
  setValue,
  errors,
  register,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormTextInput
          title="Firstname"
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
          label="email"
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
          {...register("password", { required: true })}
          onChange={(e) => setValue("password", e.target.value)}
        />
        <FormPasswordInput
          label="confirmPassword"
          title="confirm password"
          errors={errors}
          {...register("confirmPassword", { required: true })}
          onChange={(e) => setValue("confirmPassword", e.target.value)}
        />
      </div>
    </>
  );
};

export default AccountInfo;
