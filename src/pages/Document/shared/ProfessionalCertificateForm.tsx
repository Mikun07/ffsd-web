import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextAreaInput from "../../../components/input/TextAreaInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";

const ProfessionalCertificateForm = ({
  setValue,
  countryOptions,
  // country,
  // professionalCertificate,
  professionalCertificateOptions,
  errors,
  register,
  schoolNameProf,
  schoolCountryProf,
  addInfoProf,
  fileDocProf,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }
  function setProfessionalCertificate(item) {
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
              label="Professional Body"
              options={professionalCertificateOptions}
              value={schoolNameProf}
              handleChange={setProfessionalCertificate}
            />

            <FormTextInput
              label="studentIdProf"
              title={"Exam ID"}
              errors={errors}
              {...register("studentIdProf", {
                required: {
                  value: true,
                  message: "Exam ID is required",
                },
              })}
              onChange={(e) => setValue("studentIdProf", e.target.value)}
            />

            <FormTextInput
              label="qualificationProf"
              title={"Qualification gotten"}
              errors={errors}
              {...register("qualificationProf", {
                required: {
                  value: true,
                  message: "Exam ID is required",
                },
              })}
              onChange={(e) => setValue("qualificationProf", e.target.value)}
            />

            <SelectInput
              label="country is the school located in"
              options={countryOptions}
              handleChange={setCountry}
              value={schoolCountryProf}
            />

            <FormTextInput
              label="enrolmentStatusProf"
              title={"Are you a current or past student"}
              errors={errors}
              {...register("enrolmentStatusProf", {
                required: {
                  value: true,
                  message: "enrollment Status is required",
                },
              })}
              onChange={(e) => setValue("enrolmentStatusProf", e.target.value)}
            />

            <FormTextInput
              label="enrollmentYearProf"
              title={"Enrollment Year"}
              errors={errors}
              {...register("enrollmentYearProf", {
                required: {
                  value: true,
                  message: "Enrollment Year is required",
                },
              })}
              onChange={(e) => setValue("enrollmentYearProf", e.target.value)}
            />

            <FormTextInput
              label="graduationYearProf"
              title={"Graduation Year"}
              errors={errors}
              {...register("graduationYearProf", {
                required: {
                  value: true,
                  message: "Graduation Year is required",
                },
              })}
              onChange={(e) => setValue("graduationYearProf", e.target.value)}
            />

            <FormTextInput
              label="profCourse"
              title={"Course Studied"}
              errors={errors}
              {...register("profCourse", {
                required: true,
              })}
              onChange={(e) => setValue("profCourse", e.target.value)}
            />
          </div>

          <div>
            <TextAreaInput
              label="Additional Information"
              value={addInfoProf}
              onChange={(e) => setValue("addInfoProf", e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalCertificateForm;
