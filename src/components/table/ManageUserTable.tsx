import React from "react";

function ManageUserTable() {

  const mockData = [
    {
      date: "07-May-20",
      applicantName: "Jason De Mont",
      status: "Created",
      role: "Super Admin",
      remark: "",
    },
    {
      date: "12-Oct-22",
      applicantName: "John Doe",
      status: "Joined",
      role: "User",
      remark: "",
    },
    {
      date: "07-Jan-22",
      applicantName: "Festus-Olaleye Ayomikun",
      status: "Created",
      role: "User",
      remark: "was created by Jason De Mont",
    },
    {
      date: "10-May-19",
      applicantName: "FFSD",
      status: "Created",
      role: "Organization",
      remark: "was created by Jason De Mont",
    },
    {
      date: "07-May-20",
      applicantName: "Sam Wilson",
      status: "Created",
      role: "Admin",
      remark: "was created by Jason De Mont",
    },
    {
      date: "10-May-19",
      applicantName: "Teeside University",
      status: "Joined",
      role: "Organization",
      remark: "",
    },
    {
        date: "07-Jan-22",
        applicantName: "Festus-Olaleye Ayomikun",
        status: "Verification",
        role: "User",
        remark: "Applied for verification",
      },
      {
        date: "07-Jan-22",
        applicantName: "Festus-Olaleye Ayomikun",
        status: "Payed",
        role: "User",
        remark: "payed for verification",
      },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#46A437] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              user
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              remark
            </th>
          </tr>
        </thead>
        <tbody className="bg-white cursor-pointer divide-y divide-gray-200">
          {mockData.map((item, index) => (
            <tr key={index} className=" hover:bg-gray-200">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.applicantName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.remark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUserTable;
