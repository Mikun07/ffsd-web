import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../types/redux/root";
import Button from "../../../components/button/Button";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import SelectInput from "../../../components/input/SelectInput";
import Loading from "../../../components/withStatus/loading/Loading";
import { useForm } from "react-hook-form";
import { postSurCharge } from "../../../redux/features/Admin/createSurChargeSlice";
import toast from "react-hot-toast";

const CreateSurChargeForm = ({ onClose, institutionOptions }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.createSurCharge
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    control,
  } = useForm({ mode: "all" });

  function handleCreateSurCharge(createSurCharge) {
    const createSurChargeData = {
      institution_id: createSurCharge?.Institution?.value,
      institution_charge: createSurCharge?.institution_charge,
    };

    // @ts-ignore
    dispatch(postSurCharge({ ...createSurChargeData })).then((result) => {
      const { payload } = result;      
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message || "Sur Charge as been created");
      } else {
        toast.error(payload?.error || "Failed, Charge already exist");
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
            onSubmit={handleSubmit(handleCreateSurCharge)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-6">
              <SelectInput
                label="Institution"
                options={institutionOptions}
                control={control}
              />

              <FormTextInput
                label="institution_charge"
                title="Charge"
                errors={errors}
                {...register("institution_charge", {
                  required: {
                    value: true,
                    message: "Charge is required",
                  },
                })}
                onChange={(e) => setValue("institution_charge", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!isValid}>
                Create Sur-Charge
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default CreateSurChargeForm;
