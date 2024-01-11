import { FC, useState, ChangeEvent } from "react";
import { TextInputProps } from "../../types/components/input";
import { startCase } from "lodash";
import { AiFillFileImage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import UploadIMG from "../../assets/UploadIMG.png";

const FileInput: FC<TextInputProps> = ({
  label = "",
  ...rest
}: TextInputProps) => {
  const title: string = startCase(label);

  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<string | ArrayBuffer | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const selectedFile = fileList[0];
      if (selectedFile) {
        setFileName(selectedFile.name);
        if (selectedFile.type === "application/pdf") {
          setFileURL(URL.createObjectURL(selectedFile));
        } else {
          setFile(URL.createObjectURL(selectedFile));
        }
        setFile(selectedFile);
      }
    }
  };

  const handleFileDelete = () => {
    setFileName("No selected file");
    setFileURL(null);
    setFile(null);
  };

  return (
    <div className="w-full m-auto sm:px-0 cursor-pointer">
      <div className="relative group w-full h-64 flex rounded-xl items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-white rounded-xl bg-opacity-80 backdrop-blur-xl shadow-xl group-hover:bg-opacity-20"
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
            <div className="space-y flex overflow-hidden h-full">
              <div className="flex items-center">
                <AiFillFileImage color="#40b52d" size={150} />
              </div>
            </div>
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

        <div className="absolute z-40 w-full h-10 bottom-0 bg-white rounded-b-xl">
          <div className="flex items-center h-full mx-2 justify-between">
            <span className="text-[15px] font-medium">{fileName}</span>
            <MdDelete onClick={handleFileDelete} color="#40b52d" size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInput;