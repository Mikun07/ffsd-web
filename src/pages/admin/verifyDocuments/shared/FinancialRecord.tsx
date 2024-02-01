import { useState } from "react";
import FileInput from "../../../../components/input/FileInput";
import SelectInput from "../../../../components/input/SelectInput";
import FormTextInput from "../../../../components/input/Form/FormTextInput";
import FormTextAreaInput from "../../../../components/input/Form/FormTextAreaInput";


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

  return (
    <>
      <div className=" mt-10 flex lg:flex-row flex-col gap-4">
        <div className="px-2 max-h-[400px] overflow-y-auto custom__scrollbar">
          {fileInputs.map((fileInputs, selectedFileIndex) => {
            return (
              <div className="mt-3" key={selectedFileIndex}>
                <FileInput
                  label="choose file"
                  onFileSelect={(file) =>
                    setValue(`fileDocFin.${index}.${selectedFileIndex}`, file)
                  }
                />
              </div>
            );
          })}
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
