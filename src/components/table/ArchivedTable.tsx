import React from "react";

function ArchivedTable() {
  const getStatusColor = (status) => {
    switch (status) {
      case "In review":
        return "#46A437";
      case "Pending":
        return "#D4973B";
      case "Archived":
        return "#D1D43B";
      case "Queried":
        return "#D43B3B";
      default:
        return "";
    }
  };

  const mockData = [
    {
      serialNumber: 1,
      applicationNumber: "APP001",
      date: "12-Oct-22",
      applicantName: "John Doe",
      status: "Archived",
    },
    {
      serialNumber: 2,
      applicationNumber: "APP002",
      date: "25-Nov-21",
      applicantName: "Jane Smith",
      status: "Archived",
    },
    {
      serialNumber: 3,
      applicationNumber: "APP003",
      date: "08-Sep-21",
      applicantName: "Alice Johnson",
      status: "Archived",
    },
    {
      serialNumber: 4,
      applicationNumber: "APP004",
      date: "14-Dec-21",
      applicantName: "Festus-Olaleye Ayomikun",
      status: "Archived",
    },
    {
      serialNumber: 5,
      applicationNumber: "APP005",
      date: "19-Oct-21",
      applicantName: "Eve Wilson",
      status: "Archived",
    },
    {
      serialNumber: 6,
      applicationNumber: "APP006",
      date: "03-Nov-21",
      applicantName: "Michael Brown",
      status: "Archived",
    },
    {
      serialNumber: 7,
      applicationNumber: "APP007",
      date: "21-Oct-21",
      applicantName: "Sophia Martinez",
      status: "Archived",
    },
    {
      serialNumber: 8,
      applicationNumber: "APP008",
      date: "07-Nov-21",
      applicantName: "Olivia Garcia",
      status: "Archived",
    },
    {
      serialNumber: 9,
      applicationNumber: "APP009",
      date: "30-Oct-21",
      applicantName: "William Rodriguez",
      status: "Archived",
    },
    {
      serialNumber: 10,
      applicationNumber: "APP010",
      date: "18-Nov-21",
      applicantName: "Liam Hernandez",
      status: "Archived",
    },
    {
      serialNumber: 11,
      applicationNumber: "APP011",
      date: "12-Dec-21",
      applicantName: "Emma Nguyen",
      status: "Archived",
    },
    {
        serialNumber: 7,
        applicationNumber: "APP007",
        date: "21-Oct-21",
        applicantName: "Sophia Martinez",
        status: "Archived",
      },
      {
        serialNumber: 8,
        applicationNumber: "APP008",
        date: "07-Nov-21",
        applicantName: "Olivia Garcia",
        status: "Archived",
      },
      {
        serialNumber: 9,
        applicationNumber: "APP009",
        date: "30-Oct-21",
        applicantName: "William Rodriguez",
        status: "Archived",
      },
      {
        serialNumber: 10,
        applicationNumber: "APP010",
        date: "18-Nov-21",
        applicantName: "Liam Hernandez",
        status: "Archived",
      },
      {
        serialNumber: 11,
        applicationNumber: "APP011",
        date: "12-Dec-21",
        applicantName: "Emma Nguyen",
        status: "Archived",
      },
      {
        serialNumber: 7,
        applicationNumber: "APP007",
        date: "21-Oct-21",
        applicantName: "Sophia Martinez",
        status: "Archived",
      },
      {
        serialNumber: 8,
        applicationNumber: "APP008",
        date: "07-Nov-21",
        applicantName: "Olivia Garcia",
        status: "Archived",
      },
      {
        serialNumber: 9,
        applicationNumber: "APP009",
        date: "30-Oct-21",
        applicantName: "William Rodriguez",
        status: "Archived",
      },
      {
        serialNumber: 10,
        applicationNumber: "APP010",
        date: "18-Nov-21",
        applicantName: "Liam Hernandez",
        status: "Archived",
      },
      {
        serialNumber: 11,
        applicationNumber: "APP011",
        date: "12-Dec-21",
        applicantName: "Emma Nguyen",
        status: "Archived",
      },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#46A437] text-white sticky top-0">
          <tr>
            {/* <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                Serial Number
              </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Application Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Applicant's Name
            </th>
            <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto h-full">
          {mockData.map((item, index) => (
            <tr key={index} className=" hover:bg-gray-200">
              {/* <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.serialNumber}
                </td> */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.applicationNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.applicantName}
              </td>
              <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span
                  className="inline-block px-2 py-1 rounded-full text-xs text-white font-semibold"
                  style={{
                    backgroundColor: getStatusColor(item.status),
                    opacity: "0.95",
                  }}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArchivedTable;
