import React from "react";
import TableColumn from "./TableColumn";

// Variable to extract users from data and log them
const users = (data) => {
  const extractedUsers = data?.map((item) => item.user);
  return extractedUsers;
};

const educationalDocumentsWithUserInfo = (user) => {
  return (
    user?.documents?.educationalDocuments.map((document) => ({
      ...document,
      userInfo: user.info,
      Tag: "Educational Document"
    })) || []
  );
};
const financialDocumentsWithUserInfo = (user) => {
  return (
    user?.documents?.financialDocuments.map((document) => ({
      ...document,
      userInfo: user.info,
      Tag: "financial Document"
    })) || []
  );
};
const professionalDocumentsWithUserInfo = (user) => {
  return (
    user?.documents?.professionalDocuments.map((document) => ({
      ...document,
      userInfo: user.info,
      Tag: "professional Document"
    })) || []
  );
};

function TablePartition({ data }) {
  // Extract users and log them
  const usersArray = users(data);

  // Extract educational documents for each user from usersArray along with user info
  const usersEducationalDocumentsWithUserInfo = usersArray?.flatMap((user) =>
    educationalDocumentsWithUserInfo(user)
  );
  const usersFinancialDocumentsWithUserInfo = usersArray?.flatMap((user) =>
    financialDocumentsWithUserInfo(user)
  );
  const usersProfessionalDocumentsWithUserInfo = usersArray?.flatMap((user) =>
    professionalDocumentsWithUserInfo(user)
  );

  // Combine educational, financial, and professional documents
  const allDocuments = usersArray?.flatMap((user) => [
    ...educationalDocumentsWithUserInfo(user),
    ...financialDocumentsWithUserInfo(user),
    ...professionalDocumentsWithUserInfo(user),
  ]);

  // Reverse the order of allDocuments and map it
  const reversedDocuments = allDocuments?.reverse();

  return (
    <div className="w-full h-auto">
      <div className="flex flex-col gap-2">
        {reversedDocuments?.map((document, index) => (
          <TableColumn key={index} data={document} />
        ))}
      </div>
    </div>
  );
}

export default TablePartition;
