import TextInput from "../../../../components/input/TextInput";

const PreviewData = ({ data }) => {
  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return "yet to login"; // Handling null or undefined values
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleString(undefined, options);
  }

  return (
    <>
      {/* <div className="capitalize "></div> */}
      <div className="flex flex-col justify-between h-full px-2 w-full">
        <div className="flex flex-col gap-6 capitalize">
          <TextInput
            disabled
            label="Owner of organization"
            value={`${data?.lastName} ${data?.firstName}`}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="company_name"
            value={data?.company_name}
            inputClassName="uppercase"
          />
          <TextInput disabled label="Email Address" value={data?.email} />
          <TextInput disabled label="Phone Number" value={data?.phone} />
          <TextInput
            disabled
            label="company_industry"
            value={data?.company_industry}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="company_ID"
            value={`#${data?.company_ref?.split("/")[1]}`}
            inputClassName="uppercase"
          />
          <TextInput
            disabled
            label="Country Location"
            value={data?.CountryName}
          />
          <TextInput
            disabled
            label="Date Created"
            value={formatDate(data?.dateOfCompanyUpdate)}
          />
        </div>
      </div>
    </>
  );
};

export default PreviewData;
