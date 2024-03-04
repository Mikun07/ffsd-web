import { RootState } from "../../../../types/redux/root";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { FILE_URL } from "../../../../config/api";
import { adminFetchDocumentId } from "../../../../redux/features/Admin/adminGetDocumentIdSlice";
import Loading from "../../../../components/withStatus/loading/Loading";
import { MdOutlineFileCopy } from "react-icons/md";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Modal from "../../../../components/modal/Modal";
import EditDocumentStatus from "./EditDocumentStatus";
import { fetchUser } from "../../../../redux/features/userSlice";

const PreviewData = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { type, id, owner } = useParams();

  // Select relevant data from Redux store
  const { data: getDocumentById, loading: documentLoading } = useSelector(
    (state: RootState) => state?.adminDocumentId
  );
  const { data: user } = useSelector((state: RootState) => state?.user) as any;

  const [editModal, setEditModal] = useState(false);
  const handleOnClose = () => [setEditModal(false)];

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "#46A437";
      case "submitted":
        return "#D4973B";
      case "archived":
        return "#D1D43B";
      case "queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  // Fetch document data when component mounts
  useEffect(() => {
    dispatch(fetchUser());
    dispatch(adminFetchDocumentId({ doc_type: type, id, docOwnerId: owner }));
  }, [type, id, owner]);

  // Function to handle document download
  const handleDownload = () => {
    // Get the document data
    const { document, owner } = getDocumentById;
    const documentData = document[0];

    // Construct the download URL
    const downloadUrl = `${FILE_URL}${documentData.doc_path}`;

    // Open the download URL in a new tab
    window.open(downloadUrl, "_blank");
  };

  const copyReferenceID = () => {
    const referenceID = getDocumentById?.document[0]?.ref_id.split("/")[1];
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

  function formatDate(dateString: string | null | undefined) {
    if (!dateString) return "yet to login"; // Handling null or undefined values
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Enable 12-hour time format
    };
    return date.toLocaleString(undefined, options);
  }

  return (
    <>
      <div className="flex flex-col h-full ">
        <div className="flex items-center gap-2 mt-3 text-gray-800 font-semibold capitalize py-2 sticky top-3">
          <Link to={"/admin/document"}>
            <p className="cursor-pointer">All Documents</p>
          </Link>
          <div className="text-primary">
            <AiOutlineRight />
          </div>
          {/* Ensure that getDocumentById is not null before accessing its properties */}
          {/* Display loading state while data is being fetched */}
          <p className="cursor-pointer">
            {documentLoading ? (
              <>
                <p>Loading...</p>
              </>
            ) : (
              <>
                <p>
                  {getDocumentById?.owner?.docOwnerFirstName}{" "}
                  {getDocumentById?.owner?.docOwnerMiddleName}{" "}
                  {getDocumentById?.owner?.docOwnerLastName}
                </p>
              </>
            )}
          </p>
        </div>

        {documentLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="flex flex-col p-4 gap-y-12 mt-3 mb-12 bg-slate-100 shadow-sm rounded-lg lg:overflow-hidden overflow-y-auto h-screen w-full custom__scrollbar">
              <div className=" flex flex-col gap-4">
                <p className="font-bold text-[15px] capitalize">
                  Document owner
                </p>
                <div className="flex flex-col px-2 gap-5">
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 capitalize">
                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[15px] font-medium capitalize">
                        First name
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {getDocumentById?.owner?.docOwnerFirstName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[15px] font-medium capitalize">
                        Middle name
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {getDocumentById?.owner?.docOwnerMiddleName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[15px] font-medium capitalize">
                        Last name
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {getDocumentById?.owner?.docOwnerLastName}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[15px] font-medium capitalize">
                        date of birth
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {getDocumentById?.owner?.docOwnerDOB}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p className="text-[15px] font-medium capitalize">
                        date created
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {new Date(
                          getDocumentById?.owner?.created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col gap-4">
                <p className="font-bold text-[15px] capitalize">
                  Document details
                </p>

                <div className="flex flex-col px-2 gap-5">
                  {type && type == "finance" ? (
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 capitalize">
                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Reference ID
                          </p>
                          <div className="flex w-full gap-6">
                            <p className="text-[12px] font-medium text-gray-400 uppercase">
                              #
                              {
                                getDocumentById?.document[0]?.ref_id.split(
                                  "/"
                                )[1]
                              }
                            </p>
                            <span
                              onClick={copyReferenceID}
                              style={{ cursor: "pointer" }}
                              className=" text-gray-400"
                            >
                              <MdOutlineFileCopy />
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            uploaded on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {new Date(
                              getDocumentById?.document[0]?.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Bank Name
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.bank_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Bank Country
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.country_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            upload status
                          </p>
                          <div
                            // onClick={() => setEditModal(getDocumentById)}
                            className="flex w-full gap-9"
                          >
                            <p
                              className="text-[15px] font-medium"
                              style={{
                                color: getStatusColor(
                                  getDocumentById?.document[0]?.status
                                ),
                                opacity: "0.95",
                              }}
                            >
                              {getDocumentById?.document[0]?.status}
                            </p>
                            {(user?.is_system_admin === "1" ||
                              user?.system_admin_type === "1") && (
                              <div>
                                <button
                                  onClick={() => setEditModal(getDocumentById)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FaEdit size={20} />
                                </button>
                                <Modal
                                  className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                                  onClose={handleOnClose}
                                  visible={editModal === getDocumentById}
                                  body={
                                    <EditDocumentStatus
                                      onClose={handleOnClose}
                                      data={getDocumentById}
                                    />
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Document uploaded
                          </p>
                          {/* Add a button or link to trigger download */}
                          <button
                            onClick={handleDownload}
                            className="text-primary hover:underline text-[12px] font-medium flex items-start"
                          >
                            Download Document
                          </button>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[11px] font-medium text-gray-400">
                            {formatDate(
                              getDocumentById?.document[0]?.updated_at
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.verify_info}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : type && type == "prof" ? (
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 capitalize">
                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Reference ID
                          </p>
                          <div className="flex w-full gap-6">
                            <p className="text-[12px] font-medium text-gray-400 uppercase">
                              #
                              {
                                getDocumentById?.document[0]?.ref_id.split(
                                  "/"
                                )[1]
                              }
                            </p>
                            <span
                              onClick={copyReferenceID}
                              style={{ cursor: "pointer" }}
                              className=" text-gray-400"
                            >
                              <MdOutlineFileCopy />
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            uploaded on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {new Date(
                              getDocumentById?.document[0]?.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Professional Body
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.doc_verifier_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Exam ID
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.studentId}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Qualification Gotten
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.qualification}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            School Country
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.country_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Enrollment Status
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.enrollment_status}{" "}
                            Student
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Enrollment year
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.start_year}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Graduation year
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.end_year}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            upload status
                          </p>
                          <div
                            // onClick={() => setEditModal(getDocumentById)}
                            className="flex w-full gap-9"
                          >
                            <p
                              className="text-[15px] font-medium"
                              style={{
                                color: getStatusColor(
                                  getDocumentById?.document[0]?.status
                                ),
                                opacity: "0.95",
                              }}
                            >
                              {getDocumentById?.document[0]?.status}
                            </p>
                            {(user?.is_system_admin === "1" ||
                              user?.system_admin_type === "1") && (
                              <div>
                                <button
                                  onClick={() => setEditModal(getDocumentById)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FaEdit size={20} />
                                </button>
                                <Modal
                                  className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                                  onClose={handleOnClose}
                                  visible={editModal === getDocumentById}
                                  body={
                                    <EditDocumentStatus
                                      onClose={handleOnClose}
                                      data={getDocumentById}
                                    />
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Course Studied
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.course}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Document uploaded
                          </p>
                          {/* Add a button or link to trigger download */}
                          <button
                            onClick={handleDownload}
                            className="text-primary hover:underline text-[12px] font-medium flex items-start"
                          >
                            Download Document
                          </button>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[11px] font-medium text-gray-400">
                            {formatDate(
                              getDocumentById?.document[0]?.updated_at
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.verify_info}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 capitalize">
                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Reference ID
                          </p>
                          <div className="flex w-full gap-6">
                            <p className="text-[12px] font-medium text-gray-400 uppercase">
                              #
                              {
                                getDocumentById?.document[0]?.ref_id.split(
                                  "/"
                                )[1]
                              }
                            </p>
                            <span
                              onClick={copyReferenceID}
                              style={{ cursor: "pointer" }}
                              className=" text-gray-400"
                            >
                              <MdOutlineFileCopy />
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            uploaded on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {new Date(
                              getDocumentById?.document[0]?.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Student ID
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.studentId}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            School Country
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.country_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            School city
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.verifier_city}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            School name
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.verifier_name}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Enrollment year
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.start_year}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Graduation year
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.end_year}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            upload status
                          </p>
                          <div
                            // onClick={() => setEditModal(getDocumentById)}
                            className="flex w-full gap-9"
                          >
                            <p
                              className="text-[15px] font-medium"
                              style={{
                                color: getStatusColor(
                                  getDocumentById?.document[0]?.status
                                ),
                                opacity: "0.95",
                              }}
                            >
                              {getDocumentById?.document[0]?.status}
                            </p>
                            {(user?.is_system_admin === "1" ||
                              user?.system_admin_type === "1") && (
                              <div>
                                <button
                                  onClick={() => setEditModal(getDocumentById)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <FaEdit size={20} />
                                </button>
                                <Modal
                                  className="bg-white absolute right-0 lg:w-[500px] w-full h-full flex flex-col gap-2 overflow-hidden p-2"
                                  onClose={handleOnClose}
                                  visible={editModal === getDocumentById}
                                  body={
                                    <EditDocumentStatus
                                      onClose={handleOnClose}
                                      data={getDocumentById}
                                    />
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Course Studied
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.course}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Document uploaded
                          </p>
                          {/* Add a button or link to trigger download */}
                          <button
                            onClick={handleDownload}
                            className="text-primary hover:underline text-[12px] font-medium flex items-start"
                          >
                            Download Document
                          </button>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[11px] font-medium text-gray-400">
                            {formatDate(
                              getDocumentById?.document[0]?.updated_at
                            )}
                          </p>
                        </div>

                        <div className="flex flex-col w-full gap-1">
                          <p className="text-[15px] font-medium capitalize">
                            Update on
                          </p>
                          <p className="text-[12px] font-medium text-gray-400">
                            {getDocumentById?.document[0]?.verify_info}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className=" flex flex-col gap-4">
                <p className="font-bold text-[15px] capitalize">Uploaded by</p>

                <div className="flex flex-col px-2 gap-5">
                  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-y-5 capitalize">
                    <div className="flex flex-col w-full gap-1">
                      <p className="text-[15px] font-medium capitalize">
                        First name
                      </p>
                      <p className="text-[12px] font-medium text-gray-400 capitalize">
                        {getDocumentById?.uploaded_by_user?.firstName}
                      </p>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <p className="text-[15px] font-medium capitalize">
                        last name
                      </p>
                      <p className="text-[12px] font-medium text-gray-400 capitalize">
                        {getDocumentById?.uploaded_by_user?.lastName}
                      </p>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <p className="text-[15px] font-medium capitalize">
                        email
                      </p>
                      <p className="text-[12px] font-medium text-gray-400 lowercase">
                        {getDocumentById?.uploaded_by_user?.email}
                      </p>
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <p className="text-[15px] font-medium capitalize">
                        Phone Number
                      </p>
                      <p className="text-[12px] font-medium text-gray-400">
                        {getDocumentById?.uploaded_by_user?.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PreviewData;
