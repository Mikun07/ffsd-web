import FormTextInput from "../../../components/input/Form/FormTextInput";

const DocumentDetails = ({ setValue, errors, register }) => {
  return (
    <>
      <div className="  flex flex-col bg-slate-100 p-4 shadow-sm rounded-lg gap-y-4">
        <FormTextInput
          label="firstName"
          errors={errors}
          {...register("firstName", {
            required: true,
          })}
          onChange={(e) => setValue("firstName", e.target.value)}
        />

        <FormTextInput
          label="lastName"
          errors={errors}
          {...register("lastName", {
            required: true,
          })}
          onChange={(e) => setValue("lastName", e.target.value)}
        />

        <FormTextInput
          label="middleName"
          errors={errors}
          {...register("middleName", {
            required: true,
          })}
          onChange={(e) => setValue("middleName", e.target.value)}
        />

        <FormTextInput
          label="dob"
          title={"Date of Birth"}
          errors={errors}
          {...register("dob", {
            required: true,
          })}
          onChange={(e) => setValue("dob", e.target.value)}
          type="date"
        />
      </div>
    </>
  );
};

export default DocumentDetails;
