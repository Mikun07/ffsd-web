import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../config/api";
import { postSignUp } from "../../../redux/features/signupSlice";
import { useDispatch } from "react-redux";
import TextInput from "../../../components/input/TextInput";
import PasswordInput from "../../../components/input/PasswordInput";
import SelectInput from "../../../components/input/SelectInput";
import Button from "../../../components/button/Button";
import { useForm } from "react-hook-form";

function IndividualForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countryData, setCountryData] = useState(null);

  const countryOptions =
    countryData?.map((country) => ({
      label: country?.name,
      value: country?.id,
    })) || [];

  useEffect(() => {
    axios
      .post(`${BASE_URL}/countries`)
      .then((response) => {
        const data = response.data?.data;
        setCountryData(data);
      })
      .catch((error) => {
        error("Error fetching data:", error);
      });
  }, []);

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  const firstname = watch("firstname");
  const lastname = watch("lastname");
  const password = watch("password");
  const phone = watch("phone");
  const email = watch("email");
  const confirmPassword = watch("confirmPassword");
  const country = watch("country");

  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function signUp(signUpValues) {
    const signUpData = {
      firstName: signUpValues?.firstname,
      lastName: signUpValues?.lastname,
      email: signUpValues?.email,
      phone: signUpValues?.phone,
      password: signUpValues?.password,
      password_confirmation: signUpValues?.confirmPassword,
      category: "indv",
      country: signUpValues?.country?.value,
    };

    dispatch(postSignUp({ ...signUpData }))
      .then((result) => {
        const {
          payload: { data },
        } = result;
        const success = Boolean(data?.success);
        if (success === true) {
          navigate("/otp");
        } else {
          console.log(result?.payload?.response?.data?.errors);
          // toast.error(result?.payload?.response?.data?.errors);
        }
      })
      .finally();
  }

  return (
    <>
      <div className="flex flex-col gap-6 pt-[2rem] pb-[4rem] px-10">
        <div className="grid grid-cols-2 gap-y-4 gap-x-3">
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
        <Button disabled={!isValid} onClick={handleSubmit(signUp)}>
          Sign Up
        </Button>
      </div>
    </>
  );
}

export default IndividualForm;
