import FormTextInput from "../../../../../components/input/Form/FormTextInput";
import PasswordInput from "../../../../../components/input/PasswordInput";
import SelectInput from "../../../../../components/input/SelectInput";
import TextInput from "../../../../../components/input/TextInput";

const AccountInfo = ({
  setValue,
  firstname,
  lastname,
  password,
  email,
  errors,
  isValid,
  register,
  phone,
  confirmPassword,
  countryOptions,
  country,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <FormTextInput
          label="firstname"
          {...register("firstname", {
            required: true,
          })}
          onChange={(e) => setValue("firstname", e.target.value)}
        />
        <FormTextInput
          label="lastname"
          {...register("lastname", {
            required: true,
          })}
          onChange={(e) => setValue("lastname", e.target.value)}
        />
        <FormTextInput
          label="email"
          {...register("email", {
            required: true,
          })}
          onChange={(e) => setValue("email", e.target.value)}
        />

        <TextInput
          type="text"
          label="phoneNumber"
          value={phone}
          onChange={(e) => setValue("phone", e.target.value)}
        />

        <PasswordInput
          label="password"
          value={password}
          onChange={(e) => setValue("password", e.target.value)}
        />

        <PasswordInput
          label="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setValue("confirmPassword", e.target.value)}
        />
        <SelectInput
          label="country"
          options={countryOptions}
          handleChange={setCountry}
          value={country}
        />
      </div>
    </>
  );
};

export default AccountInfo;
