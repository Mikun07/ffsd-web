import { useState } from "react";
import FileInput from "../../../../components/input/FileInput";
import SelectInput from "../../../../components/input/SelectInput";
import FormTextInput from "../../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../../components/input/Form/FormTextAreaInput";

const ProfessionalCertificateForm = ({
  setValue,
  countryOptions,
 
  professionalCertificateOptions,
  errors,
  register,
  schoolNameProf,
  schoolCountryProf,
  addInfoProf,
  fileDocProf,
  index,
  control,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  function setProfessionalCertificate(item) {
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
                    setValue(`fileDocProf.${index}.${selectedFileIndex}`, file)
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-4">
            <SelectInput
              label={`schoolNameProf.${index}`}
              title="Professional Body"
              options={professionalCertificateOptions}
              handleChange={setProfessionalCertificate}
              control={control}
            />

            <FormTextInput
              label={`studentIdProf.${index}`}
              title={"Exam ID"}
              errors={errors}
              {...register(`studentIdProf.${index}`, {
                required: {
                  value: true,
                  message: "Exam ID is required",
                },
              })}
              onChange={(e) =>
                setValue(`studentIdProf..${index}`, e.target.value)
              }
            />

            <FormTextInput
              label={`qualificationProf.${index}`}
              title={"Qualification gotten"}
              errors={errors}
              {...register(`qualificationProf.${index}`, {
                required: {
                  value: true,
                  message: "required",
                },
              })}
              onChange={(e) =>
                setValue(`qualificationProf.${index}`, e.target.value)
              }
            />

            <SelectInput
              label={`schoolCountryProf.${index}`}
              title="school country"
              options={countryOptions}
              handleChange={setCountry}
              control={control}
            />

            <FormTextInput
              label={`enrolmentStatusProf.${index}`}
              title={"current or past student"}
              errors={errors}
              {...register(`enrolmentStatusProf.${index}`, {
                required: {
                  value: true,
                  message: "Status is required",
                },
              })}
              onChange={(e) =>
                setValue(`enrolmentStatusProf.${index}`, e.target.value)
              }
            />

            <FormTextInput
              label={`enrollmentYearProf.${index}`}
              title={"Enrollment Year"}
              errors={errors}
              {...register(`enrollmentYearProf.${index}`, {
                required: {
                  value: true,
                  message: "Enrollment Year is required",
                },
              })}
              onChange={(e) =>
                setValue(`enrollmentYearProf.${index}`, e.target.value)
              }
            />

            <FormTextInput
              label={`graduationYearProf.${index}`}
              title={"Graduation Year"}
              errors={errors}
              {...register(`graduationYearProf.${index}`, {
                required: {
                  value: true,
                  message: "Graduation Year is required",
                },
              })}
              onChange={(e) =>
                setValue(`graduationYearProf.${index}`, e.target.value)
              }
            />

            <FormTextInput
              label={`profCourse.${index}`}
              title={"Course Studied"}
              errors={errors}
              {...register(`profCourse.${index}`, {
                required: true,
              })}
              onChange={(e) => setValue(`profCourse.${index}`, e.target.value)}
            />
          </div>

          <div>
            <FormTextAreaInput
              title="Additional Information"
              label={`addInfoProf.${index}`}
              errors={errors}
              onChange={(e) => setValue(`addInfoProf.${index}`, e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalCertificateForm;
