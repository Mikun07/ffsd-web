import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../../types/redux/root";
import { useEffect, useMemo } from "react";
import { fetchDocument } from "../../../redux/features/documentSlice";
import ManageDocumentCard from "../../../components/card/ManageDocumentCard";
import { fetchUser } from "../../../redux/features/userSlice";
import { BsPersonFill } from "react-icons/bs";
import ManageDocumentCardWithImage from "../../../components/card/ManageDocumentCardWithImage";
import { fetchStaff } from "../../../redux/features/getStaffSlice";
import DTable from "./shared/Table";
import Table from "./sharedTransactionTable/Table";
import Loading from "../../../components/withStatus/loading/Loading";
import { fetchTransaction } from "../../../redux/features/getTransactionSlice";
import { Link } from "react-router-dom";

function OrgDashBoard() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const { data: upload, loading: documentLoading } = useSelector(
    (state: RootState) => state?.document
  );
  const { data: user, loading: userLoading } = useSelector(
    (state: RootState) => state?.user
  );
  const { data: staff, loading: loadingStaff } = useSelector(
    (state: RootState) => state?.getStaff
  );
  const { data: transactions, loading: loadingTransactions } = useSelector(
    (state: RootState) => state?.getTransaction
  );

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchStaff());
    dispatch(fetchDocument());
    dispatch(fetchTransaction());
  }, [dispatch]);

  const dataArray = upload?.data?.data || [];
  const totalDocuments = useMemo(() => {
    let totalEducationalDocumentsLength = 0;
    let totalFinancialDocumentsLength = 0;
    let totalProfessionalDocumentsLength = 0;

    dataArray.forEach((item) => {
      const {
        educationalDocuments,
        financialDocuments,
        professionalDocuments,
      } = item.user.documents;

      totalEducationalDocumentsLength += educationalDocuments.length;
      totalFinancialDocumentsLength += financialDocuments.length;
      totalProfessionalDocumentsLength += professionalDocuments.length;
    });

    // Return object containing total lengths
    return {
      totalAllDocumentsLength:
        totalEducationalDocumentsLength +
        totalFinancialDocumentsLength +
        totalProfessionalDocumentsLength,
      totalEducationalDocumentsLength,
      totalFinancialDocumentsLength,
      totalProfessionalDocumentsLength,
    };
  }, [upload]);

  const allDocuments = useMemo(() => {
    const dataArray = upload?.data?.data || [];
    let combinedDocuments = [];

    dataArray.forEach((item) => {
      const {
        educationalDocuments,
        financialDocuments,
        professionalDocuments,
      } = item.user.documents;

      // Map each document type and add additional properties
      const allItemDocuments = [
        ...educationalDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Educational Document",
        })),
        ...financialDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Financial Document",
        })),
        ...professionalDocuments.map((doc) => ({
          ...doc,
          userInfo: item.user.info,
          status: doc.status,
          tag: "Professional Document",
        })),
      ];

      // Concatenate documents for this item to the combined array
      combinedDocuments = [...combinedDocuments, ...allItemDocuments];
    });

    return combinedDocuments;
  }, [upload]);

  // Reverse the order of documents
  const reversedDocuments = useMemo(
    () => allDocuments?.reverse(),
    [allDocuments]
  );

  const countDocumentsByStatus = (status: string) => {
    return (allDocuments || []).reduce((total, item) => {
      if (item.status === status) {
        return total + 1;
      }
      return total;
    }, 0);
  };

  const totalVerifiedDocuments = countDocumentsByStatus("verified");
  const totalArchivedDocuments = countDocumentsByStatus("archived");
  const totalQueriedDocuments = countDocumentsByStatus("queried");

  const staffArray = staff?.data || [];
  const NoOfStaff = staffArray ? staffArray.length : 0;

  const transactionsData = transactions?.data;
  const reverseTransactionsData = transactionsData
    ? [...transactionsData].reverse()
    : [];

  function getRecentTransactions(reverseTransactionsData) {
    return reverseTransactionsData ? reverseTransactionsData.slice(0, 6) : [];
  }
  const recentTransactions = getRecentTransactions(reverseTransactionsData);

  const reverseAllDocuments = allDocuments ? [...allDocuments].reverse() : [];

  function getRecentDocument(reverseAllDocuments) {
    return reverseAllDocuments ? reverseAllDocuments.slice(0, 6) : [];
  }
  const recentDocument = getRecentDocument(reverseAllDocuments);

  return (
    <>
      <div className="flex flex-col h-full lg:overflow-hidden px-1 sm:overflow-y-auto custom__scrollbar">
        <div className="lg:flex lg:justify-between grid md:grid-cols-2 gap-4 w-full  mt-4">
          <ManageDocumentCard
            header="Total Documents uploaded"
            headerNumber={totalDocuments.totalAllDocumentsLength}
            titles={[
              {
                title: "Total Financial Document",
                number: totalDocuments.totalFinancialDocumentsLength,
              },
              {
                title: "Total Educational Document",
                number: totalDocuments.totalEducationalDocumentsLength,
              },
              {
                title: "Total Professional Document",
                number: totalDocuments.totalProfessionalDocumentsLength,
              },
            ]}
          />

          <ManageDocumentCard
            header="Document Submitted"
            headerNumber={totalDocuments.totalAllDocumentsLength}
            titles={[
              {
                title: "Total Verified Documents",
                number: totalVerifiedDocuments,
              },
              {
                title: "Total Archived Documents",
                number: totalArchivedDocuments,
              },
              {
                title: "Total Queried Documents",
                number: totalQueriedDocuments,
              },
            ]}
          />

          {user?.category === "org" && (
            <ManageDocumentCardWithImage
              number={NoOfStaff}
              icon={BsPersonFill}
              header="No Of Staff"
            />
          )}
        </div>

        <div className="flex lg:flex-row sm:flex-col gap-4 mt-4 w-full h-screen lg:overflow-hidden ">
          <div className="border-4 border-slate-200 w-full rounded-lg">
            <div className=" flex justify-between p-4 h-12 items-center capitalize">
              <h1 className="font-bold">Recent transaction</h1>
              <Link to={"/org/managetransaction"} className="font-semibold">
                see more
              </Link>
            </div>
            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {loadingTransactions ? (
                <Loading className="" />
              ) : (
                <Table tableData={recentTransactions} />
              )}
            </div>
          </div>
          <div className="border-4 border-slate-200 w-full rounded-lg">
            <div className=" flex justify-between p-4 h-12 items-center capitalize">
              <h1 className="font-bold">Recent Uploads</h1>
              <Link to={"/org/managedocument"} className="font-semibold">
                see more
              </Link>
            </div>
            <div className="flex w-full h-full overflow-hidden justify-center items-center">
              {documentLoading ? (
                <Loading className="" />
              ) : (
                <DTable tableData={recentDocument} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrgDashBoard;
