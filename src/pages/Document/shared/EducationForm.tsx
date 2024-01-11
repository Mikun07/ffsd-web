import React from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextInput from "../../../components/input/TextInput";
import TextAreaInput from "../../../components/input/TextAreaInput";

const EducationForm = ({
  setValue,
  EducationOptions,
  Education,
  countryOptions,
  country,
  matricNumber,
  dateOfIssueEduc,
  schoolCountryEduc,
  schoolNameEduc,
  schoolCity,
  enrollmentYearEduc,
  graduationYearEduc,
  addInfo,
  courseOrSubject,
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
      <div className=" mt-10 flex lg:flex-row flex-col-reverse gap-4">
        <div className="">
          <FileInput label="choose file" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div>
            <SelectInput
              label="File type"
              options={EducationOptions}
              value={Education}
              handleChange={setEducation}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="School ID or Matric Number"
              value={matricNumber}
              onChange={(e) => setValue("matricNumber", e.target.value)}
            />

            <TextInput
              label="School Name"
              value={schoolNameEduc}
              onChange={(e) => setValue("schoolNameEduc", e.target.value)}
            />

            <SelectInput
              label="What country is the school located in"
              options={countryOptions}
              handleChange={setCountry}
              value={schoolCountryEduc}
            />

            <TextInput
              label="What City is the school located in"
              value={schoolCity}
              onChange={(e) => setValue("schoolCity", e.target.value)}
            />

            <TextInput
              label="Enrollment Year"
              value={enrollmentYearEduc}
              onChange={(e) => setValue("enrollmentYearEduc", e.target.value)}
            />

            <TextInput
              label="Graduation Year "
              value={graduationYearEduc}
              onChange={(e) => setValue("graduationYearEduc", e.target.value)}
            />

            <TextInput
              type="date"
              label="Date Certificate was issued"
              value={dateOfIssueEduc}
              onChange={(e) => setValue("dateOfIssueEduc", e.target.value)}
            />

            <TextInput
              label="Course Studied "
              value={courseOrSubject}
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
