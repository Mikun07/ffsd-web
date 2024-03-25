import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/loginSlice";
import { fetchUser } from "../redux/features/userSlice";
import Loading from "../components/withStatus/loading/Loading";
import { RootState } from "../types/redux/root";
import { ThunkDispatch } from "@reduxjs/toolkit";
import TextInput from "../components/input/TextInput";
import { MdContentCopy } from "react-icons/md";
import toast from "react-hot-toast";

function ManageAccountPage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { data: user, loading: userLoading } = useSelector(
    (state: RootState) => state?.user
  ) as any;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return "yet to login"; // Handling null or undefined values
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString(undefined, options);
  }

  // Function to determine admin type display
  const getAdminStatus = () => {
    if (user?.is_system_admin === "1") {
      return "System Admin";
    } else if (user?.is_system_admin === "0") {
      return user?.system_admin_type === "1"
        ? "Admin Status 1"
        : user?.system_admin_type === "2"
        ? "Admin Status 2"
        : user?.system_admin_type;
    } else {
      return user?.system_admin_type === "1" || user?.system_admin_type === "2"
        ? user?.system_admin_type
        : null;
    }
  };

  const copyReferenceID = () => {
    const referenceID = `${window.location.origin}/signup/${user?.company_ref}`;
    if (referenceID) {
      // Create a temporary textarea element
      const textarea = document.createElement("textarea");
      textarea.value = referenceID;

      // Make sure it's not visible
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";

      // Append the textarea to the document
      document.body.appendChild(textarea);

      // Select and copy the value to the clipboard
      textarea.select();
      document.execCommand("copy");

      // Remove the textarea from the document
      document.body.removeChild(textarea);

      // Optionally, provide feedback to the user
      toast.success("Reference ID copied to clipboard!");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#46A437";
      case "inactive":
        return "#D43B3B";
      default:
        return "";
    }
  };

  const getCategoryType = () => {
    if (user?.category === "org") {
      return "Organization";
    } else if (user?.category === "indv") {
      return "Individual";
    } else if (user?.category === "staff") {
      return "Staff";
    } else {
      return user?.category;
    }
  };

  return (
    <>
      {userLoading ? (
        <Loading />
      ) : (
        <>
          <div className="h-full flex flex-col w-full justify-between">
            <div>
              <h1 className="font-semibold capitalize py-2">
                Personal information
              </h1>

              <div className="bg-slate-100 w-full rounded-lg px-4 py-2">
                <div className="flex w-full items-center justify-center p-2">
                  <div className="h-[150px] w-[150px]  text-xl rounded-full bg-[#40B52D] flex items-center justify-center text-white">
                    <p className="font-semibold text-[75px] uppercase">
                      {user?.firstName[0]}
                      {user?.lastName[0]}
                    </p>
                  </div>
                </div>

                <div className="px-2 py-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 h-72 overflow-y-auto custom__scrollbar">
                  {user?.category === "org" && (
                    <>
                      <TextInput
                        label="institution Name"
                        value={user?.company}
                        disabled
                        inputClassName="uppercase"
                      />
                      <TextInput
                        label="institution ID"
                        value={`${user?.company_ref}`}
                        disabled
                        inputClassName="uppercase"
                      />
                    </>
                  )}

                  {user?.category === "org" ? (
                    <TextInput
                      label="Owner of institution"
                      value={`${user?.lastName} ${user?.firstName} `}
                      disabled
                      inputClassName="capitalize"
                    />
                  ) : (
                    <TextInput
                      label="Name"
                      value={`${user?.lastName} ${user?.firstName} `}
                      disabled
                      inputClassName="capitalize"
                    />
                  )}

                  {user?.category === "org" ? (
                    <TextInput
                      label="institution Email"
                      value={user?.email}
                      disabled
                      inputClassName="lowercase"
                    />
                  ) : (
                    <TextInput
                      label="institution Email"
                      value={user?.email}
                      disabled
                      inputClassName="lowercase"
                    />
                  )}

                  {user?.phone !== null ||
                    ("N/A" && (
                      <TextInput
                        label="Phone Number"
                        value={user?.phone}
                        disabled
                      />
                    ))}

                  {user?.is_system_admin === "0" ? (
                    <TextInput
                      disabled
                      label="Date Added"
                      value={formatDate(user?.created_at)}
                    />
                  ) : (
                    <TextInput
                      disabled
                      label="Date Joined"
                      value={formatDate(user?.created_at)}
                    />
                  )}

                  <TextInput
                    disabled
                    label={
                      user?.is_system_admin || user?.system_admin_type
                        ? "Admin Type"
                        : "Category"
                    }
                    value={
                      user?.is_system_admin || user?.system_admin_type
                        ? getAdminStatus()
                        : getCategoryType()
                    }
                  />
                  {user?.is_system_admin === "1" && (
                    <>
                      <TextInput
                        disabled
                        label="Date Joined"
                        value={formatDate(user?.created_at)}
                      />
                      <TextInput
                        disabled
                        label="Phone Number"
                        value={user?.phone}
                      />
                    </>
                  )}

                  {user?.status !== null && (
                    <TextInput
                      disabled
                      style={{
                        color: getStatusColor(user?.status),
                      }}
                      label="Status"
                      value={user?.status}
                      inputClassName="capitalize"
                    />
                  )}

                  {user?.category === "org" && "staff" && (
                    <div className="flex w-full gap-2 items-center">
                      <div className="w-full">
                        <TextInput
                          disabled
                          label="referral link"
                          value={user?.company_ref}
                          onClick={copyReferenceID}
                        />
                      </div>
                      <button
                        onClick={copyReferenceID}
                        className="flex items-center min-h-[38px] pt-1 mt-1 text-gray-400 cursor-pointer"
                      >
                        <MdContentCopy />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      F
    </>
  );
}

export default ManageAccountPage;
