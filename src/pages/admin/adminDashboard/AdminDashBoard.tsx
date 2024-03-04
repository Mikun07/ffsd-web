import { ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../types/redux/root";
import { adminFetchDocument } from "../../../redux/features/Admin/adminGetDocumentSlice";
import ManageDocumentCard from "../../../components/card/ManageDocumentCard";
import { getAllAdmins } from "../../../redux/features/Admin/getAllAdminSlice";
import { getAllIndividuals } from "../../../redux/features/Admin/getAllIndividualsSlice";
import { fetchOrganization } from "../../../redux/features/Admin/adminGetOrganizationSlice";
import { adminFetchTransaction } from "../../../redux/features/Admin/adminGetTransactionSlice";
import Loading from "../../../components/withStatus/loading/Loading";
import Table from "./sharedTransactionTable/Table";
import { Link } from "react-router-dom";
import DTable from "./shared/Table";

function AdminDashBoard() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(adminFetchDocument());
    dispatch(getAllAdmins());
    dispatch(getAllIndividuals());
    dispatch(fetchOrganization());
    dispatch(adminFetchTransaction());
  }, [dispatch]);

  const { data: getAllDocument, loading: documentLoading } = useSelector(
    (state: RootState) => state?.adminDocument
  );
  const { data: admin } = useSelector((state: RootState) => state?.allAdmin);
  const { data: individual } = useSelector(
    (state: RootState) => state?.allIndividual
  );
  const { data: organization } = useSelector(
    (state: RootState) => state?.getOrganization
  );
  const { data: transactions, loading: loadingTransactions } = useSelector(
    (state: RootState) => state?.adminGetTransaction
  );

  const dataArray = (getAllDocument as Array<any>) || [];
  let totalFinancialDocuments = 0;
  let totalEducationalDocuments = 0;
  let totalProfessionalDocuments = 0;

  let allDocuments = dataArray.flatMap(({ documents, doc_owner }) => {
    if (documents) {
      return [
        ...documents.educationalDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Educational",
        })),
        ...documents.financialDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Financial",
        })),
        ...documents.professionalDocuments.map((doc) => ({
          ...doc,
          userInfo: doc_owner,
          tag: "Professional",
        })),
      ];
    }
    return [];
  });

  dataArray.forEach((item) => {
    const { documents } = item || {};
    if (documents) {
      const {
        financialDocuments,
        educationalDocuments,
        professionalDocuments,
      } = documents;
      if (financialDocuments)
        totalFinancialDocuments += financialDocuments.length;
      if (educationalDocuments)
        totalEducationalDocuments += educationalDocuments.length;
      if (professionalDocuments)
        totalProfessionalDocuments += professionalDocuments.length;
    }
  });

  const totalAllDocuments =
    totalFinancialDocuments +
    totalEducationalDocuments +
    totalProfessionalDocuments;

  const countDocumentsByStatus = (status: string) => {
    return (getAllDocument || []).reduce((total, item) => {
      const { documents } = item || {};
      if (documents) {
        const filteredDocuments = Object.values(documents).reduce(
          (acc: any[], docType) => {
            if (Array.isArray(docType)) {
              return acc.concat(
                docType.filter((doc: any) => doc && doc.status === status)
              );
            }
            return acc;
          },
          []
        );
        //@ts-ignore
        return total + (filteredDocuments ? filteredDocuments.length : 0);
      }
      return total;
    }, 0);
  };

  const totalVerifiedDocuments = countDocumentsByStatus("verified");
  const totalArchivedDocuments = countDocumentsByStatus("archived");
  const totalQueriedDocuments = countDocumentsByStatus("queried");

  const adminsWithType1 =
    admin?.filter((admin) => admin.system_admin_type === "1") || [];
  const adminsWithType2 =
    admin?.filter((admin) => admin.system_admin_type === "2") || [];
  const totalAdminsWithType1 = adminsWithType1.length;
  const totalAdminsWithType2 = adminsWithType2.length;

  const TotalAdmin = admin ? admin.length : 0;
  const TotalIndividual = individual?.data ? individual?.data?.length : 0;
  const TotalOrganization = organization ? organization?.length : 0;
  const TotalUsers = TotalAdmin + TotalIndividual + TotalOrganization;

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
      <div className="flex flex-col h-full lg:overflow-hidden px-1 overflow-y-auto custom__scrollbar">
        <div className="lg:flex lg:justify-between grid md:grid-cols-2 gap-4 w-full mt-4">
          <ManageDocumentCard
            header="Documents uploaded"
            headerNumber={totalAllDocuments}
            titles={[
              {
                title: "Total Financial Document",
                number: totalFinancialDocuments,
              },
              {
                title: "Total Educational Document",
                number: totalEducationalDocuments,
              },
              {
                title: "Total Professional Document",
                number: totalProfessionalDocuments,
              },
            ]}
          />
          <ManageDocumentCard
            header="Document Submitted"
            headerNumber={totalAllDocuments}
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
          <ManageDocumentCard
            header="Total Admins"
            headerNumber={TotalAdmin}
            titles={[
              {
                title: "Admin type 1",
                number: totalAdminsWithType1,
              },
              {
                title: "Admin type 2",
                number: totalAdminsWithType2,
              },
            ]}
          />
          <ManageDocumentCard
            header="Number of User"
            headerNumber={TotalUsers}
            titles={[
              {
                title: "Admin",
                number: TotalAdmin,
              },
              {
                title: "Individual",
                number: TotalIndividual,
              },
              {
                title: "Organization",
                number: TotalOrganization,
              },
            ]}
          />
        </div>

        <div className="flex lg:flex-row sm:flex-col gap-4 mt-4 w-full h-screen lg:overflow-hidden">
          <div className="border-4 border-slate-200 w-full rounded-lg">
            <div className="flex justify-between p-4 h-12 items-center capitalize">
              <h1 className="font-bold text-lg">Recent transaction</h1>
              <Link to={"/admin/transaction"} className="font-semibold">
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
          <div className="border-4 border-slate-200 w-full rounded-lg">
            <div className="flex justify-between p-2 h-12 items-center capitalize">
              <h1 className="font-bold text-lg">Recent Uploads</h1>
              <Link to={"/admin/document"} className="font-semibold">
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
    </>
  );
}

export default AdminDashBoard;
