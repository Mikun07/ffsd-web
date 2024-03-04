import TextInput from "../../../../../components/input/TextInput";

const PreviewData = ({ data }) => {
  return (
    <>
      <div className="flex flex-col justify-between h-full px-2 w-full">
        <div className="flex flex-col gap-6">
          <TextInput
            disabled
            label="First Name"
            value={data?.docOwnerFirstName}
          />
          <TextInput
            disabled
            label="Middle Name"
            value={data?.docOwnerMiddleName}
          />
          <TextInput
            disabled
            label="Last Name"
            value={data?.docOwnerLastName}
          />
          <TextInput disabled label="Date of birth" value={data?.docOwnerDOB} />
          <TextInput
            disabled
            label="Reference ID"
            value={`${data?.viewer_code}`}
            inputClassName="uppercase"
          />

          <TextInput
            disabled
            label="application ID"
            value={data?.application_id}
            inputClassName="uppercase"
          />
        </div>
      </div>
    </>
  );
};

export default PreviewData;
