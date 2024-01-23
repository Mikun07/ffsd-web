import React, { useState } from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../components/input/Form/FormTextAreaInput";
import { AiFillCloseCircle } from "react-icons/ai";

const EducationForm = ({
  setValue,
  EducationOptions,
  Education,
  countryOptions,
  InstitutionOptions,
  errors,
  control,
  register,
  schoolCountryEduc,
  addInfo,
  fileDocEduc,
  index,
}) => {
  function setEducation(item) {
    setValue(item?.label, item?.value);
  }

  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  function setInstitution(item) {
    setValue(item?.label, item?.value);
  }

  const [fileInputs, setFileInputs] = useState<JSX.Element[]>([
    <FileInput key={0} label="choose file" />,
  ]);

  const addFileInput = () => {
    setFileInputs((prevInputs) => [
      ...prevInputs,
      <FileInput
        key={prevInputs.length}
        label={`choose file ${prevInputs.length + 1}`}
      />,
    ]);
  };

  const deleteFileInput = () => {
    if (fileInputs.length > 1) {
      setFileInputs((prevInputs) => prevInputs.slice(0, -1));
    }
  };

  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="px-2 max-h-[400px] overflow-y-auto custom__scrollbar">
          {fileInputs.map((fileInputs, selectedFileIndex) => {
            return (
              <div className="mt-3" key={selectedFileIndex}>
                {selectedFileIndex !== 0 && (
                  <div
                    onClick={() => deleteFileInput(selectedFileIndex)}
                    className="relative cursor-pointer"
                  >
                    <span className="absolute z-30 p-3 rounded-r right-1 text-[12px]">
                      {" "}
                      <AiFillCloseCircle size={15} />{" "}
                    </span>
                  </div>
                )}
                <FileInput
                  label="choose file"
                  onFileSelect={(file) =>
                    {
                      console.log({file})
                      setValue(`fileDocEduc.${index}.${selectedFileIndex}`, file)
                    }
                  }
                />
              </div>
            );
          })}
          <div
            onClick={addFileInput}
            className="flex p-1 mt-3 w-full cursor-pointer"
          >
            <span className="rounded-lg flex bg-transparent font-medium text-[12px] items-center justify-between">
              <span className="flex gap-2">
                {" "}
                + <p>Add File</p>
              </span>
            </span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
            <SelectInput
              label={`fileTypeEduc.${index}`}
              title="File Type"
              control={control}
              options={EducationOptions}
              handleChange={setEducation}
            />

            <FormTextInput
              label={`matricNumber.${index}`}
              title="School ID"
              errors={errors}
              {...register(`matricNumber.${index}`, {
                required: {
                  value: true,
                  message: "ID is required",
                },
              })}
              onChange={(e) =>
                setValue(`matricNumber.${index}`, e.target.value)
              }
            />

            {/* <FormTextInput
              label={`schoolNameEduc.${index}`}
              title="School Name"
              errors={errors}
              {...register(`schoolNameEduc.${index}`, {
                required: {
                  value: true,
                  message: "School Name is required",
                },
              })}
              onChange={(e) =>
                setValue(`schoolNameEduc.${index}`, e.target.value)
              }
            /> */}

            <SelectInput
              label={`schoolNameEduc.${index}`}
              title="School Name"
              control={control}
              options={InstitutionOptions}
              handleChange={setInstitution}
            />

            <SelectInput
              title="School country"
              label={`schoolCountryEduc.${index}`}
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
              onChange={(e) =>
                setValue(`enrollmentYearEduc.${index}`, e.target.value)
              }
            />

            {/* <FormTextInput
              label={`enrollmentYearEduc.${index}`}
              title="Enrollment Year"
              errors={errors}
              {...register(`enrollmentYearEduc.${index}`, {
                required: {
                  value: true,
                  message: "Enrollment Year is required",
                },
              })}
              onChange={(e) =>
                setValue(`enrollmentYearEduc.${index}`, e.target.value)
              }
            /> */}

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
              onChange={(e) =>
                setValue(`graduationYearEduc.${index}`, e.target.value)
              }
            />

            {/* <FormTextInput
              label={`dateOfIssueEduc.${index}`}
              title={"Certificate issue date"}
              errors={errors}
              {...register(`dateOfIssueEduc.${index}`, {
                required: true,
              })}
              onChange={(e) =>
                setValue(`dateOfIssueEduc.${index}`, e.target.value)
              }
              type="date"
            /> */}

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
              onChange={(e) =>
                setValue(`courseOrSubject.${index}`, e.target.value)
              }
            />
          </div>

          <div>
            <FormTextAreaInput
              title={"Additional Information"}
              label={`addInfo.${index}`}
              errors={errors}
              onChange={(e) => setValue(`addInfo.${index}`, e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EducationForm;
