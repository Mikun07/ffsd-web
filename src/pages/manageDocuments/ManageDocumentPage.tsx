import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDocument } from "../../redux/features/documentSlice";
import Table from "./Table";

function ManageDocumentPage() {
  const dispatch = useDispatch();
  const document = useSelector((state) => state?.document?.data);
  const documentLoading = useSelector((state) => state?.document?.loading);

  async function getDocuments() {
    dispatch(fetchDocument());
  }

  useEffect(() => {
    getDocuments();
  }, []);

  console.log({ document });

  return (
    <>
      <div className="flex flex-col h-full p-2 overflow-hidden">
        <div className="flex flex-col mt-2 h-screen  overflow-hidden">
          <div className="w-full h-screen overflow-hidden">
            <div className="h-12 w-full bg-slate-200 text-primary rounded-t-lg flex justify-between items-center px-2">
              <h3 className="font-bold">Verification History</h3>
            </div>

            <Table tableData={document?.data?.data} />
          </div>
          <div className="h-12 w-full sticky bottom bg-slate-200 text-primary rounded-b-lg flex justify-between items-center px-2"></div>
        </div>
      </div>
    </>
  );
}

export default ManageDocumentPage;
