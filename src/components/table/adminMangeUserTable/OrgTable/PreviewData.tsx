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
      <div className="flex flex-col justify-between h-full px-2 w-ful overflow-y-auto custom__scrollbar">
        <div className="flex flex-col gap-6 capitalize">
          <TextInput
            disabled
            label="Authorized Personal"
            value={`${data?.lastName} ${data?.firstName}`}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="Institution_name"
            value={data?.company_name}
            inputClassName="uppercase"
          />
          <TextInput
            disabled
            label="Institution Email Address"
            value={data?.email}
          />
          <TextInput
            disabled
            label="Institution contact number"
            value={data?.phone}
          />
          <TextInput
            disabled
            label="Institution_industry"
            value={data?.company_industry}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="Institution_ID"
            value={`${data?.company_ref}`}
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
