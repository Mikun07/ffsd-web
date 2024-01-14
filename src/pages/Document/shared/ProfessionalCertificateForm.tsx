import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import TextInput from "../../../components/input/TextInput";
import TextAreaInput from "../../../components/input/TextAreaInput";

const ProfessionalCertificateForm = ({
  setValue,
  countryOptions,
  country,
  professionalCertificate,
  professionalCertificateOptions,
  studentIdProf,
  qualificationProf,
  enrolmentStatusProf,
  schoolNameProf,
  schoolCountryProf,
  enrollmentYearProf,
  graduationYearProf,
  addInfoProf,
  profCourse,
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
      <div className=" mt-10 flex lg:flex-row flex-col-reverse gap-4">
        <div className="">
          <FileInput label="choose file" />
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Professional Body"
              options={professionalCertificateOptions}
              value={schoolNameProf}
              handleChange={setProfessionalCertificate}
            />

            <TextInput
              label="Exam ID"
              value={studentIdProf}
              onChange={(e) => setValue("studentIdProf", e.target.value)}
            />

            <TextInput
              label="Qualification gotten"
              value={qualificationProf}
              onChange={(e) => setValue("qualificationProf", e.target.value)}
            />

            <SelectInput
              label="What country is the school located in"
              options={countryOptions}
              handleChange={setCountry}
              value={schoolCountryProf}
            />

            <TextInput
              label="Are you a current or past student"
              value={enrolmentStatusProf}
              onChange={(e) => setValue("enrolmentStatusProf", e.target.value)}
            />

            <TextInput
              label="Enrollment Year"
              value={enrollmentYearProf}
              onChange={(e) => setValue("enrollmentYearProf", e.target.value)}
            />
            <TextInput
              label="Graduation Year "
              value={graduationYearProf}
              onChange={(e) => setValue("graduationYearProf", e.target.value)}
            />
            {/* <TextInput
              type="date"
              label="Date Certificate was issued"
              value={graduationYearProf}
              onChange={(e) => setValue("graduationYearProf", e.target.value)}
            /> */}
            <TextInput
              label="Course Studied "
              value={profCourse}
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
