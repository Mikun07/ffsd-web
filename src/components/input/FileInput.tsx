import { FC, useState, ChangeEvent } from "react";
import { TextInputProps } from "../../types/components/input";
import { startCase } from "lodash";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import UploadIMG from "../../assets/UploadIMG.png";

const FileInput = ({
  label = "",
  onFileSelect,
  // ...rest
}) => {
  const title: string = startCase(label);

  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    const selectedFile = fileList && fileList[0];

    setFile(selectedFile);
    console.log({ selectedFile });
    onFileSelect && onFileSelect(selectedFile);
  };


  console.log({file})

  const handleFileDelete = () => {
    setFileName("No selected file");
    setFileURL(null);
    setFile(null);
  };

  return (
    <div className="w-full m-auto sm:px-0 cursor-pointer">
      <div className="relative group w-full h-44 p-2 flex rounded-xl items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-white rounded-xl bg-opacity-80 backdrop-blur-xl shadow-sm group-hover:bg-opacity-60"
        ></div>
        <input
          type="file"
          id="files"
          name="files"
          accept=".pdf"
          onChange={handleFileChange}
          className="relative z-10 opacity-0 w-full h-full"
          // {...rest}
        />

        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          {file ? (
            <>
              <div className="space-y flex w-full relative h-full">
                <div className="flex items-center justify-center w-full">
                  <AiFillFileImage color="#40b52d" size={100} />
                </div>
              </div>

              <div className="absolute z-40 w-full h-10 bottom-0 rounded-b-xl">
                <div className="flex items-center h-full mx-2 justify-between">
                  <span className="text-[15px] font-medium">{file?.name}</span>
                  <MdDelete
                    onClick={handleFileDelete}
                    color="#40b52d"
                    size={30}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="space-y">
              <img
                src={UploadIMG}
                alt="illustration"
                className="w-32 m-auto sm:w-40"
              />
              <p className="text-gray-700 text-lg text-center">
                <span className="block">Drag and drop a file</span>
                <label htmlFor="files" className="text-primary">
                  {title}
                </label>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileInput;

{
  /* <div className="flex flex-col gap-1">
<label htmlFor={label} className="text-xs">
  <div>{title || startCase(label)}</div>
</label>
<div className="w-full m-auto sm:px-0 cursor-pointer">
  <div className="relative group w-full bg-[#E2E8F0] text-black rounded outline-none min-h-[38px] p-2 text-xs focus:ring-1 ring-[#40B52D]">
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full rounded bg-opacity-80 backdrop-blur-xl group-hover:bg-opacity-20"
    ></div>
    <input
      type="file"
      id="files"
      name="files"
      accept=".pdf"
      onChange={handleFileChange}
      className="relative z-10 opacity-0 w-full h-full"
      {...rest}
    />

    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      {fileURL ? (
        <>
          <div className="space-y flex rounded px-2 w-full h-full">
            <div className="flex items-center justify-start gap-2">
              <AiFillFileImage color="#40b52d" size={30} />
              <span className="text-[15px] font-medium">
                {fileName}
              </span>
            </div>
          </div>

          <div className="absolute z-40 h-full right-0 rounded-r">
            <div className="flex items-center h-full rounded justify-between">
              <MdDelete
                onClick={handleFileDelete}
                color="#40b52d"
                size={30}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full h-full rounded px-2 justify-start ">
          <p className="text-gray-700 text-sm text-start">
            <span className="">Drag and drop a file</span>
          </p>
        </div>
      )}
    </div>
  </div>
</div>
</div> */
}
