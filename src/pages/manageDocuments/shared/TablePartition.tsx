import React from "react";
import TableColumn from "./TableColumn";

// Variable to extract users from data and log them
const users = (data) => {
  const extractedUsers = data.map((item) => item.user);
  return extractedUsers;
};

// Get educational documents for each user
const educationalDocuments = (user) => {
  return user?.documents?.educationalDocuments || [];
};

// Get financial documents for each user
const financialDocuments = (user) => {
  return user?.documents?.financialDocuments || [];
};

// Get professional documents for each user
const professionalDocuments = (user) => {
  return user?.documents?.professionalDocuments || [];
};

function TablePartition({ data }) {
  // Extract users and log them
  const usersArray = users(data);
  // console.log({usersArray})

  // Extract educational documents for each user from usersArray
  const usersEducationalDocuments = usersArray.map((user) =>
    educationalDocuments(user)
  );
  

  // Extract financial documents for each user from usersArray
  const usersFinancialDocuments = usersArray.map((user) =>
    financialDocuments(user)
  );

  // Extract professional documents for each user from usersArray
  const usersProfessionalDocuments = usersArray.map((user) =>
    professionalDocuments(user)
  );

  // Combine educational, financial, and professional documents
  const allDocuments = usersArray.flatMap((user) => [
    ...educationalDocuments(user),
    ...financialDocuments(user),
    ...professionalDocuments(user),
  ]);

  // Reverse the order of allDocuments and map it
  const reversedDocuments = allDocuments.reverse();

  return (
    <div className="w-full h-auto">
      <div className="flex flex-col gap-2">
        {reversedDocuments.map((document, index) => (
          <TableColumn key={index} data={document} />
        ))}
      </div>
    </div>
  );
}

export default TablePartition;
