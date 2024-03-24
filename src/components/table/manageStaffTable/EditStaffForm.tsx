import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RootState } from "../../../types/redux/root";
import { ActiveStatus } from "../../../data/data";
import Loading from "../../withStatus/loading/Loading";
import FormTextInput from "../../input/Form/FormTextInput";
import Button from "../../button/Button";
import SelectInput from "../../input/SelectInput";
import { updateStaff } from "../../../redux/features/updateStaffSlice";

const EditStaffForm = ({ onClose, data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingStaffEditPage } = useSelector(
    (state: RootState) => state?.editingStaff
  );

  const ActiveStatusOptions =
    ActiveStatus?.map((status) => ({
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

  function handleEditStaff(editStaff) {
    const editStaffData = {
      staff_id: data?.id?.toString(),
      firstName: editStaff?.firstname || data?.firstName,
      lastName: editStaff?.lastname || data?.lastName,
      status: editStaff?.status?.value,
    };

    // @ts-ignore
    dispatch(updateStaff({ ...editStaffData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "staff edited");
      } else {
        toast.error(payload?.error || "Failed, please try again");
      }
    });
  }

  return (
    <>
      {LoadingStaffEditPage ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(handleEditStaff)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-6">
              <FormTextInput
                label="firstname"
                errors={errors}
                {...register("firstname", {})}
                onChange={(e) => setValue("firstname", e.target.value)}
                // disabled={LoadingStaffEditPage}
              />

              <FormTextInput
                label="lastname"
                errors={errors}
                {...register("lastname", {})}
                onChange={(e) => setValue("lastname", e.target.value)}
                // disabled={LoadingStaffEditPage}
              />

              <SelectInput
                label="status"
                options={ActiveStatusOptions}
                control={control}
                useValue
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid}>
                Edit Staff
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditStaffForm;
