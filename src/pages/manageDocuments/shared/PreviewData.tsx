import TextInput from "../../../components/input/TextInput";
import { FILE_URL } from "../../../config/api";

function PreviewData({ data }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#46A437";
      case "submitted":
        return "#D4973B";
      case "archived":
        return "#D1D43B";
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
            label="Name"
            value={`${data?.userInfo?.docOwnerFirstName} ${data?.userInfo?.docOwnerMiddleName} ${data?.userInfo?.docOwnerLastName}`}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="Type of document uploaded"
            value={data?.tag}
            inputClassName="capitalize"
          />

          <TextInput
            disabled
            label="Reference ID"
            value={`#${data?.ref_id?.split("/")[1]}`}
            inputClassName="uppercase"
          />

          <TextInput
            disabled
            label="Transaction ID"
            value={data?.application_id}
            inputClassName="uppercase"
          />

          <div className="flex flex-col w-full gap-1">
            <p className="text-xs font-medium capitalize">upload status</p>
            <div className="flex w-full gap-9 items-center">
              <p
                className="bg-slate-200 flex items-center text-black w-full rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D]"
                style={{
                  color: getStatusColor(data?.status),
                  opacity: "0.95",
                }}
              >
                {data?.status}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            <p className="text-xs font-medium capitalize">Document uploaded</p>
            {/* Add a button or link to trigger download */}
            <button
              onClick={handleDownload}
              className=" text-black w-full rounded outline-none min-h-[38px] p-2 text-xs hover:ring-1 ring-[#40B52D]"
            >
              <span className="text-primary hover:underline text-[12px] font-medium flex items-start">
                Download Document
              </span>
            </button>
          </div>

          {data?.doc_type === "finance" && (
            <TextInput
              disabled
              label="Bank Name"
              value={data?.bank_name}
              inputClassName="capitalize"
            />
          )}

          {data?.doc_type === "prof" && (
            <>
              <TextInput
                disabled
                label="institution"
                value={data?.doc_verifier_name}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="student ID"
                value={data?.studentId}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="qualification gotten"
                value={data?.qualification}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="Course Study"
                value={data?.course}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="Student Status"
                value={data?.enrollment_status}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="enrollment year"
                value={data?.start_year}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="graduation year"
                value={data?.end_year}
                inputClassName="capitalize"
              />
            </>
          )}

          {data?.doc_type === "educ" && (
            <>
              <TextInput
                disabled
                label="institution"
                value={data?.verifier_name}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="institution location"
                value={data?.verifier_city}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="institution Country"
                value={data?.country_name}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="student ID"
                value={data?.studentId}
                inputClassName="capitalize"
              />

              <TextInput
                disabled
                label="Course of Study"
                value={data?.course}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="enrollment year"
                value={data?.start_year}
                inputClassName="capitalize"
              />
              <TextInput
                disabled
                label="graduation year"
                value={data?.end_year}
                inputClassName="capitalize"
              />
            </>
          )}

          <TextInput
            disabled
            label="uploaded on"
            value={formatDate(data?.created_at)}
            inputClassName="capitalize"
          />
          <TextInput
            disabled
            label="Last Review"
            value={formatDate(data?.updated_at)}
            inputClassName="capitalize"
          />
        </div>
      </div>
    </>
  );
}

export default PreviewData;
