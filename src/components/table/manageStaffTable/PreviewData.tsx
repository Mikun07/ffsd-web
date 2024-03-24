import TextInput from "../../input/TextInput";

const PreviewData = ({ onClose, data }) => {

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
      hour12: true, // Enable 12-hour time format
    };
    return date.toLocaleString(undefined, options);
  }

  return (
    <>
      <div className="flex flex-col justify-between h-full px-2 w-full">
        <div className="flex flex-col gap-6">
          <TextInput disabled label="First Name" value={data?.firstName} inputClassName="capitalize" />
          <TextInput disabled label="Last Name" value={data?.lastName} inputClassName="capitalize" />
          <TextInput disabled label="Email Address" value={data?.email} />
          <TextInput
            disabled
            label="Date Created"
            value={formatDate(data?.created_at)}
          />
          <TextInput
            disabled
            label="Logged in on"
            value={formatDate(data?.last_logged_in)}
          />

          <TextInput disabled label="Status" value={data?.status} inputClassName="capitalize" />
        </div>
      </div>
    </>
  );
};

export default PreviewData;
