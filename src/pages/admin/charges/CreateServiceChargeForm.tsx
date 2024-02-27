import { CategoryType, CategoryUser } from "../../../data/data";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import SelectInput from "../../../components/input/SelectInput";
import Button from "../../../components/button/Button";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import { postServiceCharge } from "../../../redux/features/Admin/createServiceChargeSlice";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";

const CreateServiceChargeform = ({ onClose }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { loading: loadingPage } = useSelector(
    (state: RootState) => state?.createServiceCharge
  );

  const CategoryOptions =
    CategoryUser?.map((user) => ({
      label: user?.type,
      value: user?.id,
    })) || [];

  const CategoryTypeOptions =
    CategoryType?.map((type) => ({
      label: type?.type,
      value: type?.type,
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

  function handleCreateServiceCharge(createServiceCharge) {
    const serviceChargeData = {
      docCateg: createServiceCharge?.documentCategory.value,
      category_user: createServiceCharge?.userCategory.value,
      baseCharge: createServiceCharge?.baseCharge,
    };

    // @ts-ignore
    dispatch(postServiceCharge({ ...serviceChargeData })).then((result) => {
      const { payload } = result;
      const success = Boolean(payload?.success);
      if (success === true) {
        toast.success(payload?.message);
      } else {
        toast.error(payload || "Charge already exist, try updating");
      }
    });
  }

  return (
    <>
      {loadingPage ? (
        <Loading />
      ) : (
        <form
          onSubmit={handleSubmit(handleCreateServiceCharge)}
          className="flex flex-col justify-between h-full px-2 w-full"
        >
          <>
            <div className="flex flex-col gap-10">
              <SelectInput
                label="documentCategory"
                options={CategoryTypeOptions}
                control={control}
                useValue
              />

              <SelectInput
                label="userCategory"
                options={CategoryOptions}
                control={control}
                useValue
              />

              <FormTextInput
                label="baseCharge"
                title="Set Charge"
                errors={errors}
                {...register("baseCharge", {
                  required: {
                    value: true,
                    message: "Charge is required",
                  },
                })}
                onChange={(e) => setValue("baseCharge", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Button disabled={!isValid}>Create</Button>
            </div>
          </>
        </form>
      )}
    </>
  );
};

export default CreateServiceChargeform;
