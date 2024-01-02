import React, { useState } from "react";
import ReceiptsTable from "../../../components/table/ReceiptTable/ReceiptsTable";

function AdminReceiptsPage() {
  const mockTransactionData = [
    {
      transactionId: 'TRX001',
      date: '05-Dec-22',
      time: '09:12 AM',
      amount: 150.25,
      phoneNumber: '+1234567890',
      description: 'Online purchase',
      currency: 'USD',
      customerName: 'John Doe',
      status: 'Successful',
    },
    {
      transactionId: 'TRX002',
      date: '10-Nov-22',
      time: '11:30 AM',
      amount: 300.00,
      phoneNumber: '+1987654321',
      description: 'Service payment',
      currency: 'NGN',
      customerName: 'Jane Smith',
      status: 'Pending',
    },
    {
      transactionId: 'TRX003',
      date: '20-Oct-22',
      time: '03:45 PM',
      amount: 75.60,
      phoneNumber: '+2345678901',
      description: 'Grocery shopping',
      currency: 'GBP',
      customerName: 'Alice Johnson',
      status: 'Failed',
    },
    {
      transactionId: 'TRX004',
      date: '18-Sep-22',
      time: '08:00 AM',
      amount: 200.00,
      phoneNumber: '+1765432890',
      description: 'Bill payment',
      currency: 'EUR',
      customerName: 'Robert Brown',
      status: 'Successful',
    },
    {
      transactionId: 'TRX005',
      date: '25-Jul-22',
      time: '02:20 PM',
      amount: 450.75,
      phoneNumber: '+1122334455',
      description: 'Electronics purchase',
      currency: 'NGN',
      customerName: 'Emily Davis',
      status: 'Pending',
    },
    {
      transactionId: 'TRX006',
      date: '02-Jun-22',
      time: '10:15 AM',
      amount: 120.30,
      phoneNumber: '+9876543210',
      description: 'Utility bill payment',
      currency: 'USD',
      customerName: 'Michael Wilson',
      status: 'Successful',
    },
    {
      transactionId: 'TRX007',
      date: '12-May-22',
      time: '04:00 PM',
      amount: 80.50,
      phoneNumber: '+8765432109',
      description: 'Restaurant dinner',
      currency: 'AUD',
      customerName: 'Sophia Lee',
      status: 'Failed',
    },
    {
      transactionId: 'TRX008',
      date: '22-Apr-22',
      time: '01:50 PM',
      amount: 600.00,
      phoneNumber: '+1234509876',
      description: 'Travel booking',
      currency: 'CAD',
      customerName: 'David Martinez',
      status: 'Successful',
    },
    {
      transactionId: 'TRX009',
      date: '08-Mar-22',
      time: '11:55 AM',
      amount: 90.25,
      phoneNumber: '+9876543210',
      description: 'Clothing purchase',
      currency: 'NGN',
      customerName: 'Olivia Johnson',
      status: 'Pending',
    },
    {
      transactionId: 'TRX010',
      date: '14-Feb-22',
      time: '09:30 AM',
      amount: 180.00,
      phoneNumber: '+2345678901',
      description: 'Online subscription',
      currency: 'USD',
      customerName: 'William Anderson',
      status: 'Failed',
    },
    {
      transactionId: 'TRX011',
      date: '30-Jan-22',
      time: '12:20 PM',
      amount: 250.50,
      phoneNumber: '+1357924680',
      description: 'Gym membership',
      currency: 'EUR',
      customerName: 'Ethan Clark',
      status: 'Successful',
    },
    {
      transactionId: 'TRX012',
      date: '05-Dec-21',
      time: '10:10 AM',
      amount: 110.75,
      phoneNumber: '+1122334455',
      description: 'Home improvement',
      currency: 'NGN',
      customerName: 'Ava Baker',
      status: 'Pending',
    },
  ];

  const [tableData, setTableData] = useState(mockTransactionData);

  return (
    <>
      <div className="px-3 flex flex-col h-full">
        <div className="mt-3 w-full flex items-center justify-between">
          <div>
            <b className="lg:text-xl capitalize">transaction history</b>
          </div>
        </div>

        <div className="mt-5 pb-[120px] h-full">
          <ReceiptsTable tableData={tableData} />
        </div>
      </div>
    </>
  );
}

export default AdminReceiptsPage;
