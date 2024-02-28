import { DocumentStatus } from "../../../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import SelectInput from "../../../../components/input/SelectInput";
import Button from "../../../../components/button/Button";
import { RootState } from "../../../../types/redux/root";
import Loading from "../../../../components/withStatus/loading/Loading";
import toast from "react-hot-toast";
import { updateDocumentStatus } from "../../../../redux/features/Admin/updateDocumentStatusSlice";
import FormTextInput from "../../../../components/input/Form/FormTextInput";

const EditDocumentStatus = ({ onClose, data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.editingDocumentStatus
  );

  const DocumentStatusOptions =
    DocumentStatus?.map((status) => ({
      label: status?.name,
      value: status?.name,
    })) || [];

  const {
    watch,
    setValue,
    formState: { errors, isValid },
    register,
    handleSubmit,
    control,
  } = useForm({
    mode: "all",
  });

  function handleEditDocumentStatus(editDocumentStatus) {
    const editDocumentStatusData = {
      id: data?.document[0]?.id.toString(),
      type: data?.document[0]?.doc_type,
      verify_info: editDocumentStatus?.verify_info,
      status: editDocumentStatus?.status?.value,
    };

    // @ts-ignore
    dispatch(updateDocumentStatus({ ...editDocumentStatusData })).then(
      (result) => {
        const { payload } = result;
        const success = Boolean(payload?.success);
        if (success === true) {
          toast.success(payload?.message || "status edited");
        } else {
          toast.error(payload || "Failed, please try again");
        }
      }
    );
  }

  return (
    <>
      {LoadingPage ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(handleEditDocumentStatus)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-6">
              <SelectInput
                label="status"
                options={DocumentStatusOptions}
                control={control}
                useValue
              />

              <FormTextInput
                label="verify_info"
                // title={verify_info}
                errors={errors}
                {...register("verify_info", {
                  required: {
                    value: true,
                    message: "Charge is required",
                  },
                })}
                onChange={(e) => setValue("verify_info", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid}>
                Edit Status
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditDocumentStatus;
