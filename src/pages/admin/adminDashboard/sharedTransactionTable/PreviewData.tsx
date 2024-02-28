import TextInput from "../../../../components/input/TextInput";
import { FILE_URL } from "../../../../config/api";


function PreviewData({ data }) {
  console.log({ data });
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#46A437";
      case "queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  // Function to handle document download
  const handleDownload = () => {
    // Get the document data
    const { document, owner } = data;
    const documentData = data?.doc_path;

    // Construct the download URL
    const downloadUrl = `${FILE_URL}${documentData}`;

    // Open the download URL in a new tab
    window.open(downloadUrl, "_blank");
  };

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
      <div className="flex flex-col justify-between h-full px-2 w-full overflow-y-auto custom__scrollbar">
        <div className="flex flex-col gap-6 pb-6 capitalize">
          <TextInput
            disabled
            label="Name on document"
            value={`${data?.docOwnerFirstName} ${data?.docOwnerMiddleName} ${data?.docOwnerLastName}`}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="Date of birth"
            value={data?.docOwnerDOB}
            inputClassName="capitalize"
          />

          <TextInput
            disabled
            label="Reference ID"
            value={`${data?.ref_id}`}
            inputClassName="uppercase"
          />

          <div className="flex flex-col w-full gap-1">
            <p className="text-xs font-medium capitalize">payment status</p>
            <div className="flex w-full gap-9 items-center">
              <p
                className="bg-slate-200 font-medium flex items-center text-black w-full rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D]"
                style={{
                  color: getStatusColor(data?.payment_status),
                }}
              >
                {data?.payment_status}
              </p>
            </div>
          </div>

          <TextInput
            disabled
            label="Amount"
            value={`${data?.currency}${" "}${data?.fee}`}
            inputClassName="capitalize"
          />

          <TextInput
            disabled
            label="Uploaded by"
            value={`${data?.uploaded_by_lastName} ${data?.uploaded_by_firstName}`}
            inputClassName="capitalize"
          />

          <TextInput
            disabled
            label="uploader email"
            value={data?.uploaded_by_email}
            inputClassName="lowercase"
          />
          <TextInput
            disabled
            label="uploader Phone number"
            value={data?.uploaded_by_phone}
            inputClassName="lowercase"
          />

          <TextInput
            disabled
            label="uploaded on"
            value={formatDate(data?.transaction_time)}
            inputClassName="capitalize"
          />
        </div>
      </div>
    </>
  );
}

export default PreviewData;
