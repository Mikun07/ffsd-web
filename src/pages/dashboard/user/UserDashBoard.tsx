import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { fetchDocument } from "../../../redux/features/documentSlice";
import { fetchTransaction } from "../../../redux/features/getTransactionSlice";
import ManageDocumentCard from "../../../components/card/ManageDocumentCard";
import { Link } from "react-router-dom";
import Loading from "../../../components/withStatus/loading/Loading";
import DTable from "./shared/Table";
import Table from "./sharedTransactionTable/Table";

function UserDashBoard() {
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
  const { data: referrals, loading: loadingReferrals } = useSelector(
    (state: RootState) => state?.monitorReferrals
  );

  useEffect(() => {
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
      </div>

      <div className="flex lg:flex-row flex-col gap-4 mt-4 w-full h-screen lg:overflow-hidden ">
        <div className="border-4 border-slate-200 w-full rounded-lg">
          <div className=" flex justify-between p-4 h-12 items-center capitalize">
            <h1 className="font-bold text-xs">Recent transaction</h1>
            <Link to={"/org/transaction"} className="font-semibold">
              see more
            </Link>
          </div>
          <div className="flex w-full h-full overflow-hidden justify-center items-center">
            {loadingTransactions ? (
              <Loading className="" />
            ) : recentTransactions.length > 0 ? (
              <Table tableData={recentTransactions} />
            ) : (
              <h1 className="flex items-center justify-center font-medium">
                No Transaction Available
              </h1>
            )}
          </div>
        </div>

        <div className="border-4 border-slate-200 w-full h-full rounded-lg">
          <div className=" flex justify-between p-4 h-12 items-center capitalize">
            <h1 className="font-bold">Recent Uploads</h1>
            <Link to={"/org/document"} className="font-semibold">
              see more
            </Link>
          </div>
          <div className="flex w-full h-full overflow-hidden justify-center items-center">
            {documentLoading ? (
              <Loading className="" />
            ) : recentDocument.length > 0 ? (
              <DTable tableData={recentDocument} />
            ) : (
              <h1 className="flex items-center justify-center font-medium">
                No Document Available
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashBoard;
