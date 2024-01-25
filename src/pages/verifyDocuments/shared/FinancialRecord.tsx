import React, { useState } from "react";
import SelectInput from "../../../components/input/SelectInput";
import FileInput from "../../../components/input/FileInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../components/input/Form/FormTextAreaInput";
import { AiFillCloseCircle } from "react-icons/ai";

const FinancialRecord = ({
  setValue,
  countryOptions,
  country,
  financialRecord,
  financialRecordOptions,
  errors,
  register,
  finName,
  finCountry,
  finInfo,
  finDocFile,
  control,
  index,
}) => {
  function setCountry(item) {
    setValue(item?.label, item?.value);
  }

  function setFinancialRecord(item) {
    setValue(item?.label, item?.value);
  }
  const [fileInputs, setFileInputs] = useState<JSX.Element[]>([
    <FileInput key={0} label="choose file" />,
  ]);

  // const addFileInput = () => {
  //   setFileInputs((prevInputs) => [
  //     ...prevInputs,
  //     <FileInput
  //       key={prevInputs.length}
  //       label={`choose file ${prevInputs.length + 1}`}
  //     />,
  //   ]);
  // };

  // const deleteFileInput = () => {
  //   if (fileInputs.length > 1) {
  //     setFileInputs((prevInputs) => prevInputs.slice(0, -1));
  //   }
  // };
  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="px-2 max-h-[400px] overflow-y-auto custom__scrollbar">
          {fileInputs.map((fileInputs, selectedFileIndex) => {
            return (
              <div className="mt-3" key={selectedFileIndex}>
                {/* {selectedFileIndex !== 0 && (
                  <div
                    onClick={() => deleteFileInput(selectedFileIndex)}
                    className="relative cursor-pointer"
                  >
                    <span className="absolute z-30 p-3 rounded-r right-1 text-[12px]">
                      {" "}
                      <AiFillCloseCircle size={15} />{" "}
                    </span>
                  </div>
                )} */}
                <FileInput
                  label="choose file"
                  onFileSelect={(file) =>
                    setValue(`fileDocFin.${index}.${selectedFileIndex}`, file)
                  }
                />
              </div>
            );
          })}
          {/* <div
            onClick={addFileInput}
            className="flex p-1 mt-3 w-full cursor-pointer"
          >
            <span className="rounded-lg flex bg-transparent font-medium text-[12px] items-center justify-between">
              <span className="flex gap-2">
                {" "}
                + <p>Add File</p>
              </span>
            </span>
          </div> */}
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4">
            <SelectInput
              label={`fileTypeFin.${index}`}
              title="financial record"
              options={financialRecordOptions}
              control={control}
              handleChange={setFinancialRecord}
            />

            <FormTextInput
              label={`finName.${index}`}
              title="Bank Name"
              errors={errors}
              {...register(`finName.${index}`, {
                required: {
                  value: true,
                  message: "Bank name is required",
                },
              })}
              onChange={(e) => setValue(`finName.${index}`, e.target.value)}
            />

            <SelectInput
              title="Bank Country"
              label={`finCountry.${index}`}
              options={countryOptions}
              handleChange={setCountry}
              control={control}
            />
          </div>

          <div>
            <FormTextAreaInput
              title="Additional Information"
              label={`finInfo.${index}`}
              errors={errors}
              onChange={(e) => setValue(`finInfo.${index}`, e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialRecord;
