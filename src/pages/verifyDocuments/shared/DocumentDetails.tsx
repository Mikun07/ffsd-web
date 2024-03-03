import FormDateInput from "../../../components/input/Form/FormDateInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";

const DocumentDetails = ({ setValue, errors, register, isValid }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedDate = formatDate(inputValue);
    setValue("dob", formattedDate);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = dateObject.getFullYear();
    return `${day}-${month}-${year}`;
  };
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

        <FormDateInput
          label="dob"
          title={"Date of Birth"}
          errors={errors}
          {...register("dob", {
            required: true,
          })}
          onChange={handleChange}
          type="date"
        />
      </div>
    </>
  );
};

export default DocumentDetails;
