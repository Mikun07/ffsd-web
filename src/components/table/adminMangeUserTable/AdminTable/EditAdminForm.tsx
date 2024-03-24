import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../types/redux/root";
import { ActiveStatus, AdminStatus } from "../../../../data/data";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../../../withStatus/loading/Loading";
import SelectInput from "../../../input/SelectInput";
import Button from "../../../button/Button";

const EditAdminForm = ({ onClose, data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.editingAdmin
  );

  const ActiveStatusOptions =
    ActiveStatus?.map((status) => ({
      label: status?.name,
      value: status?.name,
    })) || [];

  const AdminStatusOptions =
    AdminStatus?.map((status) => ({
      label: status?.type,
      value: status?.id,
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

  function handleEditAdmin(editAdmin) {
    const editAdminData = {
      admin_id: data?.id,
      admin_type: editAdmin?.adminType?.value.toString(),
      status: editAdmin?.status?.value,
    };

    // @ts-ignore
    dispatch(updateAdmin({ ...editAdminData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "Admin edited");
      } else {
        toast.error(payload?.error || "Failed, please try again");
      }
    });
  }

  return (
    <>
      {LoadingPage ? (
        <Loading />
      ) : (
        <>
          <form
            onSubmit={handleSubmit(handleEditAdmin)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-6">
              <SelectInput
                label="status"
                options={ActiveStatusOptions}
                control={control}
                useValue
              />

              <SelectInput
                label="adminType"
                options={AdminStatusOptions}
                control={control}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid}>
                Create Admin
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditAdminForm;
