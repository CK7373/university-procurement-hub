import { useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import DataTable from "@/components/DataTable";
import EmailReportModal from "@/components/EmailReportModal";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { mockPayments } from "@/lib/mock-data";

const PaymentHistoryReport = () => {
  const [emailOpen, setEmailOpen] = useState(false);
  const total = mockPayments.reduce((s, p) => s + p.amount, 0);

  const columns = [
    { key: "id", label: "ID" },
    { key: "supplier_name", label: "Supplier" },
    { key: "payment_date", label: "Date" },
    { key: "amount", label: "Amount", render: (r: any) => `$${r.amount.toLocaleString()}` },
    { key: "method", label: "Method" },
    { key: "reference", label: "Reference" },
  ];

  return (
    <PageWrapper
      title="Payment History Report"
      subtitle={`Total paid: $${total.toLocaleString()}`}
      actions={<Button variant="outline" onClick={() => setEmailOpen(true)}><Mail className="w-4 h-4 mr-2" />Email Report</Button>}
    >
      <DataTable columns={columns} data={mockPayments} />
      <EmailReportModal open={emailOpen} onClose={() => setEmailOpen(false)} reportName="Payment History" />
    </PageWrapper>
  );
};

export default PaymentHistoryReport;
