import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminLeftView from "./shared/AdminLeftView";
import FormTextInput from "../../../components/input/Form/FormTextInput";
import FormPasswordInput from "../../../components/input/Form/FormPasswordInput";
import Button from "../../../components/button/Button";
import { useForm } from "react-hook-form";
import LogoDP from "../../../assets/Logo.png";
import toast from "react-hot-toast";
import { postAdminLogin } from "../../../redux/features/Admin/AdminSlice";
import { RootState } from "../../../types/redux/root";
import Loading from "../../../components/withStatus/loading/Loading";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adminLoginLoading = useSelector(
    (state: RootState) => state?.adminLogin.loading
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({ mode: "all" });

  function AdminLogin(data) {
    dispatch(postAdminLogin({ ...data })).then((result) => {
      const {
        payload: { data },
      } = result;
      if (data?.token) {
        navigate("/admin/dashboard");
        toast.success(data?.message);
      } else {
        toast.error("Invalid Admin User");
      }
    });
  }
  return (
    <>
      {adminLoginLoading ? (
        <Loading />
      ) : (
        <div className="bg-white flex h-screen">
          <div className="z-10 absolute lg:top-5 lg:left-[50px] top-6 left-4 flex gap-2 items-center justify-center">
            <div className="w-[50px] cursor-pointer">
              <img src={LogoDP} alt="" />
            </div>
            <p className="flex flex-col cursor-pointer font-bold leading-5 tracking-tight capitalize lg:text-[15px] text-[#40B52D]">
              Document And Qualification Verification LTD
              <span className="text-[#D4973B]">Admin</span>
            </p>
          </div>

          <AdminLeftView />

          <div className="lg:w-[60%] w-full h-screen flex flex-col items-center justify-center lg:gap-y-3">
            <div className="flex flex-col justify-center lg:w-[50%] w-full items-center gap-y-6">
              <h4 className="text-[#40B52D] mt-10 font-semibold self-center">
                Admin Login
              </h4>

              <form
                onSubmit={handleSubmit(AdminLogin)}
                className="flex flex-col px-8 gap-6 mt-5 w-full"
              >
                <FormTextInput
                  label="email"
                  errors={errors}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                  onChange={(e) => setValue("email", e.target.value)}
                  disabled={adminLoginLoading}
                />
                <FormPasswordInput
                  label="password"
                  errors={errors}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                  onChange={(e) => setValue("password", e.target.value)}
                  disabled={adminLoginLoading}
                />

                <div className="flex flex-col gap-2">
                  <Button
                    type="submit"
                    disabled={!isValid || adminLoginLoading}
                  >
                    Login
                  </Button>
                  {/* <div className="flex justify-end">
                    <p
                      onClick={() => navigate("/forgotpassword")}
                      className="text-xs cursor-pointer"
                    >
                      Forgot password?
                    </p>
                  </div> */}
                </div>
              </form>
              <p className="text-[15px] font-semibold capitalize self-center">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup/admin")}
                  className="text-[#40B52D] cursor-pointer hover:text-[#D4973B] hover:text-opacity-85"
                >
                  Sign up
                </span>
              </p>

              {/* <div className="mt-8"></div */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLoginPage;
