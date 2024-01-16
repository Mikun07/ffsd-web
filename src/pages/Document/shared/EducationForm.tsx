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
  register,
  schoolCountryEduc,
  addInfo,
  fileDocEduc,
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
              label="File type"
              options={EducationOptions}
              value={Education}
              handleChange={setEducation}
            />

            <FormTextInput
              label="matricNumber"
              title="School ID or Matric Number"
              errors={errors}
              {...register("matricNumber", {
                required: {
                  value: true,
                  message: "ID is required",
                },
              })}
              onChange={(e) => setValue("matricNumber", e.target.value)}
            />

            <FormTextInput
              label="schoolNameEduc"
              title="School Name"
              errors={errors}
              {...register("schoolNameEduc", {
                required: {
                  value: true,
                  message: "School Name is required",
                },
              })}
              onChange={(e) => setValue("schoolNameEduc", e.target.value)}
            />

            <SelectInput
              label="country is the school located in"
              options={countryOptions}
              handleChange={setCountry}
              value={schoolCountryEduc}
            />

            <FormTextInput
              label="schoolCity"
              title="City is the school located in"
              errors={errors}
              {...register("schoolCity", {
                required: {
                  value: true,
                  message: "school city is required",
                },
              })}
              onChange={(e) => setValue("schoolCity", e.target.value)}
            />

            <FormTextInput
              label="enrollmentYearEduc"
              title="Enrollment Year"
              errors={errors}
              {...register("enrollmentYearEduc", {
                required: {
                  value: true,
                  message: "Enrollment Year is required",
                },
              })}
              onChange={(e) => setValue("enrollmentYearEduc", e.target.value)}
            />

            <FormTextInput
              label="graduationYearEduc"
              title="Graduation Year"
              errors={errors}
              {...register("graduationYearEduc", {
                required: {
                  value: true,
                  message: "Graduation Year is required",
                },
              })}
              onChange={(e) => setValue("graduationYearEduc", e.target.value)}
            />

            <FormTextInput
              label="dateOfIssueEduc"
              title={"Date Certificate was issued"}
              errors={errors}
              {...register("dateOfIssueEduc", {
                required: true,
              })}
              onChange={(e) => setValue("dateOfIssueEduc", e.target.value)}
              type="date"
            />

            <FormTextInput
              label="courseOrSubject"
              title={"Course Studied"}
              errors={errors}
              {...register("courseOrSubject", {
                required: {
                  value: true,
                  message: "Course is required",
                },
              })}
              onChange={(e) => setValue("courseOrSubject", e.target.value)}
            />
          </div>

          <div>
            <TextAreaInput
              label="Additional Information"
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
