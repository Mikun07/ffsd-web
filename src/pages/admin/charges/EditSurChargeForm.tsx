import React from "react";
import TextInput from "../../../components/input/TextInput";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import { useForm } from "react-hook-form";
import Button from "../../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";
import toast from "react-hot-toast";
import { updateSurCharge } from "../../../redux/features/Admin/updateSurChargeSlice";

const EditSurChargeForm = ({
  onClose,
  instId,
  instName,
  institution_charge,
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { loading: LoadingPage } = useSelector(
    (state: RootState) => state?.editingSurCharge
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

  function handleEditSurCharge(editSurCharge) {
    const editSurChargeData = {
      institution_id: instId,
      institution_charge: editSurCharge.institution_charge,
    };
    // @ts-ignore
    dispatch(updateSurCharge({ ...editSurChargeData })).then((result) => {
      const { payload } = result;      
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload.message);
      } else {
        toast.error(payload?.error || "Failed, try again");
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
            onSubmit={handleSubmit(handleEditSurCharge)}
            className="flex flex-col justify-between h-full px-2 w-full"
          >
            <div className="flex flex-col gap-10 capitalize">
              <TextInput label="Institution" value={instName} disabled />

              <FormTextInput
                label="institution_charge"
                title={institution_charge}
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
              <Button disabled={!isValid}>Create</Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default EditSurChargeForm;
