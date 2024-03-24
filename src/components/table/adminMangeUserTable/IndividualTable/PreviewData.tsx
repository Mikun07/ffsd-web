import TextInput from "../../../input/TextInput";

const PreviewData = ({ data }) => {

  return (
    <>
      <div className="flex flex-col justify-between h-full px-2 w-full overflow-y-auto custom__scrollbar">
        <div className="flex flex-col gap-6">
          <TextInput disabled label="First Name" value={data?.firstName}  inputClassName="capitalize" />
          <TextInput disabled label="Last Name" value={data?.lastName}  inputClassName="capitalize" />
          <TextInput disabled label="Email Address" value={data?.email}  inputClassName="lowercase"/>
          <TextInput disabled label="Phone Number" value={data?.phone} />
        </div>
      </div>
    </>
  );
};

export default PreviewData;
