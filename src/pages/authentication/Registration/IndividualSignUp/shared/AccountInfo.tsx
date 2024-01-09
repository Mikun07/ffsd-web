import PasswordInput from "../../../../../components/input/PasswordInput";
import SelectInput from "../../../../../components/input/SelectInput";
import TextInput from "../../../../../components/input/TextInput";

const AccountInfo = ({
  setValue,
  firstname,
  lastname,
  password,
  email,
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
        <TextInput
          type="text"
          label="firstname"
          value={firstname}
          onChange={(e) => setValue("firstname", e.target.value)}
        />
        <TextInput
          type="text"
          label="lastname"
          value={lastname}
          onChange={(e) => setValue("lastname", e.target.value)}
        />
        <TextInput
          type="text"
          label="Email"
          value={email}
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
