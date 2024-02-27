import { useState } from "react";
import FileInput from "../../../../components/input/FileInput";
import SelectInput from "../../../../components/input/SelectInput";
import FormTextInput from "../../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../../components/input/Form/FormTextAreaInput";

const EducationForm = ({
  setValue,
  EducationOptions,
  countryOptions,
  InstitutionOptions,
  errors,
  control,
  register,
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

  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="px-2 max-h-[400px] overflow-y-auto custom__scrollbar">
          {fileInputs.map((fileInputs, selectedFileIndex) => {
            return (
              <div className="mt-3" key={selectedFileIndex}>
                <FileInput
                  label="choose file"
                  onFileSelect={(file) =>
                    {
                      setValue(`fileDocEduc.${index}.${selectedFileIndex}`, file)
                    }
                  }
                />
              </div>
            );
          })}
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
