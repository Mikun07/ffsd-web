import { CategoryUser } from "../../../data/data";
import TextInput from "../../../components/input/TextInput";
import Button from "../../../components/button/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import toast from "react-hot-toast";
import { updateServiceCharge } from "../../../redux/features/Admin/updateServiceChargeSlice";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";

const EditServiceChargeForm = ({
  onClose,
  category,
  categoryUser,
  chargeId,
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.editingServiceCharge
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

  // Find the corresponding category user with full name
  const selectedCategoryUser = CategoryUser.find(
    (c) => c.id.toLowerCase() === categoryUser.toLowerCase()
  );

  // Display full name instead of id
  const displayedCategoryUser = selectedCategoryUser
    ? selectedCategoryUser.type
    : "Unknown";

  function handleEditServiceCharge(editServiceCharge) {
    const { charge } = editServiceCharge; // Retrieve charge from editServiceCharge object
    const editServiceChargeData = {
      docCateg: category,
      category_user: categoryUser,
      baseCharge: charge, // Access charge value here
      doc_id: chargeId,
    };

    // @ts-ignore
    dispatch(updateServiceCharge({ ...editServiceChargeData })).then(
      (result) => {
        const { payload } = result;
        const success = Boolean(payload?.success);
        if (success === true) {
          toast.success(payload?.message);
        } else {
          toast.error(payload);
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
            onSubmit={handleSubmit(handleEditServiceCharge)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-10 capitalize">
              <TextInput label="Document Category" value={category} disabled />
              <TextInput
                label="User Category"
                value={displayedCategoryUser}
                disabled
              />
              <FormTextInput
                label={"charge"}
                title="charge"
                errors={errors}
                {...register("charge", {
                  required: {
                    value: true,
                    message: "Charge is required",
                  },
                })}
                onChange={(e) => setValue("charge", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button disabled={!isValid}>Create</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditServiceChargeForm;
