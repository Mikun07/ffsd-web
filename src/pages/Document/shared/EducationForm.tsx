import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";

const EducationForm = ({
  setValue,
  EducationOptions,
  Education,
  countryOptions,
  errors,
  control,
  register,
  schoolCountryEduc,
  addInfo,
  fileDocEduc,
  index
}) => {
  function setEducation(item) {
    setValue(item?.label, item?.value);
  }

  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="">
          <FileInput label="choose file" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
            <SelectInput
              label={`fileType.${index}`}
              title="File Type"
              control={control}
              options={EducationOptions}
              handleChange={setEducation}
            />

            <FormTextInput
              label={`matricNumber.${index}`}
              title="School ID or Matric Number"
              errors={errors}
              {...register(`matricNumber.${index}`, {
                required: {
                  value: true,
                  message: "ID is required",
                },
              })}
              onChange={(e) => setValue(`matricNumber.${index}`, e.target.value)}
            />

            <FormTextInput
              label={`schoolNameEduc.${index}`}
              title="School Name"
              errors={errors}
              {...register(`schoolNameEduc.${index}`, {
                required: {
                  value: true,
                  message: "School Name is required",
                },
              })}
              onChange={(e) => setValue(`schoolNameEduc.${index}`, e.target.value)}
            />

            <SelectInput
              title="School country"
              label={`schoolCountryEdu.${index}`}
              options={countryOptions}
              handleChange={setCountry}
              control={control}
            />

            <FormTextInput
              label={`schoolCity.${index}`}
              title="School city"
              errors={errors}
              {...register(`schoolCity.${index}`, {
                required: {
                  value: true,
                  message: "school city is required",
                },
              })}
              onChange={(e) => setValue(`schoolCity.${index}`, e.target.value)}
            />

            <FormTextInput
              label={`enrollmentYearEduc.${index}`}
              title="Enrollment Year"
              errors={errors}
              {...register(`enrollmentYearEduc.${index}`, {
                required: {
                  value: true,
                  message: "Enrollment Year is required",
                },
              })}
              onChange={(e) => setValue(`enrollmentYearEduc.${index}`, e.target.value)}
            />

            <FormTextInput
              label={`graduationYearEduc.${index}`}
              title="Graduation Year"
              errors={errors}
              {...register(`graduationYearEduc.${index}`, {
                required: {
                  value: true,
                  message: "Graduation Year is required",
                },
              })}
              onChange={(e) => setValue(`graduationYearEduc.${index}`, e.target.value)}
            />

            <FormTextInput
              label={`dateOfIssueEduc.${index}`}
              title={"Certificate issue date"}
              errors={errors}
              {...register(`dateOfIssueEduc.${index}`, {
                required: true,
              })}
              onChange={(e) => setValue(`dateOfIssueEduc.${index}`, e.target.value)}
              type="date"
            />

            <FormTextInput
              label={`courseOrSubject.${index}`}
              title={"Course Studied"}
              errors={errors}
              {...register(`courseOrSubject.${index}`, {
                required: {
                  value: true,
                  message: "Course is required",
                },
              })}
              onChange={(e) => setValue(`courseOrSubject.${index}`, e.target.value)}
            />
          </div>

          <div>
            <TextAreaInput
              label={`Additional Information.${index}`}
              value={addInfo}
              onChange={(e) => setValue("addInfo", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationForm;
