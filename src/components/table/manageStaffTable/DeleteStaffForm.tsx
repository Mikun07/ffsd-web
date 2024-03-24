import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { RootState } from "../../../types/redux/root";
import Loading from "../../withStatus/loading/Loading";

const DeleteStaffForm = ({ onClose, data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.removeStaff
  );

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

  function handleDeleteStaff() {
    const deleteStaffData = {
      staff_id: data?.id?.toString(),
    };

    // @ts-ignore
    dispatch(deleteStaff({ ...deleteStaffData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        onClose();
        toast.success(payload?.message || "staff deleted");
      } else {
        toast.error(payload?.error || "Failed, please try again");
      }
    });
  }

  return (
    <>
      {LoadingPage ? (
        <Loading className="bg-white overflow-hidden rounded-lg p-3" />
      ) : (
        <>
          <div className=" flex flex-col gap-7">
            <div className="flex items-center justify-center w-full">
              <h1 className="capitalize px-4">Confirm?</h1>
            </div>

            <form
              onSubmit={handleSubmit(handleDeleteStaff)}
              className="flex gap-6"
            >
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-900 text-lg text-white capitalize flex items-center justify-center h-12 w-24 rounded-3xl"
              >
                delete
              </button>
              <button
                onClick={onClose}
                className="border-blue-600 bg-transparent border-2 hover:border-blue-900 text-blue-600 hover:text-blue-900 text-lg capitalize flex items-center justify-center h-12 w-24 rounded-3xl"
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteStaffForm;
