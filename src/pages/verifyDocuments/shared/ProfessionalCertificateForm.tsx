import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../components/input/Form/FormTextAreaInput";
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from "react";

const ProfessionalCertificateForm = ({
  setValue,
  countryOptions,
  professionalCertificateOptions,
  errors,
  register,
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

  // const addFileInput = () => {
  //   setFileInputs((prevInputs) => [
  //     ...prevInputs,
  //     <FileInput
  //       key={prevInputs.length}
  //       label={`choose file ${prevInputs.length + 1}`}
  //     />,
  //   ]);
  // };

  // const deleteFileInput = () => {
  //   if (fileInputs.length > 1) {
  //     setFileInputs((prevInputs) => prevInputs.slice(0, -1));
  //   }
  // };
  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="px-2 max-h-[400px] overflow-y-auto custom__scrollbar">
          {fileInputs.map((fileInputs, selectedFileIndex) => {
            return (
              <div className="mt-3" key={selectedFileIndex}>
                {/* {selectedFileIndex !== 0 && (
                  <div
                    onClick={() => deleteFileInput(selectedFileIndex)}
                    className="relative cursor-pointer"
                  >
                    <span className="absolute z-30 p-3 rounded-r right-1 text-[12px]">
                      {" "}
                      <AiFillCloseCircle size={15} />{" "}
                    </span>
                  </div>
                )} */}
                <FileInput
                  label="choose file"
                  onFileSelect={(file) =>
                    setValue(`fileDocProf.${index}.${selectedFileIndex}`, file)
                  }
                />
              </div>
            );
          })}
          {/* <div
            onClick={addFileInput}
            className="flex p-1 mt-3 w-full cursor-pointer"
          >
            <span className="rounded-lg flex bg-transparent font-medium text-[12px] items-center justify-between">
              <span className="flex gap-2">
                {" "}
                + <p>Add File</p>
              </span>
            </span>
          </div> */}
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
